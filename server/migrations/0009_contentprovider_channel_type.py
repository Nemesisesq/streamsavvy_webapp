# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0008_auto_20150726_1947'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentprovider',
            name='channel_type',
            field=models.CharField(null=True, blank=True, max_length=100),
        ),
    ]
