from datetime import datetime
from django.shortcuts import render
from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Boletin, Region, Categoria,Etiqueta
from rest_framework.permissions import AllowAny
from django.contrib.auth import logout
from .serializers import (
    UserRegisterSerializer, 
    BoletinSerializer, 
    RegionSerializer, 
    CategoriaSerializer,
    UserLoginSerializer,
    EtiquetaSerializer
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsEditor(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'editor'

class IsViewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'viewer'
    
class IsAdminOrEditor(BasePermission):
    def has_permission(self, request, view):
        # Verifica primero que esté autenticado
        if not request.user.is_authenticated:
            return False
        # Luego verifica el rol
        return request.user.role in ['admin', 'editor']


class BoletinListView(generics.ListAPIView):
    queryset = Boletin.objects.all().prefetch_related('regiones', 'categorias')
    serializer_class = BoletinSerializer

class BoletinDetailView(generics.RetrieveAPIView):
    queryset = Boletin.objects.all().prefetch_related('regiones', 'categorias')
    serializer_class = BoletinSerializer
    lookup_field = 'id'  # Esto es opcional, 'pk' es el valor por defecto

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAdminOrEditor()]
        return [AllowAny()]

class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAdminOrEditor()]
        return [AllowAny()]

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAdminOrEditor()]
        return [AllowAny()]

class BoletinViewSet(viewsets.ModelViewSet):
    queryset = Boletin.objects.all().prefetch_related('regiones', 'categorias')
    serializer_class = BoletinSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAdminOrEditor()]
        return [AllowAny()]

from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Boletin, Region, Categoria,CustomUser
from .serializers import BoletinSerializer

class BoletinCreateView(generics.CreateAPIView):
    queryset = Boletin.objects.all()
    serializer_class = BoletinSerializer
    permission_classes = [IsAuthenticated(), IsAdminOrEditor()]

    def perform_create(self, serializer):
        # Asigna el usuario actual como creador del boletín
        serializer.save()
        
    def post(self, request, *args, **kwargs):
        # Manejo especial para archivos e imágenes
        data = request.data.copy()
        
        # Convertir listas de IDs a relaciones ManyToMany
        regiones_ids = data.pop('regiones', [])
        categorias_ids = data.pop('categorias', [])
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        boletin = serializer.save()
        
        # Establecer relaciones ManyToMany
        if regiones_ids:
            boletin.regiones.set(Region.objects.filter(id__in=regiones_ids))
        if categorias_ids:
            boletin.categorias.set(Categoria.objects.filter(id__in=categorias_ids))
            
        return Response(serializer.data, status=201)


class RegisterView(APIView):
    def post(self, request):
        user = request.user
        print(user)
        serializer = UserRegisterSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            user = serializer.save()  # Crea el usuario
            token = Token.objects.create(user=user)  # Genera el token
            return Response(
                {
                    'token': token.key,
                    'user': serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def post(self, request):
        # Elimina el token de autenticación
        request.auth.delete() if request.auth else None
        # Cierra la sesión
        logout(request)
        return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
    



class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        """
        Actualiza los datos del usuario autenticado
        """
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Verifica que el usuario solo pueda editar su propio perfil
        if request.user != user:
            return Response(
                {"error": "No tienes permiso para editar este usuario"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = UserSerializer(
            user,
            data=request.data,
            partial=True,  # Permite actualización parcial
            context={'request': request}  # Pasa el request al serializer si es necesario
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                         context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'role': user.role
        })
    

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin()]

