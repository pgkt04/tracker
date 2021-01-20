from django.urls import path, include
from rest_framework import renderers
from rest_framework.decorators import api_view
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from track import views

urlpatterns = [
    path('get-records/', views.GetAllRecords.as_view()),
    path('add-record/', views.AddRecord.as_view()),
]
