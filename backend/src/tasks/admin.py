from django.contrib import admin
from .models import Tarea

# Register your models here.
class TareasAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'important', 'created', 'user')

admin.site.register(Tarea, TareasAdmin)