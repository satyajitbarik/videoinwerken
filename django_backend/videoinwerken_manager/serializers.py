from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'title',
            'description',
        )
        model = Course
