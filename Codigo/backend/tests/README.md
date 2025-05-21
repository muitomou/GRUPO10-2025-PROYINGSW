# Casos de Prueba - Endpoint Login

1. Endpoint: `POST /api/auth/login/`

Para usar realizar el test, ejecute lo siguiente en la terminal, estando en la carpeta "Codigo" del proyecto:
```
python -m unittest backend.tests.test_login -v
```

| Nº | Descripción                     | Inputs                                | Salida esperada                                              | Contexto de ejecución                        |
|----|----------------------------------|----------------------------------------|---------------------------------------------------------------|----------------------------------------------|
| 1  | Login exitoso                   | username=`usuario_prueba`<br>password=`12345678` | 200 OK, JSON con token y datos del usuario                    | Usuario creado previamente desde el frontend |
| 2  | Login con contraseña incorrecta | username=`usuario_prueba`<br>password=`incorrecta123` | 400 BAD REQUEST, mensaje `"Credenciales inválidas"`           | Usuario válido, pero contraseña errónea      |

# Casos de Prueba - Endpoint Login

2. Endpoint: `POST /api/auth/register/`

Para usar realizar el test, ejecute lo siguiente en la terminal, estando en la carpeta "Codigo" del proyecto:
```
python -m unittest backend.tests.test_register -v
```
| Nº | Descripción                             | Inputs                                      | Salida esperada                                           | Contexto de ejecución             |
|----|----------------------------------------|----------------------------------------------|-----------------------------------------------------------|-----------------------------------|
| 1  | Registro exitoso con datos válidos  | username=`usuario_test`<br>email=`usuario_test@example.com`<br>first_name=`Test`<br>last_name=`User`<br>password=`Password123`<br>password2=`Password123` | 201 CREATED, JSON con datos del usuario registrado | Usuario no existe previamente |
| 2  | Registro con contraseñas no coincidentes | username=`usuario_test`<br>email=`usuario_test@example.com`<br>first_name=`Test`<br>last_name=`User`<br>password=`Password123`<br>password2=`OtraPassword123` | 400 BAD REQUEST, mensaje `"Las contraseñas no coinciden"` | Usuario válido, pero contraseña errónea |
| 3  | Registro con email ya registrado | username=`otro_usuario`<br>email=`usuario_test@example.com`<br>first_name=`Otro`<br>last_name=`User`<br>password=`Password123`<br>password2=`Password123` | 400 BAD REQUEST, mensaje `"Este correo electrónico ya está en uso."` | Usuario con el mismo correo ya existe |
| 4  | Registro con usuario ya registrado | username=`usuario_test`<br>email=`otro_correo@example.com`<br>first_name=`Test`<br>last_name=`User`<br>password=`Password123`<br>password2=`Password123` | 400 BAD REQUEST, mensaje `"Este nombre de usuario ya está en uso."` | Usuario con el mismo username ya existe |
