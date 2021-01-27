from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .managers import UserManager

class Users(AbstractBaseUser):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    created = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.username
 