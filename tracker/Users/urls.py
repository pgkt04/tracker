from django.urls import path, include

from Users import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('list/', views.ListUsers.as_view()),
]