from django.shortcuts import render
from rest_framework import viewsets, permissions
from innofunds.models import FintechUser
from innofunds.serializers import (
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