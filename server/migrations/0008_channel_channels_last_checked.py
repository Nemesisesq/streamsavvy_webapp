# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-22 04:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_channelimages'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='channels_last_checked',
            field=models.DateField(blank=True, null=True),
        ),
    ]