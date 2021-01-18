from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from track.models import Record

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    

class GetAllRecords()