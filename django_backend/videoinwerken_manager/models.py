from django.db import models

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    #active = models.BooleanField()
    #individual_result = models.BooleanField() # can employee see individual result per question?
    #course_duration = models.TimeField()
    #video = models.CharField(max_length=255) # different model for this? website url?