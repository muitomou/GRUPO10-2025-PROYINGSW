from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
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


# ARREGLAR ******
def crear_boletin(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descripcion = request.POST.get('descripcion')
        fecha_publicacion = request.POST.get('fecha_publicacion')

        Boletin.objects.create(
            titulo=titulo,
            descripcion=descripcion,
            fecha_publicacion=fecha_publicacion
        )

        return redirect('boletin')

    return render(request, 'core/crear_boletin.html')
