# Casos de Prueba - Endpoint Login

Endpoint: `POST /api/auth/login/`

| Nº | Descripción                     | Inputs                                | Salida esperada                                              | Contexto de ejecución                        |
|----|----------------------------------|----------------------------------------|---------------------------------------------------------------|----------------------------------------------|
| 1  | Login exitoso                   | username=`usuario_prueba`<br>password=`12345678` | 200 OK, JSON con token y datos del usuario                    | Usuario creado previamente desde el frontend |
| 2  | Login con contraseña incorrecta | username=`usuario_prueba`<br>password=`incorrecta123` | 400 BAD REQUEST, mensaje `"Credenciales inválidas"`           | Usuario válido, pero contraseña errónea      |
