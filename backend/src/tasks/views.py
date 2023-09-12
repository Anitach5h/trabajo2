from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated 
from .serializers import UsuarioSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Tareas
from .models import Tarea
from .serializers import TareaSerializers


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

"""
Modificación: Falta completar

@api_view(['GET'])
def cerrar_sesion(request):

    request.user.auth_token.delete()
    return Response({"Mensaje": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)

"""
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])   #Negará el permiso a cualquier usuario no identificado.
def test_token(request):    
    return Response("¡Aprobado!")


# Vistas basadas en funciones
#Definir urls Tareas
@api_view(['GET'])
def urlsTareas(request):
    api_urls = {
        'List':'/tasks-list/',
        'Create':'/tasks-create/',
        'Detail View':'/tasks-detail/<str:pk>/',        
        'Update':'/tasks-update/<str:pk>/',
        'Delete':'/tasks-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def listaTarea(request):
    tareas = Tarea.objects.all()
    serializer = TareaSerializers(tareas, many=True)
    return Response(serializer.data)