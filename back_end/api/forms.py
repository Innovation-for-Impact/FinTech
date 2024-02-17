import allauth.account.forms as forms
import django.http as http

class LoginOverrideForm(forms.LoginForm):
    def __init__(self, *args, **kwargs):
        raise http.Http404()

class SignupOverrideForm(forms.SignupForm):
    def __init__(self, *args, **kwargs):
        raise http.Http404()