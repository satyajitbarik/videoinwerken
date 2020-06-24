from django.contrib.auth import get_user_model

from .models import UserProfile
from .serializers import UserSerializer
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

        # get all users who are employee of current_user and are employee
        queryset = self.queryset.filter(userprofile__is_employee=True, id__in=User.objects.get(pk=current_user_id).employees.all())

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

