import json
from django.http import HttpRequest
from django.db.models import Q

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp


from problem.models import Problem

# # create an example
# if not Problem.objects.filter(id=1):
#     problem_0 = Problem.objects.create(
#         title = "解方程：2x + 5 = 11，求 x 的值",
#         content = "解方程：2x + 5 = 11，求 x 的值",
#         answer = "x = 3",
#         difficulty = 2,
#         source = "数学竞赛 2020",
#         creator = 1
#     )
#     problem_0.topics.add("代数")

# Create your views here.
def problemQueryID(req: HttpRequest):
     # problem query upon ProblemID
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        problemID = body.get("problemID")

        # fetch the poblem
        problem = Problem.objects.filter(id=problemID).first()
        if not problem:
            return request_failed("Problem not exists")
        
        return request_success(problem.serialize())
    
    else:
        return BAD_METHOD
    

def problemQueryFilter(req: HttpRequest):
     # problem query upon Filter
    if req.method == "POST":
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
    
    else:
        return BAD_METHOD
    
def problemQueryDetail(req: HttpRequest):
    # show problem detail
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        problemID = body.get("problemID")

        # fetch the poblem
        problem = Problem.objects.filter(id=problemID).first()
        if not problem:
            return request_failed("Problem not exists")
        
        return request_success(problem.serialize())
    
    else:
        return BAD_METHOD
    
def uploadProblem(req: HttpRequest):
    # upload a problem
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        title = body.get("title")
        content = body.get("content")
        answer = body.get("answer")
        userID = body.get("userID")
        topics = body.get("topics")
        source = body.get("source")
        difficulty = body.get("difficulty")

        image = req.FILES.get('image')
        answerImage = req.FILES.get('answerImage')

        # create a new problem
        problem = Problem(
            title = title,
            content = content,
            answer = answer,
            creator = userID,
            source = source,
            difficulty = difficulty,
            image = image,
            answerImage = answerImage
        )
        problem.save()
        problem.topics.add(*topics)

        return request_success()
    
    else:
        return BAD_METHOD
    

def uploadSolution(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            problemID = body.get("problemID")
            content = body.get("content")
            answerImage = req.FILES.get('answerImage')
            
            assert content or answerImage, "Content or image is required."

            problem = Problem.objects.filter(id=problemID).first()
            if not problem:
                return request_failed("Problem not exists")

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
