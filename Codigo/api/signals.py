from django.db.models.signals import post_migrate
from django.dispatch import receiver


@receiver(post_migrate)
def add_default_regions(sender, **kwargs):
    from .models import Region
    if not Region.objects.exists():
        regions = [
            {"nombre": "Arica y Parinacota"},
            {"nombre": "Tarapacá"},
            {"nombre": "Antofagasta"},
            {"nombre": "Atacama"},
            {"nombre": "Coquimbo"},
            {"nombre": "Valparaíso"},
            {"nombre": "Región Metropolitana de Santiago"},
            {"nombre": "Libertador General Bernardo O’Higgins"},
            {"nombre": "Maule"},
            {"nombre": "Ñuble"},
            {"nombre": "Biobío"},
            {"nombre": "La Araucanía"},
            {"nombre": "Los Ríos"},
            {"nombre": "Los Lagos"},
            {"nombre": "Aysén del General Carlos Ibáñez del Campo"},
            {"nombre": "Magallanes y de la Antártica Chilena"},
        ]
        for region in regions:
            Region.objects.create(**region)
        print("Regiones creadas automáticamente tras migraciones.")