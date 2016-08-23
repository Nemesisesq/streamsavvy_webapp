# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-23 00:14
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guide', '0009_auto_20160413_0057'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoviProgramImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program_id', models.TextField(blank=True, null=True)),
                ('image_list', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
            ],
        ),
    ]
