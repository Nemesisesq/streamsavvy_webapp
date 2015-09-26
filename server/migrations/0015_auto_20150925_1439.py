# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0014_anonymoususer'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='modified',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='modified',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
