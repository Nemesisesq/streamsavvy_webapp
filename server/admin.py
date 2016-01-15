from django.contrib import admin

from server.models import *

# Register your models here.

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    pass


@admin.register(ContentProvider)
class ContentProviderAdmin(admin.ModelAdmin):
    pass


@admin.register(Hardware)
class HardwareAdmin(admin.ModelAdmin):
    pass


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    pass

@admin.register(JsonPackage)
class JsonPackage(admin.ModelAdmin):
    pass

@admin.register(Feedback)
class Feedback(admin.ModelAdmin):
    pass