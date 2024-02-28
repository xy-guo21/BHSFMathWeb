import json
from django.http import HttpRequest
from django.db.models import Q

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp

from account.models import Student, Admin
from problem.models import Problem, Solution, Comment, Scoring, ProblemBox, Paper


# Create your views here.
def problemQueryID(req: HttpRequest):
     # problem query upon ProblemID
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists."
            
            return request_success(problem.serialize())
        except Exception as e:
            return request_failed(str(e))
        
    else:
        return BAD_METHOD
    

def problemQueryFilter(req: HttpRequest):
     # problem query upon Filter
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            topic = body.get("topic")
            difficulty = body.get("difficulty")
            source = body.get("source")
            
            problems = Problem.objects.all()

            if topic: 
                problems = problems.filter(topics__name__in=[topic])

            if difficulty:
                problems = problems.filter(difficulty=int(difficulty))

            if source:
                problems = problems.filter(source=source)

            return request_success({
                "problems": [problem.serialize() for problem in problems]
            })
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def problemQueryDetail(req: HttpRequest):
    # show problem detail
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")

            # fetch the poblem
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists."
            
            return request_success(problem.serialize())
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def uploadProblem(req: HttpRequest):
    # upload a problem
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in."
            
            body = json.loads(req.body.decode("utf-8"))
            
            # title = body.get("title")
            content = body.get("content")
            image = req.FILES.get('image')
            assert content, "Content is required."

            # userID = body.get("userID")
            topics = body.get("topics")
            source = body.get("source")
            difficulty = body.get("difficulty")

            # create a new problem
            problem = Problem(
                title = content[:20] if len(content) > 20 else content,
                content = content,
                creator = studentID,
                source = source,
                difficulty = difficulty,
                image = image,
            )
            problem.save()

            if topics:
                problem.topics.add(*topics)
            problem.save()

            # create a new solution if answer or answerImage is provided
            answer = body.get("answer")
            answerImage = req.FILES.get('answerImage')
            
            if answer or answerImage:
                Solution.objects.create(
                    problem = problem,
                    content = answer,
                    image = answerImage,
                    creator = student
                )

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    

