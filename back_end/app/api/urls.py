from django.urls import path

from . import views

urlpatterns = [
    path("", views.api, name="api"),
    path("login", views.login, name="login"),
    path("signup", views.signup, name="signup")
]