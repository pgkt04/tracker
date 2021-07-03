from django.urls import path, include
from rest_framework import renderers
from rest_framework.decorators import api_view
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from track import views

urlpatterns = [
    # should be disabled, but enabled for debugging
    path('all-records/', views.GetAllRecords.as_view()),

    # inserts a new record with a topic
    path('add-record/', views.AddRecord.as_view()),

    # disable all records
    path('disable-records/', views.DisableAllRecords.as_view()),

    # TODO: disable a specific users record

    # gets the record for the current user
    path('get-records/', views.GetActiveRecords.as_view()),

    # TODO: disable all records for a speicifc user

    # reset a record to 0 given id
    path('reset-record/', views.ResetRecord.as_view())
]
