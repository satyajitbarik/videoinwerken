import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Course
#from ..user_profile.models import User


# Create your views here.
from .serializers import CourseSerializer

# display all your courses (as manager)
class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(manager_id=self.request.user.pk)

    def perform_create(self, serializer):
        if (self.request.user.pk):
            serializer.save(manager_id = self.request.user.pk)
        else:
            serializer.save()