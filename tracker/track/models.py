from django.db import models

class Record(models.Model):
    created = models.IntegerField(default=0)
    ended = models.IntegerField(default=0)
    uid = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
    topic = models.CharField(max_length=100)
