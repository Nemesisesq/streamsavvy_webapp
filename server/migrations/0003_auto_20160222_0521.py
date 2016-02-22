# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_auto_20160222_0150'),
    ]

    operations = [
        migrations.CreateModel(
            name='LiveStream',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('web_source', models.TextField(null=True, blank=True)),
                ('web_display_name', models.TextField(null=True, blank=True)),
                ('web_type', models.TextField(null=True, blank=True)),
                ('web_link', models.URLField(null=True, blank=True)),
            ],
        ),
        migrations.RenameField(
            model_name='channel',
            old_name='source',
            new_name='short_name',
        ),
        migrations.AddField(
            model_name='channel',
            name='live_stream',
            field=models.ForeignKey(to='server.LiveStream', default=datetime.datetime(2016, 2, 22, 5, 21, 20, 506433, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
