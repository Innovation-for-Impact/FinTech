from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import innofunds.views.users as user_views
from rest_framework_nested import routers
from .views import plaid

router = routers.DefaultRouter()
router.register(r'users', viewset=user_views.FintechUserViewSet, basename='users')


urlpatterns = [
    path('', include(router.urls)), 
    path('create_link_token/', plaid.create_link_token, name="create_link_token"),
    path('exchange_public_token/', plaid.exchange_public_token, name="exchange_public_token"),
    path('get_transactions/', plaid.get_transactions, name="get_transactions"),
]
