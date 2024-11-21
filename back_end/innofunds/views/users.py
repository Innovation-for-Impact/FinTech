from urllib.request import HTTPPasswordMgrWithDefaultRealm
from django.contrib.auth.models import PermissionDenied
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.exceptions import APIException
from innofunds.models import FintechFriend, FintechUser
from innofunds.serializers import (
    FriendSerializer,
    LimitedUserSerializer,
    UserSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


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


class IsAdminOrSelfOrReadOnly(permissions.BasePermission):
    """Allows access to all actions if the user is an admin, or
    the user is equal to the object it's trying to access. Otherwise,
    only readyonly actions are allowed"""

    def has_object_permission(self, request, view, obj):
        return (
            request.user
            and request.user.is_authenticated
            and (request.user.is_admin or obj.id == request.user.id)
        ) or request.method == "GET"


class FintechUserViewSet(viewsets.ModelViewSet):
    """
    Gets all users; limited by UserViewPermission
    """

    queryset = FintechUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserViewPermission]

    @action(
        detail=True,
        methods=["post", "get", "delete"],
        permission_classes=[IsAdminOrSelfOrReadOnly],
    )
    def friends(self, request, pk=None):
        # TODO: more advanced permission control in the future:
        # - i.e. the user can limit who views their friends

        if request.method == "POST":
            try:
                recipient_id = int(request.POST.get("recipient_id"))
                FintechFriend.objects.friend_request(
                    self.get_object().id, recipient_id)
                return Response(status=status.HTTP_200_OK)
            except TypeError:
                return Response(
                    "Must provide a valid recipient_id",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except APIException:
                raise
            except Exception:
                return Response(
                    "Friend request already sent, or users are already friends",
                    status=status.HTTP_208_ALREADY_REPORTED,
                )
        elif request.method == "GET":
            limit = int(request.GET.get("limit", 50))
            offset = int(request.GET.get("offset", 0))
            type = int(request.GET.get("type", 3))
            get_id = request.GET.get("id", False)
            friend_ids = FintechFriend.objects.get_user_relationships(
                self.get_object().id, type=type, limit=limit, offset=offset
            )
            if get_id:
                return Response(friend_ids)
            friends = FintechUser.objects.all().filter(id__in=friend_ids)

            serializer_data = 0
            if self.get_object().is_admin:
                serializer_data = self.get_serializer(friends, many=True)
            else:
                serializer_data = LimitedUserSerializer(friends, many=True)
            return Response(serializer_data.data)
        elif request.method == "DELETE":
            try:
                recipient_id = int(request.POST.get("recipient_id"))
                FintechFriend.objects.remove_relationship(
                    self.get_object().id, recipient_id
                )
                return Response(status=status.HTTP_200_OK)
            except TypeError:
                return Response(
                    "Must provide a valid recipient_id",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except APIException:
                raise
            except Exception:
                return Response(
                    "No relationship exists between users",
                    status=status.HTTP_404_NOT_FOUND,
                )

        # @action(
        #    detail=True,
        #    methods=["get"],
        # )
        # def relationship(self, request, other_id, pk=None):
        #    return FintechFriend.objects.get_friendship()


class FintechFriendsViewSet(viewsets.ModelViewSet):
    """Gets all friends"""

    queryset = FintechFriend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAdminUser]
