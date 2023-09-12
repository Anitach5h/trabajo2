from django.db import models
from django.contrib.auth.models import User

# Modelo Tarea.
class Tarea(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    important = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)    
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Cadena para representar el objeto Tarea (en el sitio de Admin)
    def __str__(self):
        return self.title