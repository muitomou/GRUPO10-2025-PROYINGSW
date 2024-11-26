from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .forms import Signin, Signup, EditarPerfilForm
from api.models import Boletin
import json
import os
# Create your views here.

def index(request):
    return render(request, 'index.html')

def boletines(request):
    return render(request, 'boletines.html')

def nuevo_boletin(request):
    return render(request, 'crearBoletin.html')

def panoramas(request):
    return render(request, 'panoramas.html')

@login_required  # Solo los usuarios autenticados pueden acceder
def perfil(request):
    if request.method == 'POST':
        form = EditarPerfilForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('perfil')  # Redirige después de guardar
    else:
        form = EditarPerfilForm(instance=request.user)

    return render(request, 'perfil.html', {'form': form})

def adminView(request):
    return render(request, 'adminView.html')

def categorias(request):
    return render(request, 'categorias.html')

def boletin(request, id):
    # Buscar el boletín por id
    boletin = get_object_or_404(Boletin, id=id)
    return render(request, 'boletin.html', {'boletin': boletin})


def signup(request):
    if request.user.is_authenticated:
        return redirect('inicio')  # Redirige si ya está autenticado
    if request.method == 'POST':
        form = Signup(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Inicia sesión automáticamente
            messages.success(request, 'Registro exitoso. ¡Bienvenido!')
            return redirect('inicio')  # Cambia 'inicio' por la ruta deseada
        else:
            messages.error(request, 'Corrige los errores del formulario.')
    else:
        form = Signup()
    return render(request, 'signup.html', {'form': form})

def signin(request):
    if request.user.is_authenticated:
        return redirect('inicio')  # Redirige si el usuario ya está autenticado
    if request.method == 'POST':
        form = Signin(data=request.POST)  # Usa el formulario predeterminado de Django
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Inicio de sesión exitoso.')
            return redirect('inicio')  # Cambia 'inicio' por la página a la que deseas redirigir
        else:
            messages.error(request, 'Nombre de usuario o contraseña incorrectos.')
    else:
        form = Signin()
    return render(request, 'signin.html', {'form': form})

@login_required
def signout(request):
    logout(request)
    return redirect('inicio')