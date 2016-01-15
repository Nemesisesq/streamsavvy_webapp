# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0022_auto_20160114_2244'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('browser', models.CharField(max_length=150, null=True, blank=True)),
                ('url', models.CharField(max_length=150, null=True, blank=True)),
                ('note', models.TextField(null=True, blank=True)),
                ('image', models.ImageField(upload_to='')),
                ('html', models.TextField(null=True, blank=True)),
            ],
        ),
    ]
