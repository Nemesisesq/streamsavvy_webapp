# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0026_auto_20160114_2317'),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(null=True, max_length=50, blank=True)),
                ('guidebox_id', models.IntegerField(null=True, blank=True)),
                ('source', models.CharField(null=True, max_length=50, blank=True)),
                ('description', models.TextField(null=True, blank=True)),
                ('home_url', models.URLField(null=True, blank=True)),
                ('channel_type', models.CharField(null=True, max_length=100, blank=True)),
                ('payment_type', models.CharField(null=True, max_length=100, blank=True)),
                ('android_app', models.URLField(null=True, blank=True)),
                ('apple_app', models.URLField(null=True, blank=True)),
                ('modified', models.DateTimeField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('image_url', models.URLField(null=True, blank=True)),
                ('thumbnail_small', models.URLField(null=True, blank=True)),
                ('thumbnail_medium', models.URLField(null=True, blank=True)),
                ('thumbnail_large', models.URLField(null=True, blank=True)),
                ('thumbnail_x_large', models.URLField(null=True, blank=True)),
                ('misc_pictures', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('retail_cost', models.DecimalField(decimal_places=2, null=True, max_digits=6, blank=True)),
                ('member_cost', models.DecimalField(decimal_places=2, null=True, max_digits=6, blank=True)),
                ('subscription_monthly', models.DecimalField(decimal_places=2, null=True, max_digits=6, blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='contentprovider',
            name='hardware',
        ),
        migrations.RemoveField(
            model_name='content',
            name='content_provider',
        ),
        migrations.RemoveField(
            model_name='content',
            name='thumbnail_large',
        ),
        migrations.RemoveField(
            model_name='content',
            name='thumbnail_medium',
        ),
        migrations.RemoveField(
            model_name='content',
            name='thumbnail_small',
        ),
        migrations.RemoveField(
            model_name='content',
            name='thumbnail_x_large',
        ),
        migrations.RemoveField(
            model_name='hardware',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='hardware',
            name='mem_cost',
        ),
        migrations.RemoveField(
            model_name='hardware',
            name='retail_cost',
        ),
        migrations.AlterField(
            model_name='package',
            name='providers',
            field=models.ManyToManyField(to='server.Channel'),
        ),
        migrations.DeleteModel(
            name='ContentProvider',
        ),
        migrations.AddField(
            model_name='channel',
            name='hardware',
            field=models.ManyToManyField(null=True, blank=True, to='server.Hardware'),
        ),
        migrations.AddField(
            model_name='channel',
            name='images',
            field=models.ForeignKey(null=True, blank=True, to='server.Images'),
        ),
        migrations.AddField(
            model_name='channel',
            name='price',
            field=models.ForeignKey(null=True, blank=True, to='server.Price'),
        ),
        migrations.AddField(
            model_name='content',
            name='channel',
            field=models.ManyToManyField(null=True, blank=True, to='server.Channel'),
        ),
        migrations.AddField(
            model_name='content',
            name='images',
            field=models.ForeignKey(null=True, blank=True, to='server.Images'),
        ),
        migrations.AddField(
            model_name='hardware',
            name='images',
            field=models.ForeignKey(null=True, blank=True, to='server.Images'),
        ),
        migrations.AddField(
            model_name='hardware',
            name='price',
            field=models.ForeignKey(null=True, blank=True, to='server.Price'),
        ),
    ]
