# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_auto_20150715_0342'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='guidebox_id',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
