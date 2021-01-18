from django.urls import path, include
from rest_framework import renderers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from track import views

router = DefaultRouter()
router.register(r'records', views.RecordViewSet)

urlpatterns = [
    path('', include(router.urls))
]
