from django.urls import path
import problem.views as views

urlpatterns = [
    # Problem Query
    path("problemQueryFilter", views.problemQueryFilter),
    path("problemQueryID", views.problemQueryID),
    path("problemQueryDetail", views.problemQueryDetail),

    # Problem Upload
    path("uploadProblem", views.uploadProblem, name="uploadProblem"),
    path("uploadSolution", views.uploadSolution, name="uploadSolution"),
    path("querySolution", views.querySolution, name="querySolution"),

    path("starProblem", views.starProblem, name="starProblem"),

    # Comment
    path("uploadComment", views.uploadComment, name="uploadComment"),
    path("queryComment", views.queryComment, name="queryComment"),
    path("likeComment", views.likeComment, name="likeComment"),
    path("dislikeComment", views.dislikeComment, name="dislikeComment"),
]
