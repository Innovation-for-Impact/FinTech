from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.contrib.auth.models import PermissionsMixin

class FintechUserManager(BaseUserManager):
    def create_user(self, email, password, first_name, last_name):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=FintechUserManager.normalize_email(email).lower(),
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, 
        email, 
        password, 
        first_name, 
        last_name
    ):
        """
        Creates and saves a superuser with the given email and password.
        """
        u = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        u.is_admin = True
        u.save(using=self._db)
        return u

class FintechUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_admin = models.BooleanField(default=False)
    first_name = models.CharField(max_length=64, default="")
    last_name = models.CharField(max_length=64, default="")

    objects = FintechUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __unicode__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
# Create your models here.
