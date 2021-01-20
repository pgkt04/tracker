from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from track.models import Record
from track.serializer import RecordSerializer


class GetAllRecords(APIView):
    """
    Returns all records
    """
    queryset = Record.objects.all()

    def get(self, request, format=None):
        records = Record.objects.all()
        serializer = RecordSerializer(records)
        return Response(serializer.data)


class AddRecord(APIView):
    """
    Adds a new record
    """
    def post(self, request, format=None):
        serializer = RecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
