from django.urls import path
from . import views

urlpatterns = [
    path("api/", views.UserListView.as_view(), name='user-list'),
    path("", views.api, name="api"),
]