from django.db import models


class Record(models.Model):

    # epoch created
    created = models.IntegerField(default=0)

    # epoch ended
    ended = models.IntegerField(default=0)

    # user id this record belongs to
    uid = models.IntegerField(default=1)

    # determines if this in use
    is_active = models.BooleanField(default=True)

    # name of what you are tracking, it should never be blank
    topic = models.CharField(max_length=100, default="blank" )
