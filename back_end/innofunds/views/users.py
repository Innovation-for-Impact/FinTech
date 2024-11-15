from urllib.request import HTTPPasswordMgrWithDefaultRealm
from django.shortcuts import render
from rest_framework import viewsets, permissions
from innofunds.models import FintechFriend, FintechUser
from innofunds.serializers import (
    FriendSerializer,
    UserSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewPermission(permissions.BasePermission):
    """
    Limits the view of all users to admins, while individual
    users are limited to themselves
    """

    def has_permission(self, request, view):
        if view.action == "retrieve":
            return True
        else:
            return request.user.is_authenticated and request.user.is_admin

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff and request.user.is_authenticated
        ) or obj.id == request.user.id


class FintechUserViewSet(viewsets.ModelViewSet):
    """
    Gets all users; limited by UserViewPermission
    """

    queryset = FintechUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserViewPermission]

    @action(detail=True, methods=["post", "get"])
    def friends(self, request, pk=None):
        if request.method == "POST":
            recipient_id = int(request.POST.get("recipient_id"))
            FintechFriend.objects.friend_request(self.get_object().id, recipient_id)
            return Response("Friend request sent")
        elif request.method == "GET":
            limit = int(request.GET.get("limit", 10))
            offset = int(request.GET.get("offset", 0))
            type = int(request.GET.get("type", 3))
            friend_ids = FintechFriend.objects.get_user_relationships(
                self.get_object().id, type=type, limit=limit, offset=offset
            )
            friends = FintechUser.objects.all().filter(id__in=friend_ids)

            serializer = self.get_serializer(friends, many=True)
            return Response(serializer.data)


class FintechFriendsViewSet(viewsets.ModelViewSet):
    """Gets all friends"""

    queryset = FintechFriend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAdminUser]


# how do I give the frontend friends
# api/v1/user/1/friends
# need to add an endpoint for accepting a friend request
# need an emdpoint for rejecting a friend request
# need an endpoint for sending a friend request
# need and endpoint for getting a user's friends
