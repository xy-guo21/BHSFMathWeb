import json
from django.http import HttpRequest

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp

from account.models import Student, Admin
from problem.models import Problem

# # create a Admin
# if not Admin.objects.filter(id=1):
#     Admin.objects.create(
#         adminID = 1,
#         password = "123456",
#     )

# # create a student
# if not Student.objects.filter(id=1):
#     Student.objects.create(
#         studentID = 202400001,
#         userName = "Alice",
#         password = "123456",
#         schoolName = "北京四中",
#         enrollmentYear = 2024,
#         studyPeriod = "高中"
#     )


# Create your views here.
def home(req: HttpRequest):
    studentID = req.COOKIES.get("id")
    student = Student.objects.filter(studentID=studentID).first()
    if not student:
        return request_failed("Not logged in")
    return request_success(student.serialize())


def login(req: HttpRequest):
    # user login
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        studentID = body.get("studentID")
        password = body.get("password")

        # check if the studentID and password are correct
        student = Student.objects.filter(studentID=studentID).first()
        if not student:
            return request_failed("Invalid studentID")
        if student.password != password:
            return request_failed("Invalid password")
        
        return request_success(
            need_cookie=True,
            id=student.studentID,
            password=student.password,
        )
    
    else:
        return BAD_METHOD

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
            return request_failed("StudentID already exists")
        
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

        return request_success(
            need_cookie=True,
            id=student.studentID,
            password=student.password,
        )

    else:
        return BAD_METHOD
    
def adminLogin(req: HttpRequest):
    # admin login
    if req.method == "POST":
        body = json.loads(req.body.decode("utf-8"))
        adminID = body.get("adminID")
        password = body.get("password")

        # check if the adminID and password are correct
        admin = Admin.objects.filter(adminID=adminID).first()
        if not admin:
            return request_failed("Invalid adminID")
        if admin.password != password:
            return request_failed("Invalid password")
        
        return request_success(
            need_cookie=True,
            id=admin.adminID,
            password=admin.password,
        )
    
    else:
        return BAD_METHOD