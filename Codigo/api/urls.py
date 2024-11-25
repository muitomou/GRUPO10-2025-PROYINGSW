from rest_framework import routers
from .api import BoletinViewSet, CategoriaViewSet, RegionViewSet

router = routers.DefaultRouter()

router.register('boletines', BoletinViewSet, 'boletines')

router.register('categorias', CategoriaViewSet, 'categorias')
router.register('regiones', RegionViewSet, 'regiones')

urlpatterns = router.urls