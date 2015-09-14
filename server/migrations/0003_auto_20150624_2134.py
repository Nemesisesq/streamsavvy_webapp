# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ('server', '0002_auto_20150624_2110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='content_provider',
            field=models.ManyToManyField(to='server.ContentProvider'),
        ),
        migrations.AlterField(
            model_name='contentprovider',
            name='hardware',
            field=models.ManyToManyField(to='server.Hardware'),
        ),
    ]
