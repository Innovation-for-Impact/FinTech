from django.shortcuts import render
import django.http as http
from django.views.decorators.csrf import csrf_exempt
import django.contrib.auth as auth

from api.models import FintechUser

def api(_):
    return http.HttpResponse("")

def signup(request: http.HttpRequest):
    if(request.method == "POST"):
        email: str = request.POST.get("email", "")
        password_one: str = request.POST.get("password_one", "")
        password_two: str = request.POST.get("password_two", "")
        first_name: str = request.POST.get("first_name", "")
        last_name: str = request.POST.get("last_name", "")

        if (not password_one or not password_two) or password_one != password_two:
            return http.HttpResponseBadRequest("Passwords are not the same")
        if(len(email) <= 0):
            return http.HttpResponseBadRequest("Missing email")
        if(len(first_name) <= 0):
            return http.HttpResponseBadRequest("Missing first name")
        if(len(last_name) <= 0):
            return http.HttpResponseBadRequest("Missing last name")

        try:
            user = FintechUser.objects.create_user(
                email=email,
                password=password_one,
                first=first_name,
                last=last_name
            )
            user.save()
        except:
            return http.HttpResponseBadRequest("A user with this email already exists")

        return http.HttpResponse("User created")
    else:
        return http.Http404();

def login(request: http.HttpRequest):
    if request.method == "POST":
        email: str = request.POST.get("email", "")
        password: str = request.POST.get("password", "")

        if(len(email) <= 0 or len(password) <= 0):
            return http.HttpResponseBadRequest("Missing username or password")
        
        user = auth.authenticate(
            email=email,
            password=password
        )

        if user is not None:
            return http.HttpResponse(status=200)
        else:
            return http.HttpResponseNotFound("Incorrect username or password")
    else:
        return http.Http404()

# Create your views here.
