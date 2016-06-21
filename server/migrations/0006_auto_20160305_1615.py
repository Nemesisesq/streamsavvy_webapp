# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-05 16:15
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_merge'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BatchJobs',
        ),
        migrations.AlterField(
            model_name='package',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default={'server': [], 'hardware': [], 'services': []}, null=True),
        ),
    ]
