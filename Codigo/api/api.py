from .models import Boletin, Tag
from rest_framework import viewsets, permissions
from .serializers import BoletinSerializer, TagSerializer

class BoletinViewSet(viewsets.ModelViewSet):
    queryset = Boletin.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = BoletinSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all() 
    serializer_class = TagSerializer
