from django.db import models
from taggit.managers import TaggableManager
from account.models import Student

# Create your models here.
class Problem(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)

    creator = models.IntegerField(blank=True, null=True)
    createTime = models.DateTimeField(auto_now_add=True)

    topics = TaggableManager(blank=True)
    source = models.TextField(blank=True, null=True)

    difficulty = models.IntegerField(blank=True, null=True)
    stars = models.ManyToManyField(to='Student', related_name="starredProblem", blank=True)

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
    
    def star(self, student: Student):
        if student in self.stars.all():
            self.stars.remove(student)
        else:
            self.stars.add(student)


class Comment(models.Model):
    problem = models.ForeignKey(to=Problem, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to="commentImages", blank=True, null=True)
    creator = models.ForeignKey(to='Student', on_delete=models.CASCADE)
    createTime = models.DateTimeField(auto_now_add=True)
    commentTo = models.ForeignKey(to='self', on_delete=models.CASCADE, blank=True, null=True)

    likes = models.ManyToManyField(to='Student', related_name="likedComment", blank=True)
    dislikes = models.ManyToManyField(to='Student', related_name="dislikedComment", blank=True)

    def serialize(self):
        return {
            "commentID": self.id,
            "problemID": self.problem.id,
            "studentID": self.creator.studentID,
            "commentText": self.content,
            "commentImage": self.image.url if self.image else None,
            "createTime": self.createTime,
            "commentToID": self.commentTo.id if self.commentTo else None,
            "likes": self.likes.count(),
            "dislikes": self.dislikes.count(),
        }
    
    def like(self, student: Student):
        self.likes.add(student)
        self.dislikes.remove(student)

    def dislike(self, student: Student):
        self.dislikes.add(student)
        self.likes.remove(student)