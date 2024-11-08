from rest_framework import routers
from .api import BoletinViewSet, TagViewSet

router = routers.DefaultRouter()

router.register('boletines', BoletinViewSet, 'boletines')
router.register('tags', TagViewSet, 'tags')

urlpatterns = router.urls