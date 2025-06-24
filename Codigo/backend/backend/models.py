from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Region(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    


class Boletin(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField( blank = True)
    archivo_pdf = models.FileField(upload_to = 'boletines/pdfs/', blank = True, null = True)
    imagen = models.ImageField(upload_to = 'boletines/images/', blank = True, null = True)
    regiones = models.ManyToManyField(Region)
    categorias = models.ManyToManyField(Categoria)


class CustomUser(AbstractUser):
    USER_ROLES = (
        ('admin', 'Administrador'),
        ('editor', 'Editor'),
        ('viewer', 'Visualizador'),
    )

    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    email = models.EmailField(unique=True, blank=False)
    role = models.CharField(max_length=20, choices=USER_ROLES, default='viewer')

    class Meta:
        db_table = 'backend_customuser'

    def __str__(self):
        return self.username



class BoletinFavoritos(models.Model):
    Boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)




