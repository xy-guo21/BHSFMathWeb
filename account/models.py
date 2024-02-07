from django.db import models

# Create your models here.
class Student(models.Model):
    # id = models.BigAutoField
    userName = models.CharField(max_length=25, unique=True)
    passWord = models.CharField(max_length=25)

    # avatar = models.ImageField(upload_to="avatars/", default="default/default.webp")
    loginTime = models.FloatField(default=None, null=True)

    def serialize(self):
        return {
            "userName": self.userName,
            # "avatar": self.avatar,
        }