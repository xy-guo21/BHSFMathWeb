from django.urls import path
import problem.views as views

urlpatterns = [
    path("problemQueryFilter", views.problemQueryFilter),
    path("problemQuery", views.problemQueryID),
]
