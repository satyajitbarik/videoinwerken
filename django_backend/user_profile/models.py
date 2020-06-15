from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    is_admin = models.BooleanField('is_admin', default=False) # Luke
    is_employee = models.BooleanField('is_employee', default=False)

    # custom fields for business manager
    is_manager = models.BooleanField('is_manager', default=False)
    business_name = models.CharField(max_length=255, blank=True, null=True)
    license_expiration_date = models.DateField(blank=True, null=True)
    billing_address = models.CharField(max_length=255, blank=True, null=True)
    iban = models.CharField(max_length=255, blank=True, null=True)

