from django.contrib.auth import get_user_model

from .models import UserProfile
from .serializers import UserSerializer
from rest_framework import viewsets, request
from rest_framework import generics

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()#.order_by('-date_joined')
    serializer_class = UserSerializer

class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    #queryset = UserProfile.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


