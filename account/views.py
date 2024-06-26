import json
from django.http import HttpRequest
from django.contrib import auth
from django.contrib.auth.decorators import login_required

from utils.utils_request import BAD_METHOD, request_failed, request_success, return_field
from utils.utils_require import CheckRequire, require
from utils.utils_time import get_timestamp

# from account.models import Student, Admin
from account.models import User, UserTokenStore
from problem.models import Problem


# Create your views here.
def home(req: HttpRequest):
    # home page for test
    user = req.user
    if user.is_authenticated:
        return request_success(user.serialize())
    else:
        return request_success()
    
def test_register(req: HttpRequest):
    student = User().create_student(
        studentID=2018010001,
        password="123456",
        schoolName="SJTU",
        enrollmentYear=2018,
        studyPeriod="4",
    )
    return request_success(student.serialize())

def test_login(req: HttpRequest):
    user = User.objects.filter(username='stu2018010001', password
    ="123456").first()
    if user:
        auth.login(req, user)
        return request_success(user.serialize())
    else:
        return request_failed("Login failed")

def logout(req: HttpRequest):
    # user logout
    try:
        auth.logout(req)
        return request_success()
    except Exception as e:
        return request_failed(str(e))

def login(req: HttpRequest):
    # user login
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            studentID = body.get("studentID")
            password = body.get("password")

            # check if the studentID and password are correct
            user = User.objects.filter(username='stu'+str(studentID), password=password).first()
            assert user, "学生ID或密码不正确"
            userTokenStore = UserTokenStore().create_userTokenStore(user.username)
            auth.login(req, user)
            
            return request_success(userTokenStore.serialize())
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

            student = User.objects.filter(studentID=studentID).first()
            assert not student, "StudentID already exists"
            
            # create a new student
            student = User().create_student(
                studentID=studentID,
                password=password,
                schoolName=schoolName,
                enrollmentYear=enrollmentYear,
                studyPeriod=studyPeriod,
            )

            return request_success()
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
            user = User.objects.filter(username='admin'+str(adminID), password=password).first()
            assert user, "管理员ID或密码不正确"
            userTokenStore = UserTokenStore().create_userTokenStore(user.username)
            auth.login(req, user)
            
            return request_success(userTokenStore.serialize())
        except Exception as e:
            return request_failed(str(e))
    
    else:
        return BAD_METHOD
    
def queryUserInfo(req: HttpRequest):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            userToken = body.get("userToken")
            print("userToken =", userToken)
            userTokenStore = UserTokenStore.objects.filter(userToken=userToken).first()
            assert userTokenStore, "没有找到登录信息，请重新登录"
            user = User.objects.filter(username=userTokenStore.username).first()
            assert user, "登录信息有误，请重新登录"
            return request_success(user.serialize())
        except Exception as e:
            return request_failed(str(e))
    else:
        return BAD_METHOD