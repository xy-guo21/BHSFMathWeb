import json
from django.http import HttpRequest

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp

from account.models import Student, Admin
from problem.models import Problem


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
        try:
            body = json.loads(req.body.decode("utf-8"))
            studentID = body.get("studentID")
            password = body.get("password")

            # check if the studentID and password are correct
            student = Student.objects.filter(studentID=studentID).first()
            assert student, "Invalid studentID"
            assert student.password == password, "Invalid password"
            
            return request_success(
                need_cookie=True,
                id=student.studentID,
                password=student.password,
            )
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD

def register(req: HttpRequest):
    # register, 
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            studentID = body.get("studentID")
            userName = body.get("userName")
            password = body.get("password")
            schoolName = body.get("schoolName")
            enrollmentYear = body.get("enrollmentYear")
            studyPeriod = body.get("studyPeriod")

            student = Student.objects.filter(studentID=studentID).first()
            assert not student, "StudentID already exists"
            
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
        except Exception as e:
            return request_failed(str(e))

    else:
        return BAD_METHOD
    
def adminLogin(req: HttpRequest):
    # admin login
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            adminID = body.get("adminID")
            password = body.get("password")

            # check if the adminID and password are correct
            admin = Admin.objects.filter(adminID=adminID).first()
            assert admin, "Invalid adminID"
            assert admin.password == password, "Invalid password"
            
            return request_success(
                need_cookie=True,
                id=admin.adminID,
                password=admin.password,
            )
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD