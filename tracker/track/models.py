from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=100, blank=True, default='')
    created = models.IntegerField(default=0)
    active = models.BooleanField(default=True)

class Record(models.Model):
    created = models.IntegerField(default=0)
    ended = models.IntegerField(default=0)
    uid = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
