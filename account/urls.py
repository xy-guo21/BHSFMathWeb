from django.urls import path
import account.views as views

urlpatterns = [
    path("home", views.home),
]
