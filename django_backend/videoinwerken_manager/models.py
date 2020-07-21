from django.db import models
from django.contrib.auth import get_user_model

from users.models import CustomUser

class Course(models.Model):
    manager_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    active = models.BooleanField(default=True)
    individual_result = models.BooleanField(default=False) # can employee see individual result per question?
    course_duration = models.CharField(max_length=255, blank=True, null=True)  # different model for this? website url?
    video = models.CharField(max_length=255, blank=True, null=True)  # different model for this? website url?

    def __str__(self):
        return self.title

class CourseQuestion(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=False)
    question = models.CharField(max_length=255, blank=False, null=False)

class CourseQuestionAnswer(models.Model):
    course_question = models.ForeignKey(CourseQuestion, on_delete=models.CASCADE, null=False)
    answer = models.CharField(max_length=255, blank=False, null=False)
    correct = models.BooleanField(default=False)