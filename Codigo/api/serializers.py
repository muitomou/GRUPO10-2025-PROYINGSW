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
    categorias = serializers.StringRelatedField(many=True)
    regiones =serializers.StringRelatedField(many=True)

    def get_categorias(self, obj):
        return [categoria.nombre for categoria in obj.categorias.all()]

    def get_regiones(self, obj):
        return [region.nombre for region in obj.regiones.all()]
    
    class Meta:
        model = Boletin
        fields = ['id','titulo', 'descripcion', 'archivo_pdf', 'imagen', 'categorias', 'regiones']
