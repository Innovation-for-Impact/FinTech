import allauth.account.forms as forms
import django.http as http 
from django.shortcuts import redirect
import allauth.account.views as authviews
from allauth.account.adapter import DefaultAccountAdapter
from ...models import FintechUser
from django.views.decorators.csrf import csrf_exempt

def auth_login(request):
    if request.method == "POST":
        username = request.POST['login']
        password = request.POST['password']
        try:
            user = FintechUser.objects.get(email=username)
            if not user.check_password(password):
                return http.HttpResponseNotFound("Invalid username or password")
        except:
            return http.HttpResponseNotFound('Invalid username or password')

        res = authviews.login(request)
        if(res.status_code == 200):
           return redirect('/')
        return res
    return redirect('/account/login')

def auth_signup(request):
    if request.method == "POST":
        username = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']            

        # Check if user already exists
        try:
            FintechUser.objects.get(email=username)
            return http.HttpResponseBadRequest('A user with this email already exists')
        except:
            pass
        
        if password1 != password2:
            return http.HttpResponseBadRequest('Passwords do not match')

        res = authviews.signup(request)
        if(res.status_code == 200):
           return redirect('/signup')
        return res
    return redirect('/signup')

def auth_reset_password(request):
    if request.method == "POST":
        return authviews.password_reset(request)
    return redirect('/account/reset_password')

@csrf_exempt
def auth_password_change(request):
    if request.method == "GET":
        return redirect('/account/password/reset/key/1-set-password')
    return authviews.password_set(request)

def auth_reset_password_done(request):
    if request.method == "GET":
        return redirect('/account/password/reset/done')
    #return authviews.password_reset_done(request)

class AuthAccountAdapter(DefaultAccountAdapter):
    def get_login_redirect_url(self, request):
        path = "/dashboard"
        return path

    def get_password_change_redirect_url(self, request):
        path = "/account/login"
        return path

