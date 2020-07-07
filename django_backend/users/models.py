from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):


    is_admin = models.BooleanField('is_admin', default=False) # Luke
    is_employee = models.BooleanField('is_employee', default=False)
    is_manager = models.BooleanField('is_manager', default=False)

    license_expiration_date = models.DateField(blank=True, null=True)
    business_name = models.CharField(max_length=255, blank=True, null=True)
    billing_address = models.CharField(max_length=255, blank=True, null=True)
    iban = models.CharField(max_length=255, blank=True, null=True)

    #employees = models.ManyToManyField("self", related_name='employees1')

    def __str__(self):
        return '{} - {}'.format(self.user.pk, self.user.email)