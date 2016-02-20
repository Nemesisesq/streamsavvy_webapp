# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('titan', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='channel',
            old_name='name',
            new_name='callsign',
        ),
        migrations.AddField(
            model_name='channel',
            name='network',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
