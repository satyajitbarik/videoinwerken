from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from users.models import CustomUser
from users.serializers import CustomRegisterSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomRegisterSerializer
