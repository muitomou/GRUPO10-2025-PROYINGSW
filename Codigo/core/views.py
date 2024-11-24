from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from api.models import Boletin

# Create your views here.

def index(request):
    return render(request, 'index.html')

def boletines(request):
    return render(request, 'boletines.html')

def panoramas(request):
    return render(request, 'panoramas.html')

def perfil(request):
    return render(request, 'perfil.html')

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')

def adminView(request):
    return render(request, 'adminView.html')

def boletin(request, id):
    # Buscar el boletín por id
    boletin = get_object_or_404(Boletin, id=id)
    return render(request, 'boletin.html', {'boletin': boletin})





