from django_nextjs.render import render_nextjs_page_sync
from django.contrib.auth.decorators import login_required

@login_required(login_url="/account/login")
def dashboard(request):
    return render_nextjs_page_sync(request)