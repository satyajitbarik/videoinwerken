import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Course, CourseQuestion, CourseQuestionAnswer
#from ..user_profile.models import User


# Create your views here.
from .serializers import CourseSerializer, CourseQuestionSerializer, CourseQuestionAnswerSerializer


from rest_framework.permissions import (AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly)



# view my courses (from manager)
class CourseViewMyCourses(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if (self.request.user):
           return Course.objects.filter(manager_id=self.request.user.pk)
        else:
            return Course.objects.all()

# add/update/delete courses
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

    def list(self, request):
        #print("manager_id="+request.query_params['manager_id'])   #query_params if GET, data if POST!
        queryset = CourseQuestion.objects.all()
        if request.query_params:
            course_id = request.query_params['course_id']
            queryset = CourseQuestion.objects.filter(course=course_id)
        serializer = CourseQuestionSerializer(queryset, many=True)
        return Response(serializer.data)

class CourseQuestionAnswerView(viewsets.ModelViewSet):
    queryset = CourseQuestionAnswer.objects.all()
    serializer_class = CourseQuestionAnswerSerializer

    def list(self, request):
        queryset = CourseQuestionAnswer.objects.all()
        if request.query_params:
            question_id = request.query_params['question_id']
            queryset = CourseQuestionAnswer.objects.filter(course_question=question_id)
        serializer = CourseQuestionAnswerSerializer(queryset, many=True)
        return Response(serializer.data)

