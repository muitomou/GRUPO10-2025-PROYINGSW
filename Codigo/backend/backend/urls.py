"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView,LogoutView,UserUpdateView,CurrentUserView,BoletinCreateView,RegionViewSet,CategoriaViewSet,BoletinListView,BoletinDetailView,BoletinViewSet,EtiquetaViewSet,CustomAuthToken
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/boletines', BoletinViewSet, basename='boletin')
router.register(r'api/regiones', RegionViewSet, basename='region')
router.register(r'api/categorias', CategoriaViewSet, basename='categoria')
router.register(r'api/etiquetas', EtiquetaViewSet, basename='etiqueta')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/user/<int:pk>/', UserUpdateView.as_view(), name='user-update'),
    path('api/auth/user/me/', CurrentUserView.as_view(), name='current-user'),
    path('api/boletines/crear/', BoletinCreateView.as_view(), name='crear-boletin'),
    path('api/boletines/', BoletinListView.as_view(), name='boletines'),
    path('api/boletines/<int:id>/', BoletinDetailView.as_view(), name='boletin-detail'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) +router.urls
