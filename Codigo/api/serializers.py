from rest_framework import serializers
from .models import Boletin, BoletinFavoritos, Categoria, Region



class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']  # Ajusta los campos que necesites

# Serializador para la región
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'nombre']  # Ajusta los campos que necesites

class BoletinSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer(many=True)
    regiones = RegionSerializer(many=True)

    class Meta:
        model = Boletin
        fields = ['id', 'titulo', 'descripcion', 'archivo_pdf', 'imagen', 'categorias', 'regiones']