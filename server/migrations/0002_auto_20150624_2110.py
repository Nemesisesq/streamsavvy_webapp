# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('title', models.CharField(blank=True, max_length=50, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('home_url', models.URLField(blank=True, null=True)),
                ('image_url', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ContentProvider',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('home_url', models.URLField(blank=True, null=True)),
                ('image_url', models.URLField(blank=True, null=True)),
                ('retail_cost', models.FloatField(blank=True, null=True)),
                ('membership_cost', models.FloatField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='hardware',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='hardware',
            name='home_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='hardware',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='hardware',
            name='membership_cost',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='hardware',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='hardware',
            name='retail_cost',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='contentprovider',
            name='hardware',
            field=models.ManyToManyField(blank=True, to='server.Hardware', null=True),
        ),
        migrations.AddField(
            model_name='content',
            name='content_provider',
            field=models.ManyToManyField(blank=True, to='server.ContentProvider', null=True),
        ),
    ]
