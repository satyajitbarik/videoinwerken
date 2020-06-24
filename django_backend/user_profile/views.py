from django.contrib.auth import get_user_model

from .models import UserProfile, EmployeeManager
from .serializers import UserSerializer, EmployeeManagerSerializer
from rest_framework import viewsets, request
from rest_framework import generics

from rest_framework.response import Response

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# display all your employees (as manager)
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def list(self, request):
        current_user_id = 19;
        if (request.user.pk):
            current_user_id = request.user.pk
        queryset = self.queryset.filter(id__in=User.objects.get(pk=current_user_id).employees.all())
        #queryset = queryset.filter(is_employee=True);
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class EmployeeManagerViewSet(viewsets.ModelViewSet):
    queryset = EmployeeManager.objects.all()
    serializer_class = EmployeeManagerSerializer

    def list(self, request):
        queryset = EmployeeManager.objects.all()#filter(iban="a")
        #queryset= User.objects.filter(userprofile__is_employee=True)
        serializer = EmployeeManagerSerializer(queryset, many=True)
        return Response(serializer.data)


