Para iniciar el codigo se debe utilizar el comando:
    docker compose up
** En Windows da algunos errores, se pueden solucionar borrando la carpeta data y el contenedor de django en docker, y volviendo a ejecutar el comando (funciona a veces, estamos tratando de descubrir que puede provocar el error).
En caso de que no funcione, en la carpeta core/templates estan todos los archivos .html y en static/images las fotos, y en core/urls.py y core/views.py el codigo necesario para que funcione todo en otra app django. Por el funcionamiento de django, es dificil ver las vistas sin iniciar los contenedores.
En MacOs y linux no deberia tener problemas.
