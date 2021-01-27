from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from Users.models import Users
from Users.serializer import UserSerializer


class ListUsers(generics.ListAPIView):
    """
    Lists all users
    """
    queryset = Users.objects.all()
    serializer_class = UserSerializer


class RegisterUser(APIView):
    """
    Registers a user
    """

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            Users.objects.create_user(
                serializer.validated_data['username'], serializer.validated_data['password'])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors)
