from django.contrib.auth.models import User, UserManager
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone


class AnonymousUser(User):
    session = models.CharField(max_length=100)
    objects = UserManager()

    def is_authenticated(self):
        return False

    def __str__(self):
        return "{}".format(self.username)


class Images(models.Model):
    image_url = models.URLField(blank=True, null=True)
    thumbnail_small = models.URLField(blank=True, null=True)
    thumbnail_medium = models.URLField(blank=True, null=True)
    thumbnail_large = models.URLField(blank=True, null=True)
    thumbnail_x_large = models.URLField(blank=True, null=True)
    misc_pictures = models.TextField(blank=True, null=True)


class Price(models.Model):
    retail_cost = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    member_cost = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    subscription_monthly = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)


class Hardware(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    version = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    home_url = models.URLField(blank=True, null=True)
    price = models.ForeignKey(Price, blank=True, null=True)
    images = models.ForeignKey(Images, null=True, blank=True)
    modified = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return "{0} version {1}".format(self.name, self.version)


class Channel(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    guidebox_data = JSONField(blank=True, null=True)
    is_on_sling = models.BooleanField(default=False)
    modified = models.DateTimeField(auto_now=True, blank=True)

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        return super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return "{}".format( self.name)


class Content(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    guidebox_data = JSONField(blank=True, null=True)
    on_netflix = models.BooleanField(default=False)
    channel = models.ManyToManyField(Channel, blank=True)
    modified = models.DateTimeField(auto_now=True, blank=True)

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        return super(Content, self).save(*args, **kwargs)

    def __str__(self):
        return "Show {0}".format(self.title)


class Package(models.Model):
    owner = models.OneToOneField(User, primary_key=True, related_name='packages')
    data = JSONField(blank=True, null=True, default={'content': '', 'services': '', 'hardware': ''})
    modified = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return "Package Configuration {0} for {1}".format(self.pk, self.owner.username)


class Feedback(models.Model):
    user = models.ForeignKey(User, blank=True, null=True)
    data = JSONField(blank=True, null=True)
    modified = models.DateTimeField(auto_now=True, blank=True)


class BatchJobs(models.Model):
    updated = models.DateTimeField(auto_now=True, blank=True)
    added = models.TextField(blank=True, null=True)
