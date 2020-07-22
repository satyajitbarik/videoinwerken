import sys

from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response

# list my courses (from manager)
from videoinwerken_employee.models import EmployeeQuestion
from videoinwerken_employee.serializers import EmployeeQuestionSerializer
from videoinwerken_manager.models import Course, CourseQuestion
from videoinwerken_manager.serializers import CourseSerializer, CourseQuestionSerializer


class EmployeeCourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        if (self.request.user):
           return Course.objects.filter(manager_id=self.request.user.employer)
        else:
            return Course.objects.all()

# Get course-questions pairs for an employee
# THIS IS A COUPLE TABLE BETWEEN COURSE AND QUESTION
class EmployeeCourseQuestionsView(viewsets.ModelViewSet):
    queryset = CourseQuestion.objects.all()
    serializer_class = CourseQuestionSerializer

    def list(self, request):
        queryset = CourseQuestion.objects.all()
        if (request.user):
            queryset = self.queryset.filter(course__in=Course.objects.filter(manager_id=request.user.employer))
        serializer = CourseQuestionSerializer(queryset, many=True)
        return Response(serializer.data)

class EmployeeQuestionView(viewsets.ModelViewSet):
    queryset = EmployeeQuestion.objects.all()
    serializer_class = EmployeeQuestionSerializer

    def list(self, request):
        queryset = EmployeeQuestion.objects.all()
        if request.query_params:
            question_id = request.query_params['question_id']
            queryset = EmployeeQuestion.objects.filter(employee=request.user.pk, question=question_id)
        serializer = EmployeeQuestionSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if (self.request.user.pk):
            serializer.save(employee=self.request.user)
        else:
            serializer.save()

# employee-questions pairs for course_id and employee
class EmployeeQuestionsCourse(viewsets.ModelViewSet):
    queryset = EmployeeQuestion.objects.all()
    serializer_class = EmployeeQuestionSerializer

    def list(self, request):
        queryset = EmployeeQuestion.objects.all()
        if request.query_params:
            course_id = request.query_params['course_id']
            queryset = EmployeeQuestion.objects.filter(employee=request.user.pk, course__in=CourseQuestion.objects.filter(course=course_id))
        serializer = EmployeeQuestionSerializer(queryset, many=True)
        return Response(serializer.data)