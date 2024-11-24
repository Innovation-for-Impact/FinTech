from enum import IntEnum, unique
from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractUser
from itertools import chain
from django.db.models.manager import BaseManager
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils.module_loading import module_dir


class FintechGroupManager(models.Manager):
    def get_group_member_ids(self, group_id):
        members = self.filter(id=group_id).values("user_id")
        member_ids = map(lambda member: list(member.values())[0], members)

        return member_ids

    def get_group_members(self, group_id):
        member_ids = self.get_group_member_ids(group_id)
        members = FintechUser.objects.all().filter(id__in=member_ids)

        return members

    def get_user_group_ids(self, user_id):
        groups = self.filter(user_id=user_id).values("id")
        group_ids = map(lambda member: list(member.values())[0], groups)

        return group_ids

    def get_user_groups(self, user_id):
        return self.filter(user_id=user_id)

    def delete_all_group_users(self, group_id):
        self.filter(group_id=group_id).delete()

    def remove_user_from_group(self, group_id, user_id):
        self.filter(group_id=group_id).filter(user_id=user_id).delete()

    def remove_users_from_group(self, group_id, user_ids):
        self.filter(group_id=group_id).filter(user_id__in=user_ids).delete()

    def remove_user_from_groups(self, user_id):
        self.filter(user_id=user_id).delete()

    def has_member(self, group_id, user_id):
        return self.filter(group_id=group_id).filter(user_id=user_id).exists()

    def user_has_permissions(self, group_id, user_id, permission_flag):
        membership = self.filter(group_id).get(user_id)
        permissions = membership.permissions_flag
        return permissions & permission_flag > 0


