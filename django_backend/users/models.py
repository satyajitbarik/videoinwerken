from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, User
from django.db import models


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    is_employee = models.BooleanField('is_employee', default=False)
    employees = models.ManyToManyField("self", related_name='employees', blank=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['date_of_birth']

    def __str__(self):
        return self.email







    #USERNAME_FIELD = 'email'
    #email = models.EmailField(unique=True)


#is_employee = models.BooleanField('is_employee', default=False)
#employees = models.ManyToManyField("self", related_name='employees', blank=True)