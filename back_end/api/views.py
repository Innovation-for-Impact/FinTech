from django.shortcuts import render
from rest_framework import generics
from . import models
from .models import FintechUser
from  .serializers import UserSerializer
import django.http as http
from django.views.decorators.csrf import csrf_exempt
import django.contrib.auth as auth

from api.models import FintechUser

class User(generics.RetrieveAPIView):
    queryset = FintechUser.objects.all()
    serializer_class = UserSerializer


def api(_):
    return http.HttpResponse("")

# Create your views here.
