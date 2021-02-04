from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from .managers import AccountManager


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    objects = AccountManager()

    def __str__(self):
        return self.username


class Login(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
