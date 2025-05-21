import unittest
import requests
import uuid

class TestRegisterEndpoint(unittest.TestCase):
    BASE_URL = "http://localhost:8000/api/auth/register/"

    def setUp(self):
        self.user_valid = {
            "username": f"usuario_test_{uuid.uuid4().hex[:6]}",  # Nombre aleatorio
            "email": f"usuario_test_{uuid.uuid4().hex[:6]}@example.com",  # Correo aleatorio
            "first_name": "Test",
            "last_name": "User",
            "password": "Password123",
            "password2": "Password123"
        }   
        self.user_duplicate_email = {
            "username": "otro_usuario",
            "email": "usuario_test@example.com",
            "first_name": "Otro",
            "last_name": "User",
            "password": "Password123",
            "password2": "Password123"
        }
        self.user_duplicate_username = {
            "username":  self.user_valid["username"],
            "email": "otro_correo@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "Password123",
            "password2": "Password123"
        }

    def test_registro_exitoso(self):
        response = requests.post(self.BASE_URL, json=self.user_valid)
        print(response.status_code, response.json())
        self.assertEqual(response.status_code, 201)
        json_data = response.json()
        self.assertIn("user", json_data)  # Verificar que existe el campo 'user'
        self.assertIn("username", json_data["user"])  # Acceder dentro de 'user'
        self.assertEqual(json_data["user"]["username"], self.user_valid["username"])
        self.assertIn("user", json_data)  # Verificar que el campo 'user' existe
        self.assertIn("email", json_data["user"])  # Acceder dentro de 'user'
        self.assertEqual(json_data["user"]["email"], self.user_valid["email"])
        self.assertNotIn("password", json_data)
        self.assertNotIn("password2", json_data)

    def test_registro_email_duplicado(self):
        requests.post(self.BASE_URL, json=self.user_valid)
        response = requests.post(self.BASE_URL, json=self.user_duplicate_email)
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertTrue("custom user with this email already exists." in str(json_data.values()))

    def test_registro_usuario_duplicado(self):
        requests.post(self.BASE_URL, json=self.user_valid)
        response = requests.post(self.BASE_URL, json=self.user_duplicate_username)
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertTrue("A user with that username already exists." in str(json_data.values()))

if __name__ == "__main__":
    unittest.main()
