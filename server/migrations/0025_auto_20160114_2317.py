# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0024_auto_20160114_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='browser',
            field=models.TextField(max_length=500, blank=True, null=True),
        ),
    ]
