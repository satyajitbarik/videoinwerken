from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from users.models import CustomUser
from users.serializers import CustomRegisterSerializer, CustomUserSerializer
from rest_framework.response import Response

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# display all your employees (as manager)
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = CustomUserSerializer

