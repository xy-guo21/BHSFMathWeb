from django.urls import path
import account.views as views

urlpatterns = [
    path("", views.as_view("login")),
    path("home", views.home),
    path("login", views.login),
    path("register", views.register),
]
