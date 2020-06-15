

from django.shortcuts import render
from rest_framework import generics
from .models import Course
#from ..user_profile.models import User

# Create your views here.
from .serializers import CourseSerializer

class ListAllCourses(generics.ListCreateAPIView):
    #queryset = Course.objects.all()
    queryset = Course.objects.filter(manager_id=1)
    serializer_class = CourseSerializer

#class ListCoursesOfManager(generics.ListCreateAPIView):
   # queryset = Course.objects.get(manager)
    #serializer_class = CourseSerializer

#class CreateCourse(generics.CreateAPIView):
    #queryset = Course.objects.all()
    #serializer_class = CourseSerializer

class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

