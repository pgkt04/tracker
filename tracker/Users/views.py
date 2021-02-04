from django.shortcuts import render
from django.contrib.auth import authenticate
from django.core.serializers import serialize
from rest_framework import serializers, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Login, Account
from .serializer import AccountSerializer, LoginSerializer


from rest_framework.request import Request


class ListUsers(generics.ListAPIView):
    """
    Lists all users
    """
    permission_classes = [permissions.AllowAny]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class RegisterUser(APIView):
    """
    Registers a user
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():

            if len(Account.objects.filter(username=serializer.validated_data['username'])) > 0:
                return Response({'detail': 'username already exists'}, status=status.HTTP_200_OK)

            Account.objects.create_user(
                '',
                serializer.validated_data['username'],
                serializer.validated_data['password']
            )

            return Response({'detail': 'success'})
            # return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors)


class RegisterStaff(APIView):
    """
    Registers a staff
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():

            if len(Account.objects.filter(username=serializer.validated_data['username'])) > 0:
                return Response({'detail': 'username already exists'}, status=status.HTTP_200_OK)

            Account.objects.create_staff(
                serializer.validated_data['username'], serializer.validated_data['password'])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors)


class LoginUser(APIView):
    """
    Logins and returns a token
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors)

        # authenticate the user
        userlist = Account.objects.filter(
            username=serializer.validated_data['username'])

        if len(userlist) > 0:
            user = userlist[0]
            if user.check_password(serializer.validated_data['password']):
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
        return Response({'detail': 'Invalid credentials or account not found'})


class VerifyToken(APIView):
    """
    Simple check for tokens to validate them and provides additional 
    data about the user
    """

    def post(self, request, format=None):
        username = request.user.username
        return Response({
            'detail': 'success',
            'username': username,
        })


class Logout(APIView):
    """
    Deactivate a token
    """

    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response({'detail': 'Token has been deleted'})
