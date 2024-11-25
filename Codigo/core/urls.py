from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='inicio'),
    path('boletines-de-vigilancia/', views.boletines, name='boletines'),
    path('panoramas/', views.panoramas, name='panoramas'),
    path('perfil/', views.perfil, name='perfil'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('adminView/', views.adminView, name='adminView'),
    path('boletines/<int:id>/', views.boletin, name='boletin'),
    path('crearBoletin/', views.nuevo_boletin, name='crearBoletin'),
    path('categorias/', views.categorias, name='categorias')
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)