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
    path("scoreProblem", views.scoreProblem, name="scoreProblem"),
    path("deleteProblem", views.deleteProblem, name="deleteProblem"),

    # Comment
    path("uploadComment", views.uploadComment, name="uploadComment"),
    path("queryComment", views.queryComment, name="queryComment"),
    path("likeComment", views.likeComment, name="likeComment"),
    path("dislikeComment", views.dislikeComment, name="dislikeComment"),
    path("deleteComment", views.deleteComment, name="deleteComment"),

    # Problem Box
    path("queryProblemBox", views.queryProblemBox, name="queryProblemBox"),
    path("addToProblemBox", views.addToProblemBox, name="addToProblemBox"),
    path("removeFromProblemBox", views.removeFromProblemBox, name="removeFromProblemBox"),

    # Paper
    path("constructPaper", views.constructPaper, name="constructPaper"),
    path("queryPaperList", views.queryPaperList, name="queryPaperList"),
    path("queryUserPaperList", views.queryUserPaperList, name="queryUserPaperList"),
    path("queryPaperDetail", views.queryPaperDetail, name="queryPaperDetail"),
    path("likePaper", views.likePaper, name="likePaper"),
    path("dislikePaper", views.dislikePaper, name="dislikePaper"),
    path("starPaper", views.starPaper, name="starPaper"),
    path("deletePaper", views.deletePaper, name="deletePaper"),

]
