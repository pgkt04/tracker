from rest_framework import serializers
from track.models import Record


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'created', 'ended', 'user', 'is_active']
