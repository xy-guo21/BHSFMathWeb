from django.db import models
from taggit.managers import TaggableManager

# Create your models here.
class Problem(models.Model):
    stem = models.TextField()
    solution = models.TextField(blank=True, null=True)

    topics = TaggableManager(blank=True)
    source = models.TextField(blank=True, null=True)

    difficulty = models.IntegerField(blank=True, null=True)

    def serialize(self):
        return {
            "stem" : self.stem,
            "solution": self.solution,
            "source": self.source,
            "difficulty": self.difficulty,
        }
