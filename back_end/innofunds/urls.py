from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import innofunds.views.users as user_views
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', viewset=user_views.FintechUserViewSet, basename='users')


urlpatterns = [
    path('', include(router.urls)), 
    path('create_link_token/', views.create_link_token, name="create_link_token"),
    path('exchange_public_token/', views.exchange_public_token, name="exchange_public_token"),
    path('get_transactions/', views.get_transactions, name="get_transactions"),
]
