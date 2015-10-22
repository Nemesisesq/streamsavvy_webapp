# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0018_auto_20151020_0143'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='themoviedb_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='content',
            name='freebase_id',
            field=models.CharField(null=True, max_length=50, blank=True),
        ),
        migrations.AlterField(
            model_name='content',
            name='imdb_id',
            field=models.CharField(null=True, max_length=50, blank=True),
        ),
    ]
