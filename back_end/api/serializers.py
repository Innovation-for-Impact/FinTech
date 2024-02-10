from rest_framework import serializers
from .models import FintechUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FintechUser
        field = ["email", "first_name", "last_name"]
        