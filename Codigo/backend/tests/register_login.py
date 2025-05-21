import unittest
import requests

class TestRegisterEndpoint(unittest.TestCase):
    BASE_URL = "http://localhost:8000/api/auth/register/"

    def setUp(self):
        self.user_valid = {
            "username": "usuario_test",
            "email": "usuario_test@example.com",
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
            "username": "usuario_test",
            "email": "otro_correo@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "Password123",
            "password2": "Password123"
        }

    def test_registro_exitoso(self):
        response = requests.post(self.BASE_URL, json=self.user_valid)
        self.assertEqual(response.status_code, 201)
        json_data = response.json()
        self.assertIn("username", json_data)
        self.assertEqual(json_data["username"], self.user_valid["username"])
        self.assertIn("email", json_data)
        self.assertEqual(json_data["email"], self.user_valid["email"])
        self.assertNotIn("password", json_data)
        self.assertNotIn("password2", json_data)

    def test_registro_email_duplicado(self):
        requests.post(self.BASE_URL, json=self.user_valid)
        response = requests.post(self.BASE_URL, json=self.user_duplicate_email)
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertTrue("Este correo electrónico ya está en uso." in str(json_data.values()))

    def test_registro_usuario_duplicado(self):
        requests.post(self.BASE_URL, json=self.user_valid)
        response = requests.post(self.BASE_URL, json=self.user_duplicate_username)
        self.assertEqual(response.status_code, 400)
        json_data = response.json()
        self.assertTrue("Este nombre de usuario ya está en uso." in str(json_data.values()))

if __name__ == "__main__":
    unittest.main()
