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

    # disable a specific users record
    path('delete-record/', views.DisableRecord.as_view()),

    # gets the record for the current user
    path('get-records/', views.GetActiveRecords.as_view()),

    # reset a record to 0 given id
    path('reset-records/', views.ResetRecords.as_view())
]
