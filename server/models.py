from django.contrib.auth.models import User, UserManager
from django.db import models
from django.db.models import ManyToManyField
from django.utils import timezone


class AnonymousUser(User):
    session = models.CharField(max_length= 100)
    objects = UserManager()

    def is_authenticated(self):
        return False


class Hardware(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    version = models.CharField(max_length=50, blank=True, null=True)
    home_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    retail_cost = models.FloatField(blank=True, null=True)
    mem_cost = models.FloatField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return "{0} version {1}".format(self.name, self.version)


class ContentProvider(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    source = models.CharField(max_length=50, blank=True, null=True)
    channel_type = models.CharField(max_length=100, blank=True, null=True)
    payment_type = models.CharField(max_length=100, blank=True, null=True)
    guidebox_id = models.IntegerField(blank=True, null=True)
    home_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    android_app = models.URLField(blank=True, null=True)
    apple_app = models.URLField(blank=True, null=True)
    retail_cost = models.FloatField(blank=True, null=True)
    mem_cost = models.FloatField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    thumbnail_small = models.URLField(blank=True, null=True)
    thumbnail_medium = models.URLField(blank=True, null=True)
    thumbnail_large = models.URLField(blank=True, null=True)
    thumbnail_x_large = models.URLField(blank=True, null=True)
    hardware = models.ManyToManyField(Hardware)
    modified = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        return super(ContentProvider, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def to_dict(instance):
        opts = instance._meta
        data = {}
        for f in opts.concrete_fields + opts.many_to_many:
            if isinstance(f, ManyToManyField):
                if instance.pk is None:
                    data[f.name] = []
                else:
                    data[f.name] = list(f.value_from_object(instance).values_list('pk', flat=True))
            else:
                data[f.name] = f.value_from_object(instance)
        return data

# class Channel(models.Model):



class Content(models.Model):
    title = models.CharField(max_length=250, blank=False, null=False)
    first_aired = models.DateField(blank=True, null=True)
    guidebox_id = models.IntegerField(blank=True,null=True, unique=True)
    description = models.TextField(blank=True, null=True)
    home_url = models.URLField(blank=True, null=True)
    thumbnail_small = models.URLField(blank=True, null=True)
    thumbnail_medium = models.URLField(blank=True, null=True)
    thumbnail_large = models.URLField(blank=True, null=True)
    thumbnail_x_large = models.URLField(blank=True, null=True)
    content_provider = models.ManyToManyField(ContentProvider)
    modified = models.DateTimeField(null=True, blank=True)
    tvrage_id = models.IntegerField(blank=True, null=True)
    themoviedb_id = models.IntegerField(blank=True, null=True)
    tvdb_id = models.IntegerField(blank=True, null=True)
    freebase_id = models.CharField(max_length= 50, blank=True, null=True)
    imdb_id = models.CharField(max_length= 50, blank=True, null=True)
    wikepedia_id = models.IntegerField(blank=True, null=True)




    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        return super(Content, self).save(*args, **kwargs)

    def __str__(self):
        return "Show {0}".format(self.title)

class BundleCost(models.Model):
    provider = models.ForeignKey(ContentProvider, null=True, blank=True, related_name='provider')
    partner_provider = models.ForeignKey(ContentProvider, null=True, blank=True, related_name='partner')
    cost = models.FloatField(blank=True, null=True)

    def __str__(self):
        return "price for {provider} bundled with {partner}".format(provider = self.provider, partner= self.partner_provider)


class Package(models.Model):
    content = models.ManyToManyField(Content)
    providers = models.ManyToManyField(ContentProvider)
    hardware = models.ManyToManyField(Hardware)
    owner = models.ForeignKey(User, related_name='packages')

    def __str__(self):
        return "Package Configuration {0} for {1}".format(self.pk, self.owner.username)

class JsonPackage(models.Model):
    json = models.TextField()
    owner = models.OneToOneField (User)

    def __str__(self):
        return "JSON package for {owner}".format(owner=self.owner)
