from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
from django.views.decorators.csrf import csrf_exempt

def account_login(request):
    return render_nextjs_page_sync(request)

def account_signup(request):
    return render_nextjs_page_sync(request)

def account_reset_password(request):
    return render_nextjs_page_sync(request)

def account_reset_password_done(request):
    return render_nextjs_page_sync(request)

def account_change_password(request):
    return render_nextjs_page_sync(request)