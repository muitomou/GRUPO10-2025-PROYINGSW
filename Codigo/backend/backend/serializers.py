from rest_framework import serializers
from .models import Boletin, Categoria, Region, CustomUser,Etiqueta
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'nombre']


class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = ['id', 'nombre']


class BoletinSerializer(serializers.ModelSerializer):
    categorias = serializers.SerializerMethodField()
    regiones = serializers.SerializerMethodField()

    def get_categorias(self, obj):
        return [categoria.nombre for categoria in obj.categorias.all()]

    def get_regiones(self, obj):
        return [region.nombre for region in obj.regiones.all()]

    class Meta:
        model = Boletin
        fields = ['id', 'titulo', 'descripcion', 'archivo_pdf', 'imagen', 'categorias', 'regiones']



User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise ValidationError("Las contraseñas no coinciden")
        return data
        

    def create(self, validated_data):
        user = self.context.get('user')
        if user.is_anonymous or user.role != 'admin':
            validated_data['role'] = 'viewer';       
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError("Cuenta deshabilitada")
            else:
                raise serializers.ValidationError("Credenciales inválidas")
        else:
            raise serializers.ValidationError("Debe proporcionar username y password")
        
        return data
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = ['username']
