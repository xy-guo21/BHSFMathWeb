import json
from django.http import HttpRequest
from django.http import JsonResponse

from account.models import Student

# create an example
if not Student.objects.filter(id=1):
    Student.objects.create(
        studentID = 202400001,
        userName = "Alice",
        password = "123456",
        schoolName = "北京四中",
        enrollmentYear = 2024,
        studyPeriod = "高中"
    )


# Create your views here.
def home(req: HttpRequest):
    Alice = Student.objects.filter(id=1).first()
    return JsonResponse(Alice.serialize(), status=200)

def login(req: HttpRequest):
    # user login
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        studentID = body.get("studentID")
        password = body.get("password")

        # check if the studentID and password are correct
        student = Student.objects.filter(studentID=studentID).first()
        if not student:
            return JsonResponse({"error": "Invalid studentID"}, status=400)
        if student.password != password:
            return JsonResponse({"error": "Invalid password"}, status=400)
        
        return JsonResponse(student.serialize(), status=200)
    
    else:
        return JsonResponse({"error": "Invalid method"}, status=400)

def register(req: HttpRequest):
    # register, 
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        userName = body.get("userName")
        studentID = body.get("studentID")
        password = body.get("password")
        schoolName = body.get("schoolName")
        enrollmentYear = body.get("enrollmentYear")
        studyPeriod = body.get("studyPeriod")

        # check studentID
        student = Student.objects.filter(studentID=studentID).first()
        if student:
            return JsonResponse({"error": "studentID already exists"}, status=400)
        
        # create a new student
        student = Student(
            studentID=studentID,
            userName=userName,
            password=password,
            schoolName=schoolName,
            enrollmentYear=enrollmentYear,
            studyPeriod=studyPeriod
        )
        student.save()

        return JsonResponse(student.serialize(), status=200)

    else:
        return JsonResponse({"error": "Invalid method"}, status=400)