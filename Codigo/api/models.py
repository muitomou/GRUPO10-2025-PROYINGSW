from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

class Boletin(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

class TagBoletin(models.Model):
    boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

class BoletinFavoritos(models.Model):
    Boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
