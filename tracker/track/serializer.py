from rest_framework import serializers
from .models import Record

class AllRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = [Record]

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'created', 'ended', 'uid', 'is_active']
