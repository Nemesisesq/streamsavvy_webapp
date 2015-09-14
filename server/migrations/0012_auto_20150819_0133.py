# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0011_auto_20150812_0223'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentprovider',
            name='android_app',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='apple_app',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='payment_type',
            field=models.CharField(blank=True, null=True, max_length=100),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='source',
            field=models.CharField(blank=True, null=True, max_length=50),
        ),
    ]
