from django.db import models
from taggit.managers import TaggableManager

# Create your models here.
class Problem(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)

    creator = models.IntegerField(blank=True, null=True)
    createTime = models.DateTimeField(auto_now_add=True)

    topics = TaggableManager(blank=True)
    source = models.TextField(blank=True, null=True)

    difficulty = models.IntegerField(blank=True, null=True)

    image = models.ImageField(upload_to="problemImages", blank=True, null=True)
    answerImage = models.ImageField(upload_to="problemImages", blank=True, null=True)

    def serialize(self):
        ret = {
            "problemID": self.id,
            "title": self.title,
            "problemTitle": self.title, # "problemTitle" is a typo, but it's used in the frontend
            "content": self.content,
            "answer": self.answer,
            "userID": self.creator,
            "createTime": self.createTime,
            "topics": [topic.name for topic in self.topics.all()],
            "source": self.source,
            "difficulty": self.difficulty,
            "imagePath": [],
        }
        if self.image:
            ret["imagePath"] = [self.image.url]
        if self.answerImage:
            ret["imagePath"].append(self.answerImage.url)

        return ret
