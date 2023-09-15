from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UsuarioSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework import APIView

from django.shortcuts import get_object_or_404
from django.shortcuts import HttpResponse
from django.contrib.auth import logout
from django.http import JsonResponse
from datetime import date

# Tareas
from .models import Tarea
from .serializers import TareaSerializers

#Tareas Hechas
class TareasHechas(APIView):
    def get(self, request):
        tareas=Tarea.objects.filter(hecha=True)
        serializer=TareaSerializers(tareas, many=True)
        return Response(serializer.data)

#Filtrar tareas por fecha
def filtrar_tareas_por_fecha(request):
    #obtener la fecha actual
    fecha_actual=date.today()

    #filtrado de tareas po fechas
    tareas=Tarea.objects.filter(fecha__gte=fecha_actual)

    #imprime las tareas
    for tarea in tareas:
        print(tarea.nombre)

    return  HttpResponse("Tareas filtradas por fechas.")


# Vistas basadas en funciones
# Autenticación por Token.
# La petición se captura en el método POST.
@api_view(['POST'])
def registrar_usuario(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        token = Token.objects.create(user=User)
        return Response({"token": token.key, "usuario": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def iniciar_sesion(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"Error": "Contraseña o nombre de usuario incorrectos"}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UsuarioSerializer(instance=user)
    return Response({"token": token.key, "usuario": serializer.data}, status=status.HTTP_200_OK)

def logout(request):
    if request.user.is_authenticated:
        return JsonResponse({"Mensaje": "Sesion cerrada correctamente"}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"Mensaje": "No hay sesion activa"}, status=status.HTTP_400_BAD_REQUEST)

"""
función completada:
@api_view(['POST'])
def cerrar_sesion(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"Mensaje": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
"""   

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])   #Negará el permiso a cualquier usuario no identificado.
def test_token(request):
    return Response("¡Aprobado!")


#Crear conjunto de vistas
@api_view(['GET'])
def DetalleApi(request):
    api_urls = {
        'List':'/task-list/',
        'Create':'/task-create/',
        'Detail View':'/task-detail/<str:pk>/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def listaTarea(request):
    tareas = Tarea.objects.all()
    serializer = TareaSerializers(tareas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detalleTarea(request, pk):
    tarea = Tarea.objects.get(id=pk)
    serializer = TareaSerializers(tarea, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def crearTarea(request):
    serializer = TareaSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()        
        return Response({"tarea": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def actualizarTarea(request, pk):
    tarea = Tarea.objects.get(id=pk)
    serializer = TareaSerializers(instance=tarea, data=request.data)
    if serializer.is_valid():
        serializer.save()        
        return Response({"tarea actualizada": serializer.data})
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def eliminarTarea(request, pk):
    tarea = Tarea.objects.get(id=pk)
    tarea.delete()
    return Response({"Mensaje": "¡Eliminado exitosamente!"}, status=status.HTTP_200_OK)

"""
@api_view(['DELETE'])
def eliminarTarea(request, pk):
    tarea = get_object_or_404(Tarea, id=pk)
    tarea.delete()
    return Response({"Mensaje": "¡Eliminado exitosamente!"}, status=status.HTTP_202_ACCEPTED)
"""