from dj_rest_auth.serializers import UserDetailsSerializer
from innofunds.models import FintechUser
from rest_framework import serializers

class FintechUserDetailsSerializer(UserDetailsSerializer):
    """
    Used for displaying info after a user logs in
    """
    class Meta:
        model = FintechUser
        fields = ["id", "email", "first_name", "last_name"]

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FintechUser
        fields = ["id", "email", "first_name", "last_name"]