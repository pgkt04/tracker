from django.db import models

class Record(models.Model):
    # epoch for the time started
    created = models.IntegerField() 

    # epoch for the time ended
    ended = models.IntegerField()

    # uid for the user
    uid = models.IntegerField() 

    # determines if the current record is active or not, there should only be one.
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['created']