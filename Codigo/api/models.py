from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
    tipo = models.CharField(max_length=100, null = True, blank = True)
    nombre = models.CharField(max_length=100, unique=True)

class Boletin(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    archivo_pdf = models.FileField(upload_to = 'boletines/pdfs/', blank = True, null = True)
    imagen = models.ImageField(upload_to = 'boletines/images/', blank = True, null = True)
    tag = models.ManyToManyField(Tag, related_name='boletines')

class BoletinFavoritos(models.Model):
    Boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comentario(models.Model):
    descripcion = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class ComentarioBoletin(models.Model):
    Boletin = models.ForeignKey(Boletin, on_delete=models.CASCADE)
    comentario = models.ForeignKey(Comentario, on_delete=models.CASCADE)
