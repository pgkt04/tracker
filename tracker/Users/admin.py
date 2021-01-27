from django.contrib import admin
from track.models import Record
from Users.models import Account


admin.site.register(Record)
admin.site.register(Account)