from enum import unique
from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractUser
from itertools import chain
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils.module_loading import module_dir


class FintechGroup(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)


class FintechGroupMembership(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    group_id = models.IntegerField()
    user_id = models.IntegerField()


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
def delete_user_friendships(sender, instance, using, **kwargs):
    """Cleans up a users friendships before they are deleted"""
    FintechFriend.objects.remove_user_friendships(instance)


class FintechFriendManager(models.Manager):
    def create_friendship(self, user1, user2):
        """Creates the friendship with the invariant that the first user
        id id less than the second user's id"""
        small = min(user1.id, user2.id)
        big = max(user1.id, user2.id)

        existing_friendship = (
            self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        )
        if existing_friendship.exists():
            return existing_friendship

        friendship = self.model(user1_pk=small, user2_pk=big)

        friendship.save(using=self._db)
        return friendship

    def get_user_friendships(self, user):
        """Returns a list of user IDs for the user's friends"""
        friends_lower = self.get_queryset().filter(user1_pk=user.pk).values("user2_pk")
        friends_upper = self.get_queryset().filter(user2_pk=user.pk).values("user1_pk")

        # .values(...) returns a dict, so get rid of that
        friends_lower = map(lambda user: user["user2_pk"], friends_lower)
        friends_upper = map(lambda user: user["user1_pk"], friends_upper)

        return list(chain(friends_lower, friends_upper))

    def remove_friendship(self, user1, user2):
        """Unfriends the given two users"""
        small = min(user1.id, user2.id)
        big = max(user1.id, user2.id)

        friendship = self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        if not friendship.exists():
            return

        friendship.delete()

        return

    def remove_user_friendships(self, user):
        """Removes all of a user's friends"""
        friends_lower = self.get_queryset().filter(user1_pk=user.pk)
        friends_upper = self.get_queryset().filter(user2_pk=user.pk)

        friends_lower.delete()
        friends_upper.delete()

    def have_friendship(self, user1, user2):
        """Returns a boolean value indicating if the two users have
        a friendship. True if a friendship does exist"""
        small = min(user1.id, user2.id)
        big = max(user1.id, user2.id)

        friendship = self.get_queryset().filter(user1_pk=small).filter(user2_pk=big)
        return friendship.exists()


class FintechFriend(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    user1_pk = models.IntegerField()
    user2_pk = models.IntegerField()

    objects = FintechFriendManager()
