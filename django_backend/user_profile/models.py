from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # custom fields for user
    iban = models.CharField(max_length=255, blank=True, null=True)
    expiration_date = models.DateField(blank=True, null=True)

    # Admin (Luke)
    # Manager (store manager)
    # Employee
