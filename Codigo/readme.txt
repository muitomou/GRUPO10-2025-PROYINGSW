En primera instancia ejecute:
* docker-compose build
* docker compose up
* docker compose run web python manage.py makemigrations
* docker compose run web python manage.py makemigrations

Para iniciar el codigo se debe utilizar el comando:
* docker compose up

La pagina esta en localhost:8000 o 0.0.0.0:8000
pgAdmin (admin base de datos) localhost:80 o 0.0.0.0:80

La vista para el administrador (quien sube los boletines) esta en localhost:8000/adminView
Antes de probar la pagina dirigirse a adminView y crear categorias, despues volver y crear boletines.


