# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hardware',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('version', models.CharField(max_length=50, blank=True, null=True)),
                ('retail_cost', models.FloatField()),
                ('membership_cost', models.FloatField()),
            ],
        ),
    ]
