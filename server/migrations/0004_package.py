# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('server', '0003_auto_20150624_2134'),
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('content', models.ManyToManyField(to='server.Content')),
                ('hardware', models.ManyToManyField(to='server.Hardware')),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('providers', models.ManyToManyField(to='server.ContentProvider')),
            ],
        ),
    ]
