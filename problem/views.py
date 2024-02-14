import json
from django.http import HttpRequest
from django.db.models import Q

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp

from account.models import Student, Admin
from problem.models import Problem, Comment


# Create your views here.
def problemQueryID(req: HttpRequest):
     # problem query upon ProblemID
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"
            
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
            assert problem, "Problem not exists"
            
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
            assert student, "Not logged in"
            
            body = json.loads(req.body.decode("utf-8"))
            # title = body.get("title")
            content = body.get("content")
            assert content, "Content is required."

            answer = body.get("answer")
            # userID = body.get("userID")
            topics = body.get("topics")
            source = body.get("source")
            difficulty = body.get("difficulty")

            image = req.FILES.get('image')
            answerImage = req.FILES.get('answerImage')

            # create a new problem
            problem = Problem(
                title = content[:20] if len(content) > 20 else content,
                content = content,
                answer = answer,
                creator = studentID,
                source = source,
                difficulty = difficulty,
                image = image,
                answerImage = answerImage
            )
            if topics:
                problem.topics.add(*topics)
            problem.save()

            return request_success()
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    

def uploadSolution(req: HttpRequest):
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

            content = body.get("content")
            answerImage = req.FILES.get('answerImage')
            
            assert content or answerImage, "Content or image is required."


            if content:
                # if problem.answer:
                #     existing_answers = json.loads(problem.answer)
                # else:
                #     existing_answers = []
                # existing_answers.append(content)
                # problem.answer = json.dumps(existing_answers)
                problem.answer = content

            if answerImage:
                # if problem.answerImage:
                #     existing_answer_images = json.loads(problem.answerImage)
                # else:
                #     existing_answer_images = []
                # existing_answer_images.append(answerImage)
                # problem.answerImage = json.dumps(existing_answer_images)
                problem.answerImage = answerImage

            problem.save()

            return request_success()
        
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def querySolution(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            problem = Problem.objects.filter(id=problemID).first()
            assert problem, "Problem not exists"

            return request_success({
                "problemID": problem.id,
                "creator": problem.creator,
                "content": problem.answer,
                "image": problem.answerImage.url if problem.answerImage else None,
            })
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
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
            comment = Comment(
                problem = problem,
                content = commentText,
                image = commentImage,
                creator = student,
                commentTo = commentTo
            )
            comment.save()
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
