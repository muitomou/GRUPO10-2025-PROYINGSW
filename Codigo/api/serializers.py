from rest_framework import serializers
from .models import Boletin, Tag, BoletinFavoritos

class BoletinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boletin
        fields = ('id', 'titulo', 'descripcion', 'fecha_publicacion')
        read_only_fields = ('fecha_publicacion', )

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nombre']
