from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import innofunds.views.users as user_views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register(r'users', viewset=user_views.FintechUserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]