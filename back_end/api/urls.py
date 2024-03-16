from django.urls import path
from .views.index import index
from .views.account.views import account_login, account_signup, account_reset_password, account_reset_password_done, account_change_password
from .views.dashboard.views import dashboard

urlpatterns = [
    path("", index, name="index"),
    path("account/login", account_login, name="account_login"),
    path("account/signup", account_signup, name="account_signup"),
    path("account/reset_password", account_reset_password, name="account_reset_password"),
    path("account/password/reset/done", account_reset_password_done),
    path("account/password/reset/key/1-set-password", account_change_password, name="account_change_password"),
    path("dashboard", dashboard, name="dashboard")
]