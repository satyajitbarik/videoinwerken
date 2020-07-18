from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import viewsets, request, status
from users.models import CustomUser
from users.serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


# display all your employees (as manager)
#list my employes (from manager)
class MyEmployeeViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(employer=self.request.user.pk)

# display all your employees (as manager)
#add/delete
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)