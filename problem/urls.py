from django.urls import path
import problem.views as views

urlpatterns = [
    path("problemQueryFilter", views.problemQueryFilter),
    path("problemQueryID", views.problemQueryID),
    path("problemQueryDetail", views.problemQueryDetail),
    path("uploadProblem", views.uploadProblem, name="uploadProblem"),
    path("uploadSolution", views.uploadSolution, name="uploadSolution"),
]
