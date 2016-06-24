from django.db import models

# Create your models here.
from server.apis.netflixable import Netflixable


class NetflixableUrls(models.Model):
    name = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    date_run = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)








