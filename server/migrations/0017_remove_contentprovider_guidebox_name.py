# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0016_contentprovider_guidebox_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contentprovider',
            name='guidebox_name',
        ),
    ]
