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

class UserViewSet1(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        #queryset = User.objects.filter(iban="a") # how to do is_employee=True
        queryset= User.objects.filter(userprofile__is_employee=True)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)




class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    #queryset = UserProfile.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


