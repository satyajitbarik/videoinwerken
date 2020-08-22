from rest_framework import serializers
from .models import Course, CourseQuestion, CourseQuestionAnswer

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            'id',
            'title',
            'description',
            'active',
            'individual_result',
            'course_duration',
            'video',
            'manager_id'
        )

class CourseQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseQuestion
        fields = (
            'id',
            'course',
            'question',
        )

class CourseQuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseQuestionAnswer
        fields = (
            'id',
            'course_question',
            'answer',
            'correct',
        )

