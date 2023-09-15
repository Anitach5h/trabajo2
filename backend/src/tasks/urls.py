from django.urls import path
from .views import TareasHechas

urlpatterns = [
    #otras rutas url
    path("api/tareas-hechas/", TareasHechas.as_view(), name="tareas_hechas_api"),
]
