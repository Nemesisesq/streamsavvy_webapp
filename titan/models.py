from django.db import models


# Create your models here.
class Channel(models.Model):
    callsign = models.CharField(max_length=100)
    network = models.CharField(max_length=100)
