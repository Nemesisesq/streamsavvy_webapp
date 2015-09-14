# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('server', '0004_package'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contentprovider',
            old_name='membership_cost',
            new_name='mem_cost',
        ),
        migrations.RenameField(
            model_name='hardware',
            old_name='membership_cost',
            new_name='mem_cost',
        ),
    ]
