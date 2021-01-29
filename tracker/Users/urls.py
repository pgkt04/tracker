from django.urls import path, include


from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name="register"),
    path('staff/', views.RegisterStaff.as_view(), name="staff"),
    path('login/', views.LoginUser.as_view(), name="login"),
    path('verify/', views.VerifyToken.as_view(), name="verify"),
    path('list/', views.ListUsers.as_view(), name="list"),
    path('logout/', views.Logout.as_view(), name="logout"),
]
