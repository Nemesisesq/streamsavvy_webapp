# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-25 03:15
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20160725_0225'),
    ]

    operations = [
        migrations.AddField(
            model_name='package',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
