from rest_framework import serializers
from .models import Account, Login


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'password',
                  'email', 'is_active', 'created', 'is_staff']


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ['id', 'username', 'password']
