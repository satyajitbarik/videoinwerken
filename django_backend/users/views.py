from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import viewsets, request
from users.models import CustomUser
from users.serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


# display all your employees (as manager)
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def list(self, request):
        current_user_id = 1;
        if (request.user.pk):
            current_user_id = request.user.pk

        # get all users who are employee of current_user and are employee
        queryset = self.queryset.filter(employer=current_user_id)

        serializer = CustomUserSerializer(queryset, many=True)
        return Response(serializer.data)
