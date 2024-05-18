from django.db import models
from django.contrib.auth.models import AbstractUser

import time
import hashlib
import os
# Create your models here.
# class Student(models.Model):
#     studentID = models.IntegerField(unique=True)
#     userName = models.CharField(max_length=50)
#     password = models.CharField(max_length=50)

#     schoolName = models.CharField(max_length=50)
#     enrollmentYear = models.IntegerField()
#     studyPeriod = models.CharField(max_length=50)

#     def serialize(self):
#         return {
#             "studentID" : self.studentID,
#             "userName": self.userName,
#             "password": self.password,
#             "schoolName": self.schoolName,
#             "enrollmentYear": self.enrollmentYear,
#             "studyPeriod": self.studyPeriod,
#         }

# class Admin(models.Model):
#     adminID = models.IntegerField(unique=True)
#     password = models.CharField(max_length=50)

#     def serialize(self):
#         return {
#             "adminID" : self.adminID,
#             "password": self.password,
#         }
    
class User(AbstractUser):
    # username
    # password
    # email
    # first_name
    # last_name
    # is_staff
    # is_active
    # date_joined
    # last_login
    userTypeEnum= (
        (0, '学生'),
        (1, '题库管理员'),
        (2, '系统管理员'),
        (3, '超级管理员'),
    )
    userType = models.IntegerField(choices=userTypeEnum, default=0)
    studentID = models.IntegerField(null=True)
    adminID = models.IntegerField(null=True)

    schoolName = models.CharField(max_length=50)
    enrollmentYear = models.IntegerField()
    studyPeriod = models.CharField(max_length=50)
    def serialize(self):
        return {
            "id" : self.id,
            "userName": self.username,
            "password": self.password,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_staff": self.is_staff,
            "is_active": self.is_active,
            "date_joined": self.date_joined,
            "last_login": self.last_login,
            "userType": self.userType,
            "studentID": self.studentID,
            "adminID": self.adminID,
        }
    
    def create_student(self, studentID, password, schoolName, enrollmentYear, studyPeriod):
        student = User(
            userType=0,
            studentID=studentID,
            username='stu'+str(studentID),
            password=password,
            schoolName=schoolName,
            enrollmentYear=enrollmentYear,
            studyPeriod=studyPeriod
        )
        student.save()
        return student

class UserTokenStore(models.Model):
    username = models.CharField(max_length=10)
    userToken = models.CharField(max_length=100)
    createTime = models.CharField(max_length=100)
    
    def create_userTokenStore(self, username):
        createTime = time.strftime('%Y%m%d_%H%M%S')
        h = hashlib.sha256()
        raw_name = (username + createTime).encode() + os.urandom(16)
        h.update(raw_name)
        userToken = h.hexdigest()[-100:]
        userTokenStore = UserTokenStore(
            username=username, 
            userToken=userToken, 
            createTime=createTime
        )
        userTokenStore.save()
        return userTokenStore
    
    def serialize(self):
        return {
            "userToken": self.userToken
        }