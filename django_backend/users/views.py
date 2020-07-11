from rest_framework import viewsets
from users.models import CustomUser
from users.serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# display all your employees (as manager)
class EmployeeViewSet(viewsets.ModelViewSet):
    #queryset = CustomUser.objects.filter(is_employee=True)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

