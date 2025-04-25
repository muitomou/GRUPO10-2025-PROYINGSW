from django.contrib import admin

# Register your models here.
from .models import CustomUser, Region, Categoria, Boletin, BoletinFavoritos,Etiqueta

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    search_fields = ('username', 'email')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Region)
admin.site.register(Categoria)
admin.site.register(Boletin)
admin.site.register(BoletinFavoritos)
admin.site.register(Etiqueta)