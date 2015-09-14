# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_auto_20150626_0250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='owner',
            field=models.ForeignKey(related_name='packages', to=settings.AUTH_USER_MODEL),
        ),
    ]
