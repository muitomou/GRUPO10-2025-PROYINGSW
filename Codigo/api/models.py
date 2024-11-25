from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Region(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Boletin(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField( blank = True, null = True)
    archivo_pdf = models.FileField(upload_to = 'boletines/pdfs/', blank = True, null = True)
    imagen = models.ImageField(upload_to = 'boletines/images/', blank = True, null = True)
    regiones = models.ManyToManyField(Region)
    categorias = models.ManyToManyField(Categoria)


class BoletinFavoritos(models.Model):
    Boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


