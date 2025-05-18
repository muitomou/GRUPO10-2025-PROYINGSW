import unittest
import requests

class TestLoginEndpoint(unittest.TestCase):
    BASE_URL = "http://localhost:8000/api/auth/login/"  # Ajusta si tu puerto es otro

    @classmethod
    def setUpClass(cls):
        cls.valid_user = {
            "username": "usuario_prueba",
            "password": "12345678"
        }

    def test_login_exitoso(self):
        response = requests.post(self.BASE_URL, json=self.valid_user)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        self.assertIn("user", response.json())

    def test_login_con_password_incorrecto(self):
        datos_invalidos = {
            "username": self.valid_user["username"],
            "password": "password_mal"
        }
        response = requests.post(self.BASE_URL, json=datos_invalidos)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Credenciales inválidas", response.json()["non_field_errors"][0])

    @classmethod
    def tearDownClass(cls):
        pass  # No se requiere limpieza

if __name__ == "__main__":
    unittest.main()
