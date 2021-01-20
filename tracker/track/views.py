from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from track.models import Record
from track.serializer import RecordSerializer
import time


class GetAllRecords(generics.ListAPIView):
    """
    Returns all records
    """
    queryset = Record.objects.all()
    serializer_class = RecordSerializer


class AddRecord(APIView):
    """
    Adds a new record
    """

    def post(self, request, format=None):
        temp = { "created": int(time.time()), "ended": 0, "uid": 1, "is_active": True}
        serializer = RecordSerializer(data=temp)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
