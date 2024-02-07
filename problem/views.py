import json
from django.http import HttpRequest
from django.http import JsonResponse
from django.db.models import Q

from problem.models import Problem

# create an example
if not Problem.objects.filter(id=1):
    problem_0 = Problem.objects.create(
        stem = "解方程：2x + 5 = 11，求 x 的值",
        solution = "x = 3",
        difficulty = 2,
        source = "数学竞赛 2020"
    )
    problem_0.topics.add("代数")

# Create your views here.
def problemQueryID(req: HttpRequest):
     # problem query upon ProblemID
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        problemID = body.get("problemID")

        # fetch the poblem
        problem = Problem.objects.filter(id=problemID).first()
        if not problem:
            return JsonResponse({"error": "Problem not exists"}, status=400)
        
        return JsonResponse(problem.serialize(), status=200)
    
    else:
        return JsonResponse({"error": "Invalid method"}, status=400)
    

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

        return JsonResponse({"problems": [problem.serialize()] for problem in problems }, status=200)
    
    else:
        return JsonResponse({"error": "Invalid method"}, status=400)