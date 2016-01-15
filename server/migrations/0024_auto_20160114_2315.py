# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0023_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='browser',
            field=models.CharField(max_length=500, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='url',
            field=models.CharField(max_length=500, blank=True, null=True),
        ),
    ]
