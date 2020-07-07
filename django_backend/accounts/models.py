from django.db import models

# Create your models here.
class User(AbstractBaseUser):
    phone = models.CharField(validator = [phone_regex], max_length=15, )