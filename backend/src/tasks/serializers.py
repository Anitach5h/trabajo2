from rest_framework import serializers
from django.utils.formats import date_format
from django.contrib.auth.models import User
from .models import Tarea

#
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

#
class TareaSerializers(serializers.ModelSerializer):
    class Meta():
        model = Tarea
        fields = ('id', 'title', 'description', 'completed', 'created', 'updated')
        #fields = '__all__'