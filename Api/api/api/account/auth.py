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
                return http.JsonResponse({
                    "code": "400",
                    "error": "Invalid username or password"
                })
        except:
            return http.JsonResponse({
                "code": "400",
                "error": "Invalid username or password"
            })

        res = authviews.login(request)
        if(res.status_code == 200):
           return http.JsonResponse({
                "code": "400",
                "error": "Invalid username or password"
            })
        return res
    return redirect('/')

def auth_signup(request):
    if request.method == "POST":
        username = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']            

        # Check if user already exists
        try:
            FintechUser.objects.get(email=username)
            return http.JsonResponse({
                "code": "400",
                "error": "A user with this email already exists."
            })
        except:
            pass
        
        if password1 != password2:
            return http.JsonResponse({
                "code": "400",
                "error": "Passwords do not match"
            })

        res = authviews.signup(request)
        if(res.status_code == 200):
           return http.JsonResponse({
                "code": "400",
                "error": res.getvalue()
            })
        return res
    return redirect('/signup')

def auth_reset_password(request):
    if request.method == "POST":
        return authviews.password_reset(request)
    return redirect('/reset_password')

def auth_reset_password_done(request):
    print(request)
    if request.method == "GET":
        return redirect('/password/reset/done')
    return authviews.password_reset_done(request)

def auth_password_change(request, *args, **kwargs):
    if request.method == "GET" and kwargs['key'] == 'set-password':
        return redirect('/password/reset/key/' + kwargs['uidb36'] + '-' + kwargs['key'])
    return authviews.password_reset_from_key(request, *args, **kwargs)

def auth_reset_password_key_done(request):
    return redirect('/password/reset/key/done')

class AuthAccountAdapter(DefaultAccountAdapter):
    def get_login_redirect_url(self, request):
        path = "/dashboard"
        return path
    
    def get_signup_redirect_url(self, request):
        path = "/dashboard"
        return path

    def get_password_change_redirect_url(self, request):
        path = "/account/login"
        return path

