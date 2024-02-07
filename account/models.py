from django.db import models

# Create your models here.
class Student(models.Model):
    studentID = models.IntegerField(unique=True)
    userName = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    schoolName = models.CharField(max_length=50)
    enrollmentYear = models.IntegerField()
    studyPeriod = models.CharField(max_length=50)

    def serialize(self):
        return {
            "studentID" : self.studentID,
            "userName": self.userName,
            "password": self.password,
            "schoolName": self.schoolName,
            "enrollmentYear": self.enrollmentYear,
            "studyPeriod": self.studyPeriod,
        }