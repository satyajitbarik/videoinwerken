import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Course
#from ..user_profile.models import User


# Create your views here.
from .serializers import CourseSerializer

# list my courses (from manager)
class CourseViewMyCourses(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        if (self.request.user):
           return Course.objects.filter(manager_id=self.request.user.pk)
        else:
            return Course.objects.all()

# delete/update courses
class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        if (self.request.user.pk):
            serializer.save(manager_id=self.request.user)
        else:
            serializer.save()
