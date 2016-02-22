# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='hardware',
            field=models.ManyToManyField(to='server.Hardware', blank=True),
        ),
        migrations.AddField(
            model_name='channel',
            name='is_on_sling',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='content',
            name='channel',
            field=models.ManyToManyField(to='server.Channel', blank=True),
        ),
    ]
