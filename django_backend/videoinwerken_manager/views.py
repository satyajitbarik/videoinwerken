import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Course, CourseQuestion, CourseQuestionAnswer
#from ..user_profile.models import User


# Create your views here.
from .serializers import CourseSerializer, CourseQuestionSerializer, CourseQuestionAnswerSerializer


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

class CourseQuestionView(viewsets.ModelViewSet):
    queryset = CourseQuestion.objects.all()
    serializer_class = CourseQuestionSerializer

class CourseQuestionAnswerView(viewsets.ModelViewSet):
    queryset = CourseQuestionAnswer.objects.all()
    serializer_class = CourseQuestionAnswerSerializer

