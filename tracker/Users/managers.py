from django.contrib.auth.base_user import BaseUserManager
from time import time


class AccountManager(BaseUserManager):
    """
    User model for creating users where username is the unique identifier for aut
    """

    def create_user(self, username, password):
        if not username:
            raise ValueError('User must have a username')
        if not password:
            raise ValueError('User must have a password')

        user = self.model(
            username=username,
            created=time(),
            is_active=True,
        )
        user.set_password(password)
        user.save()
        return user

    def create_staff(self, username, password):
        if not username:
            raise ValueError('User must have a username')
        if not password:
            raise ValueError('User must have a password')

        user = self.model(
            username=username,
            created=time(),
            is_active=True,
            is_staff=True,
        )
        user.set_password(password)
        user.save()
        return user
