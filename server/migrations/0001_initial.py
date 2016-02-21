# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.auth.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AnonymousUser',
            fields=[
                ('user_ptr', models.OneToOneField(primary_key=True, parent_link=True, auto_created=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('session', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
                'verbose_name_plural': 'users',
                'verbose_name': 'user',
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True, blank=True)),
                ('guidebox_id', models.IntegerField(null=True, blank=True)),
                ('source', models.CharField(max_length=50, null=True, blank=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('home_url', models.URLField(null=True, blank=True)),
                ('channel_type', models.CharField(max_length=100, null=True, blank=True)),
                ('payment_type', models.CharField(max_length=100, null=True, blank=True)),
                ('android_app', models.URLField(null=True, blank=True)),
                ('apple_app', models.URLField(null=True, blank=True)),
                ('modified', models.DateTimeField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('first_aired', models.DateField(null=True, blank=True)),
                ('guidebox_id', models.IntegerField(unique=True, null=True, blank=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('home_url', models.URLField(null=True, blank=True)),
                ('modified', models.DateTimeField(null=True, blank=True)),
                ('tvrage_id', models.IntegerField(null=True, blank=True)),
                ('themoviedb_id', models.IntegerField(null=True, blank=True)),
                ('tvdb_id', models.IntegerField(null=True, blank=True)),
                ('freebase_id', models.CharField(max_length=50, null=True, blank=True)),
                ('imdb_id', models.CharField(max_length=50, null=True, blank=True)),
                ('wikepedia_id', models.IntegerField(null=True, blank=True)),
                ('channel', models.ManyToManyField(to='server.Channel', null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('browser', models.TextField(null=True, blank=True)),
                ('url', models.CharField(max_length=500, null=True, blank=True)),
                ('note', models.TextField(null=True, blank=True)),
                ('image', models.ImageField(upload_to='')),
                ('html', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Hardware',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True, blank=True)),
                ('version', models.CharField(max_length=50, null=True, blank=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('home_url', models.URLField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField(null=True, blank=True)),
                ('thumbnail_small', models.URLField(null=True, blank=True)),
                ('thumbnail_medium', models.URLField(null=True, blank=True)),
                ('thumbnail_large', models.URLField(null=True, blank=True)),
                ('thumbnail_x_large', models.URLField(null=True, blank=True)),
                ('misc_pictures', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='JsonPackage',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('json', models.TextField()),
                ('owner', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('content', models.ManyToManyField(to='server.Content')),
                ('hardware', models.ManyToManyField(to='server.Hardware')),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='packages')),
                ('providers', models.ManyToManyField(to='server.Channel')),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('retail_cost', models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)),
                ('member_cost', models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)),
                ('subscription_monthly', models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='hardware',
            name='images',
            field=models.ForeignKey(to='server.Images', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='hardware',
            name='price',
            field=models.ForeignKey(to='server.Price', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='content',
            name='images',
            field=models.ForeignKey(to='server.Images', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='channel',
            name='images',
            field=models.ForeignKey(to='server.Images', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='channel',
            name='price',
            field=models.ForeignKey(to='server.Price', null=True, blank=True),
        ),
    ]
