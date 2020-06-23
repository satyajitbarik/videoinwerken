from django.contrib.auth import get_user_model

from .models import UserProfile
from .serializers import UserSerializer
from rest_framework import viewsets, request
from rest_framework import generics

from rest_framework.response import Response

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()#.order_by('-date_joined')
    serializer_class = UserSerializer


   # def list(self, request):
        #print("manager_id="+request.query_params['manager_id'])   #query_params if GET, data if POST!
   #     queryset = User.objects.all()
   #     if request.query_params:
    #        manager_id = request.query_params['user_id']
    #        queryset = User.objects.filter(manager_id=manager_id)
    #    serializer = UserSerializer(queryset, many=True)
    #    return Response(serializer.data)





class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    #queryset = UserProfile.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


