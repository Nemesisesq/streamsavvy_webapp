# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-28 21:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20160225_0417'),
    ]

    operations = [
        migrations.CreateModel(
            name='BatchJobs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated', models.DateTimeField(auto_now=True)),
                ('added', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='server',
            name='channel',
            field=models.ManyToManyField(blank=True, to='server.Channel'),
        ),
    ]