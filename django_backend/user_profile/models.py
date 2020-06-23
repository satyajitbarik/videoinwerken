from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    is_admin = models.BooleanField('is_admin', default=False) # Luke
    is_employee = models.BooleanField('is_employee', default=False)

    # custom fields for business manager
    is_manager = models.BooleanField('is_manager', default=False)
    license_expiration_date = models.DateField(blank=True, null=True)
    business_name = models.CharField(max_length=255, blank=True, null=True)
    billing_address = models.CharField(max_length=255, blank=True, null=True)
    iban = models.CharField(max_length=255, blank=True, null=True)

    employees = models.ManyToManyField(User, related_name='employees')

    def __str__(self):
        return '{} - {}'.format(self.user.pk, self.user.email)


class EmployeeManager(models.Model):
    employee_user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False,related_name='employee_user_id')
    manager_user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False,related_name='manager_user_id')
    # related_name added because django was unable to generate unique names for them