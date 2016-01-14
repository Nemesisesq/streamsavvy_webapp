# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0021_content_first_aired'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bundlecost',
            name='partner_provider',
        ),
        migrations.RemoveField(
            model_name='bundlecost',
            name='provider',
        ),
        migrations.DeleteModel(
            name='BundleCost',
        ),
    ]
