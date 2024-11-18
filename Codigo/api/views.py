from django.shortcuts import render

from rest_framework import generics
from .models import Boletin
from .serializers import BoletinSerializer

class BoletinListView(generics.ListAPIView):
    queryset = Boletin.objects.all()
    serializer_class = BoletinSerializer
