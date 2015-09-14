# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0012_auto_20150819_0133'),
    ]

    operations = [
        migrations.CreateModel(
            name='BundleCost',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('cost', models.FloatField(null=True, blank=True)),
                ('partner_provider', models.ForeignKey(blank=True, to='server.ContentProvider', related_name='partner', null=True)),
                ('provider', models.ForeignKey(blank=True, to='server.ContentProvider', related_name='provider', null=True)),
            ],
        ),
    ]
