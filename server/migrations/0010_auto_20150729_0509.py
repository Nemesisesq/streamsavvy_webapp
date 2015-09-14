# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0009_contentprovider_channel_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentprovider',
            name='guidebox_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='thumbnail_large',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='thumbnail_medium',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='thumbnail_small',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='thumbnail_x_large',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='contentprovider',
            name='name',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
