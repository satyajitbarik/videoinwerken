from django.db import models

from users.models import CustomUser
from videoinwerken_manager.models import CourseQuestion


class EmployeeQuestion(models.Model):
    employee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(CourseQuestion, on_delete=models.CASCADE, null=False)
    #question = models.OneToOneField(CourseQuestion, on_delete=models.CASCADE, null=False)
    attempted = models.BooleanField(default=False)
    passed = models.BooleanField(default=False)