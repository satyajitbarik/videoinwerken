from django.shortcuts import render
from rest_framework import generics
from .models import Course

# Create your views here.
from .serializers import CourseSerializer


class ListCourse(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer