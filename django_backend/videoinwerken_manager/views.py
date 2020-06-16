import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Course
#from ..user_profile.models import User


# Create your views here.
from .serializers import CourseSerializer

#class ListAllCourses(generics.ListCreateAPIView):
   # def get(self, request):
        #print("hello")
        #print(sys.path)
        #abc = request.data    #HOW TO GET PARAMS FROM REACT?
        # queryset = Course.objects.all()

        #queryset = Course.objects.filter(manager_id=1)
        #serializer_class = CourseSerializer

#class ListCoursesOfManager(generics.ListCreateAPIView):
   # queryset = Course.objects.get(manager)
    #serializer_class = CourseSerializer

#class CreateCourse(generics.CreateAPIView):
    #queryset = Course.objects.all()
    #serializer_class = CourseSerializer

class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# View all courses of manager_id, and create courses using this
class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def list(self, request):
        print("manager_id="+request.query_params['manager_id'])   #query_params if GET, data if POST!
        manager_id = request.query_params['manager_id']
        queryset = Course.objects.filter(manager_id=manager_id)
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

# this is used to access the api in browser
class CourseViewAll(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer