from django.db import models
from taggit.managers import TaggableManager
from account.models import Student

# Create your models here.
class Problem(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    # answer = models.TextField(blank=True, null=True)

    creator = models.ForeignKey(to='account.Student', on_delete=models.CASCADE, related_name="createdProblem", blank=True, null=True)
    createTime = models.DateTimeField(auto_now_add=True)

    topics = TaggableManager(blank=True)
    source = models.TextField(blank=True, null=True)

    difficulty = models.IntegerField(blank=True, null=True)
    stars = models.ManyToManyField(to='account.Student', related_name="starredProblem", blank=True)

    image = models.ImageField(upload_to="problemImages", blank=True, null=True)
    # answerImage = models.ImageField(upload_to="problemImages", blank=True, null=True)

    def serialize(self):
        ret = {
            "problemID": self.id,
            "title": self.title,
            "problemTitle": self.title, # "problemTitle" is a typo, but it's used in the frontend
            "userID": self.creator.studentID,
            "createTime": self.createTime,
            "content": self.content,
            "imagePath": self.image.url if self.image else None,
            "topics": [topic.name for topic in self.topics.all()],
            "source": self.source,
            "difficulty": self.difficulty,
            "answers": [solution.id for solution in self.solutions.all()],
        }
        # if self.image:
        #     ret["imagePath"] = [self.image.url]
        # if self.answerImage:
        #     ret["imagePath"].append(self.answerImage.url)

        return ret
    
    def star(self, student: Student):
        if student in self.stars.all():
            self.stars.remove(student)
        else:
            self.stars.add(student)


class Solution(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='solutions')
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="solutionImages", blank=True, null=True)
    creator = models.ForeignKey(to='account.Student', on_delete=models.CASCADE, related_name="createdSolution", blank=True, null=True)
    createTime = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "solutionID": self.id,
            "problemID": self.problem.id,
            "creator": self.creator.studentID,
            "createTime": self.createTime,
            "content": self.content,
            "imagePath": self.image.url if self.image else None,
        }


class Comment(models.Model):
    problem = models.ForeignKey(to=Problem, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to="commentImages", blank=True, null=True)
    creator = models.ForeignKey(to='account.Student', on_delete=models.CASCADE)
    createTime = models.DateTimeField(auto_now_add=True)
    commentTo = models.ForeignKey(to='self', on_delete=models.CASCADE, blank=True, null=True)

    likes = models.ManyToManyField(to='account.Student', related_name="likedComment", blank=True)
    dislikes = models.ManyToManyField(to='account.Student', related_name="dislikedComment", blank=True)

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

class Scoring(models.Model):
    student = models.ForeignKey(to='account.Student', on_delete=models.CASCADE)
    problem = models.ForeignKey(to=Problem, on_delete=models.CASCADE)
    score = models.IntegerField()

    def refresh(self, score: int):
        self.score = score
        self.save()

class ProblemBox(models.Model):
    student = models.ForeignKey(to='account.Student', on_delete=models.CASCADE)
    problems = models.ManyToManyField(to=Problem, related_name="problemBox", blank=True)

    def serialize(self):
        return {
            "studentID": self.student.studentID,
            "problemIDs": [problem.id for problem in self.problems.all()],
        }
    
    def add(self, problem: Problem):
        if problem not in self.problems.all():
            self.problems.add(problem)
    
    def remove(self, problem: Problem):
        if problem in self.problems.all():
            self.problems.remove(problem)
    
    def constructPaper(self, title: str, content: str):
        paper = Paper(title=title, content=content, creator=self.student)
        paper.save()
        for problem in self.problems.all():
            paper.add(problem)
        return paper

class Paper(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    creator = models.ForeignKey(to='account.Student', on_delete=models.CASCADE)
    createTime = models.DateTimeField(auto_now_add=True)

    problems = models.ManyToManyField(to=Problem, related_name="papers", blank=True)

    likes = models.ManyToManyField(to='account.Student', related_name="likedPaper", blank=True)
    dislikes = models.ManyToManyField(to='account.Student', related_name="dislikedPaper", blank=True)
    stars = models.ManyToManyField(to='account.Student', related_name="starredPaper", blank=True)

    def serialize(self):
        return {
            "paperID": self.id,
            "paperName": self.title,
            "description": self.content,
            "creatorID": self.creator.studentID,
            "createTime": self.createTime,
            "problemIDs": [problem.id for problem in self.problems.all()],
        }
    
    def like(self, student: Student):
        self.likes.add(student)
        self.dislikes.remove(student)
    
    def dislike(self, student: Student):
        self.dislikes.add(student)
        self.likes.remove(student)

    def star(self, student: Student):
        if student in self.stars.all():
            self.stars.remove(student)
        else:
            self.stars.add(student)