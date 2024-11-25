from django.shortcuts import render

from rest_framework import generics
from .models import Boletin, Region, Boletin
from .serializers import BoletinSerializer, RegionSerializer, BoletinSerializer

class BoletinListView(generics.ListAPIView):
    queryset = Boletin.objects.all()
    serializer_class = BoletinSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
