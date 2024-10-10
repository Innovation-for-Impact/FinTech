
from django.urls import path
from .views.index import index
from .views.account.views import account_login, account_signup, account_reset_password, account_reset_password_done, account_reset_password_key, account_reset_password_key_done
from .views.dashboard.views import dashboard

urlpatterns = [
    path("", index, name="index"),
    path("", account_login, name="account_login"),
    path("signup", account_signup, name="account_signup"),
    path("recover", account_reset_password, name="account_reset_password"),
    path("password/reset/done", account_reset_password_done),
    path(
        "password/reset/key/<int:id>-set-password",
        account_reset_password_key,
        name="account_reset_password_key",
    ),
    path("password/reset/key/done", account_reset_password_key_done),
    path("dashboard", dashboard, name="dashboard")
]