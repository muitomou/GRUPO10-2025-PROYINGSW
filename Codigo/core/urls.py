from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='inicio'),
    path('boletines-de-vigilancia/', views.boletines, name='boletines'),
    path('panoramas/', views.panoramas, name='panoramas'),
    path('perfil/', views.perfil, name='perfil'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),

]