class FintechGroup(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    private = models.BooleanField()

    objects = models.Manager()


@receiver(pre_delete, sender=FintechGroup, dispatch_uid="group_delete_signal")
def clean_up_group(sender, instance, using, **kwargs):
    FintechGroupManager.objects.delete_group_users(instance.id)


class FintechGroupMembership(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    group_id = models.PositiveIntegerField()
    user_id = models.PositiveIntegerField()
    permissions_flag = models.PositiveIntegerField()

    objects = FintechGroupManager()


class FintechUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        """
        Creates and saves a User with the given email, first name
        and password.
        """
        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a first name")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        """
        Creates and saves a superuser with the given email, first name
        and password.
        """
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class FintechUser(AbstractUser):
    # ADD ANY FIELDS YOU NEED HERE
    # !!! you will need to update the database after you make any changes here !!!
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    username = models.CharField("username", max_length=255, unique=False)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    REQUIRED_FIELDS = ["first_name", "last_name"]
    USERNAME_FIELD = "email"
    objects = FintechUserManager()

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin


@receiver(pre_delete, sender=FintechUser, dispatch_uid="user_delete_signal")
def clean_up_user(sender, instance, using, **kwargs):
    """Cleans up a users friendships before they are deleted"""
    FintechFriend.objects.remove_user_friendships(instance.id)
    FintechGroupMembership.objects.remove_user_from_groups(instance.id)


class RelationshipTypes(IntEnum):
    UNKNOWN = 0
    USER1_SENT_REQUEST = 1
    USER2_SENT_REQUEST = 2
    FRIENDS = 3


class FintechFriendManager(models.Manager):
    def create_friendship(
        self, user1_id, user2_id, type: RelationshipTypes = RelationshipTypes.FRIENDS
    ):
        """Creates the friendship with the invariant that the first user
        id is less than the second user's id. By default, type is 3, which
        represents a complete friendship. However, other possible types are
        valid:

        If the friendship already exists, it will not be updated. Use
        update_friendship(...) instead

        If the friendship already exists, or user 1's ID is not
        strictly less than user 2's ID, an exception will be raised
        """

        if user1_id >= user2_id:
            raise Exception("User 1's ID must be strictly less than User 2's")
        if not FintechUser.objects.filter(id=user1_id).exists():
            raise Exception("User 1 does not exist")
        if not FintechUser.objects.filter(id=user2_id).exists():
            raise Exception("User 2 does not exist")

        small = min(user1_id, user2_id)
        big = max(user1_id, user2_id)

        existing_friendship = (
            self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        )
        if existing_friendship.exists():
            raise Exception("Friendship between users already exists")

        friendship = self.model(user1_pk=small, user2_pk=big, type=int(type))

        friendship.save(using=self._db)
        return friendship

    def friend_request(self, sender_id, recipient_id, accept_request: bool = True):
        """Creates a friend request FROM sender TO recipient. If the other user
        has sent a friend request already and `accept_request` is set to true,
        a proper friendship will be created.

        If the friend request was already sent by sender or the users are
        already friends, an exception will be thrown
        """

        if sender_id <= recipient_id:
            if self.have_friendship_of_type(
                sender_id, recipient_id, RelationshipTypes.FRIENDS
            ):
                raise Exception("Friendship already established")

            if self.have_friendship_of_type(
                sender_id, recipient_id, RelationshipTypes.USER2_SENT_REQUEST
            ):
                if accept_request:
                    self.update_friendship(
                        sender_id, recipient_id, RelationshipTypes.FRIENDS
                    )
            else:
                self.create_friendship(
                    sender_id, recipient_id, RelationshipTypes.USER1_SENT_REQUEST
                )
        else:
            if self.have_friendship_of_type(
                recipient_id, sender_id, RelationshipTypes.FRIENDS
            ):
                raise Exception("Friendship already established")

            if self.have_friendship_of_type(
                recipient_id, sender_id, RelationshipTypes.USER1_SENT_REQUEST
            ):
                if accept_request:
                    self.update_friendship(
                        recipient_id, sender_id, RelationshipTypes.FRIENDS
                    )
            else:
                self.create_friendship(
                    recipient_id, sender_id, RelationshipTypes.USER2_SENT_REQUEST
                )

    def update_friendship(self, user1_id, user2_id, type: RelationshipTypes):
        """
        Updates the friendship status between two users. Raises
        an exception if the friendship does not exist, or if user 1's
        ID is not strictly less than user 2's id.
        """
        if user1_id >= user2_id:
            raise Exception(
                "Used 1's ID must be striclty less than User 2's ID")

        friendship = (
            self.get_queryset().filter(user1_pk=user1_id).get(user2_pk=user2_id)
        )

        friendship.type = int(type)
        friendship.save()
        return friendship

    def get_friendship(self, user1_id, user2_id):
        """Gets the friendship between two users. Raises and exception
        if the friendship does not exist"""
        small = min(user1_id, user2_id)
        big = max(user1_id, user2_id)

        friendship = self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        if not friendship.exists():
            raise Exception("Friendship does not exist")
        return friendship

    def get_user_relationships(self, user_id, type=3, limit=50, offset=0):
        """Returns a list of user IDs for the user's friends based on the
        given type

        When type=0, all unknown relationships are retrieved. When type=1,
        gets all relationships where the given user sent a friend request.
        When type=2, gets all relationships where they were sent a friend
        request. When type=3, gets all proper friendships.

        Limit can be at most 100, and must be a positive integer
        """
        friends_lower = (
            self.get_queryset()
            .filter(user1_pk=user_id)
            .filter(type=type)
            .values("user2_pk")
        )

        upper_type = type
        if upper_type == 1:
            upper_type = 2
        friends_upper = (
            self.get_queryset()
            .filter(user2_pk=user_id)
            .filter(type=type)
            .values("user1_pk")
        )

        # Bound the limits
        limit = max(1, min(limit, 100))
        offset = max(0, offset)

        # applies limit and offset variables
        upper = limit + offset
        limited_res = list(friends_lower.union(friends_upper)[offset:upper])
        # .values(...) returns a dict, so get rid of that
        limited_res = map(lambda user: list(user.values())[0], limited_res)

        return list(limited_res)

    def remove_relationship(self, user1_id, user2_id):
        """Removes the relationship between the given two users"""
        small = min(user1_id, user2_id)
        big = max(user1_id, user2_id)

        friendship = self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)

        friendship.delete()

        return

    def remove_user_friendships(self, user_id):
        """Removes all of a user's friends"""
        friends_lower = self.get_queryset().filter(user1_pk=user_id)
        friends_upper = self.get_queryset().filter(user2_pk=user_id)

        friends_lower.delete()
        friends_upper.delete()

    def have_relationship(self, user1_id, user2_id):
        """Returns True if the users have any form of relationsip"""
        small = min(user1_id, user2_id)
        big = max(user1_id, user2_id)

        friendship = self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        return friendship.exists()

    def have_friendship_of_type(
        self, user1_id, user2_id, type: RelationshipTypes = RelationshipTypes.FRIENDS
    ):
        """Returns a boolean value indicating if the two users have
        a friendship of the given type. True if the friendship does exist.

        User 1's ID must be strictly less than User 2's ID
        """
        if user1_id >= user2_id:
            raise Exception(
                "User 1's ID must be striclty less than User 2's ID")

        friendship = (
            self.get_queryset()
            .filter(user1_pk=user1_id)
            .filter(user2_pk=user2_id)
            .filter(type=type)
        )
        return friendship.exists()


class FintechFriend(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    user1_pk = models.PositiveIntegerField()
    user2_pk = models.PositiveIntegerField()

    # type 0: unknown relation
    # type 1: user1 pending on user2
    # type 2: user2 pending on user1
    # type 3: friendship established
    type = models.PositiveIntegerField(default=0)

    objects = FintechFriendManager()
