from django.urls import path
import account.views as views
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="login")),
    path("home", views.home),
    path("login", views.login),
    path("register", views.register),
]
