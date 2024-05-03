from django.urls import path
import account.views as views
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="login")),
    path("home/", views.home),
    path("login/", views.login),
    path("logout/", views.logout),
    path("register/", views.register),
    path("adminLogin/", views.adminLogin),
    path("queryUserInfo/", views.queryUserInfo)
]
