# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0017_remove_contentprovider_guidebox_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='freebase_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='content',
            name='imdb_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='content',
            name='tvdb_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='content',
            name='tvrage_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='content',
            name='wikepedia_id',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='content',
            name='title',
            field=models.CharField(max_length=250, default=datetime.datetime(2015, 10, 20, 1, 43, 6, 881627, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
