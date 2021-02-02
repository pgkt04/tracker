from django.contrib.auth.base_user import BaseUserManager
from time import time


class AccountManager(BaseUserManager):
    """
    User model for creating users where username is the unique identifier for aut
    """

    def create_user(self, email, username, password):
        if not username:
            raise ValueError('User must have a username')
        if not password:
            raise ValueError('User must have a password')

        user = self.model(
            username=username,
            email=email,
            is_active=True,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email, username, password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
