from .models import Boletin,Categoria,Region
from rest_framework import viewsets, permissions
from .serializers import BoletinSerializer,CategoriaSerializer, RegionSerializer

class BoletinViewSet(viewsets.ModelViewSet):
    queryset = Boletin.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = BoletinSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
9