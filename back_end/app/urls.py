"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
import api.api.account.auth as auth 

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("api.urls")),
    path("", include("django_nextjs.urls")),
    path("api/account/login/", auth.auth_login, name="account_login"),
    path("api/account/signup/", auth.auth_signup, name="account_signup"),
    path("api/account/reset_password/", auth.auth_reset_password, name="reset_password"),
    path("api/account/password/reset/done/", auth.auth_reset_password_done, name="account_reset_password_done"),
    path("api/account/", include('allauth.urls'))
]
