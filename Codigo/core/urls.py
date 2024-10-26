from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='inicio'),
    path('boletines-de-vigilancia/', views.boletines, name='boletines')

]