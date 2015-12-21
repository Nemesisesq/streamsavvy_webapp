# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0020_jsonpackage'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='first_aired',
            field=models.DateField(null=True, blank=True),
        ),
    ]
