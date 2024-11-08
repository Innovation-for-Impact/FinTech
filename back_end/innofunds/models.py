from django.db import models

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser

class FintechGroup(models.Model):
    id = models.BigAutoField(unique=True, primary_key=True)
    name = models.CharField(max_length = 255)
    description = models.CharField(max_length = 1000)

# USER
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
            last_name = last_name
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
            last_name = last_name,
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
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # users can be in many groups, and groups can have many users
    groups = models.ManyToManyField(FintechGroup)

    REQUIRED_FIELDS=["first_name", "last_name"]
    USERNAME_FIELD = "email"
    objects = FintechUserManager()

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin