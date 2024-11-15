from dj_rest_auth.serializers import UserDetailsSerializer
from innofunds.models import FintechFriend, FintechUser
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


class LimitedUserSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer that does not return private information"""

    class Meta:
        model = FintechUser
        fields = ["id", "first_name", "last_name"]


class FriendSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FintechFriend
        fields = ["user1_pk", "user2_pk", "type"]
