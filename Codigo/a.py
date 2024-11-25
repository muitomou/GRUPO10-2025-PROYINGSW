import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Vigifia.settings')  # Ajusta si el nombre es distinto
django.setup()


from core.models import Region

regiones = [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama",
    "Coquimbo", "Valparaíso", "Metropolitana de Santiago",
    "O'Higgins", "Maule", "Ñuble", "Biobío", "Araucanía",
    "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
]

for region in regiones:
    Region.objects.get_or_create(nombre=region)

print("Regiones pobladas con éxito.")