def querySolutions(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            assert problemID, "Problem ID is required."
            
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists."
            
            solutions = problem.solutions.all()
            
            return request_success({
                "problemID": problemID,
                "solutionIDs": [solution.id for solution in solutions]
            })
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD


def querySolutionDetail(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            solutionID = body.get("solutionID")
            assert solutionID, "solutionID ID is required."
            
            solution = Solution.objects.filter(id=solutionID).first()
            assert solution, "Solution not exists."

            return request_success(solution.serialize())
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    

def uploadSolution(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in."

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            assert problemID, "Problem ID is required."
            
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists."
            
            assert student == problem.creator, "Not the creator of the problem."

            content = body.get("content")
            answerImage = req.FILES.get('answerImage')
            assert content or answerImage, "Content or image is required."

            Solution.objects.create(
                problem=problem,
                content=content,
                image=answerImage,
                creator=student
            )

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD


# def querySolution(req: HttpRequest):
#     if req.method == "POST":
#         try:
#             body = json.loads(req.body.decode("utf-8"))
#             problemID = body.get("problemID")
#             problem = Problem.objects.filter(id=problemID).first()
#             assert problem, "Problem not exists"

#             return request_success({
#                 "problemID": problem.id,
#                 "creator": problem.creator,
#                 "content": problem.answer,
#                 "image": problem.answerImage.url if problem.answerImage else None,
#             })
#         except Exception as e:
#             return request_failed(str(e))
    
#     else:
#         return BAD_METHOD


def starProblem(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            problem.star(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def scoreProblem(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            score = body.get("score")
            assert score, "Score is required"
            assert 0 <= score <= 10, "Score should be between 0 and 10"

            scoring = Scoring.objects.filter(student=student, problem=problem).first()
            if scoring:
                scoring.refresh(score=score)
            else:
                Scoring.objects.create(student=student, problem=problem, score=score)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def deleteProblem(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"
            assert student == problem.creator, "Not the creator of the problem"

            problem.delete()

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
'''
====================== Comment ======================
'''

def uploadComment(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            commentText = body.get("commentText")
            commentImage = body.get("commentImage")
            commentToID = body.get("commentToID")
            assert commentText or commentImage, "Content or image is required."
            
            if commentToID:
                commentTo = Comment.objects.filter(id=commentToID).first()
                assert commentTo, "Comment to not exists"
                
            # create a new comment
            Comment.objects.create(
                problem = problem,
                content = commentText,
                image = commentImage,
                creator = student,
                commentTo = commentTo
            )

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
        
    else:
        return BAD_METHOD
    
def queryComment(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"
            
            comments = Comment.objects.filter(problem=problem)
            return request_success({
                "comments": [comment.serialize() for comment in comments]
            })
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def likeComment(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            commentID = body.get("commentID")
            comment = Comment.objects.filter(id=commentID).first()
            assert comment, "Comment not exists"

            comment.like(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def dislikeComment(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            commentID = body.get("commentID")
            comment = Comment.objects.filter(id=commentID).first()
            assert comment, "Comment not exists"

            comment.dislike(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def deleteComment(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Admin.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            commentID = body.get("commentID")
            comment = Comment.objects.filter(id=commentID).first()
            assert comment, "Comment not exists"
            assert student == comment.creator, "Not the creator of the comment"

            comment.delete()

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
'''
====================== Problem Box ======================
'''

def queryProblemBox(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            problemBox = ProblemBox.objects.filter(student=student).first()
            if not problemBox:
                problemBox = ProblemBox(student=student)
                problemBox.save()

            return request_success(problemBox.serialize())
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def addToProblemBox(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            problemBox = ProblemBox.objects.filter(student=student).first()
            if not problemBox:
                problemBox = ProblemBox(student=student)
                problemBox.save()

            problemBox.add(problem)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def removeFromProblemBox(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            problemBox = ProblemBox.objects.filter(student=student).first()
            assert problemBox, "Problem box not exists"

            problemBox.remove(problem)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
'''
====================== Paper ======================
'''
    
def constructPaper(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            title = body.get("title")
            content = body.get("content")
            assert title, "Title is required"
            assert content, "Content is required"

            problemBox = ProblemBox.objects.filter(student=student).first()
            assert problemBox, "Problem box not exists"

            paper = problemBox.constructPaper(title=title, content=content)

            return request_success({
                "paperID": paper.id
            })
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def queryPaperList(req: HttpRequest):
    if req.method == "POST":
        try:
            papers = Paper.objects.all()
            return request_success({
                "paperIDs": [paper.id for paper in papers]
            })
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def queryUserPaperList(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            papers = Paper.objects.filter(creator=student)
            return request_success({
                "paperIDs": [paper.id for paper in papers]
            })
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def queryPaperDetail(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            paperID = body.get("paperID")
            paper = Paper.objects.filter(id=paperID).first()
            assert paper, "Paper not exists"

            return request_success(paper.serialize())
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def likePaper(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            paperID = body.get("paperID")
            paper = Paper.objects.filter(id=paperID).first()
            assert paper, "Paper not exists"

            paper.like(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def dislikePaper(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            paperID = body.get("paperID")
            paper = Paper.objects.filter(id=paperID).first()
            assert paper, "Paper not exists"

            paper.dislike(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def starPaper(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            paperID = body.get("paperID")
            paper = Paper.objects.filter(id=paperID).first()
            assert paper, "Paper not exists"

            paper.star(student)

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def deletePaper(req: HttpRequest):
    if req.method == "POST":
        try:
            studentID = req.COOKIES.get("id")
            student = Admin.objects.filter(studentID=studentID).first()
            assert student, "Not logged in"

            body = json.loads(req.body.decode("utf-8"))
            paperID = body.get("paperID")
            paper = Paper.objects.filter(id=paperID).first()
            assert paper, "Paper not exists"
            assert student == paper.creator, "Not the creator of the paper"

            paper.delete()

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD