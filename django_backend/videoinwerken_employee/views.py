import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

# list my courses (from manager)
from videoinwerken_manager.models import Course
from videoinwerken_manager.serializers import CourseSerializer


class EmployeeCourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        if (self.request.user):
           return Course.objects.filter(manager_id=self.request.user.employer)
        else:
            return Course.objects.all()
