import time
from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from track.models import Record
from track.serializer import RecordSerializer


class GetAllRecords(generics.ListAPIView):
    """
    Returns all records
    """
    queryset = Record.objects.all()
    serializer_class = RecordSerializer


class GetActiveRecords(APIView):
    """
    Returns an array of active records for this user
    """

    def get(self, request, format=None):
        user = request.user
        existing = Record.objects.filter(uid=user.id, is_active=True)

        # return an existing record
        if len(existing) > 0:
            all_records = RecordSerializer(existing, many=True)
            return Response(all_records.data, status=status.HTTP_200_OK)

        # no data was found
        return Response({"status": "No record exists"},
                        status=status.HTTP_400_BAD_REQUEST)

        # we need to create a new record and return that instead
        # old deprecated code
        #
        # temp = {"created": int(time.time()), "ended": 0,
        #         "uid": user.id, "is_active": True}
        # serializer = RecordSerializer(data=temp)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors,
        # status=status.HTTP_400_BAD_REQUEST)


class AddRecord(APIView):
    """
    Adds a new record, given one doesn't already exists
    """

    def post(self, request, format=None):
        user = request.user
        serializer = RecordSerializer(data=request.data)

        if serializer.is_valid():
            temp = {
                "created": int(time.time()),
                "ended": 0,
                "uid": user.id,
                "is_active": True,
                "topic": serializer.validated_data['topic']
            }

            serializer = RecordSerializer(data=temp)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("invalid serializer")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetRecords(APIView):
    """
    TODO: set the ended time
    """

    def get(self, request, format=None):
        user = request.user
        existing = Record.objects.filter(uid=user.id, is_active=True)

        for i in existing:
            print(i.topic)

            temp = {
                "created": int(time.time()),
                "ended": 0,
                "uid": user.id,
                "is_active": True,
                "topic": i.topic
            }

            serializer = RecordSerializer(data=temp)

            if serializer.is_valid():
                serializer.save()
                i.is_active = False
                i.save(update_fields=['is_active'])
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'Resetted all records'}, status=status.HTTP_200_OK)


class DisableAllRecords(APIView):
    """
    Sets all existing records as not active
    """

    def get(self, request, format=None):
        Record.objects.all().update(is_active=False)
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class DisableAllActiveRecords(APIView):
    """
    TODO:
    Sets all existing records as not active
    for a specific user

    params: uid
    """

    def get(self, request, format=None):
        all_records = Record.objects.filter(uid=request.user.id)
        for record in all_records:
            record.is_active = False
            record.save(update_fields=["is_active"])
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
