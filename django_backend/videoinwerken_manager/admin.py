from django.contrib import admin

# Register your models here.
from videoinwerken_manager.models import Course, CourseQuestion, CourseQuestionAnswer

admin.site.register(Course)
admin.site.register(CourseQuestion)
admin.site.register(CourseQuestionAnswer)