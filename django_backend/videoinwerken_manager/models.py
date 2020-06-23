from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Course(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    active = models.BooleanField(default=True)
    individual_result = models.BooleanField(default=False) # can employee see individual result per question?
    course_duration = models.CharField(max_length=255, blank=True, null=True)  # different model for this? website url?
    video = models.CharField(max_length=255, blank=True, null=True)  # different model for this? website url?
    manager_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title