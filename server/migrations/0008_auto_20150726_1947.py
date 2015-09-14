# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_content_guidebox_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='content',
            old_name='image_url',
            new_name='thumbnail_large',
        ),
        migrations.AddField(
            model_name='content',
            name='thumbnail_medium',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='content',
            name='thumbnail_small',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='content',
            name='thumbnail_x_large',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='content',
            name='guidebox_id',
            field=models.IntegerField(null=True, blank=True, unique=True),
        ),
    ]
