# Generated by Django 5.1.5 on 2025-01-25 16:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Waypoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.CharField(max_length=20)),
                ('longitude', models.CharField(max_length=20)),
                ('create_dt', models.DateTimeField()),
                ('update_dt', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('embed_link', models.URLField()),
                ('description', models.TextField()),
                ('create_dt', models.DateTimeField()),
                ('update_dt', models.DateTimeField()),
                ('waypoint', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mapviewer.waypoint')),
            ],
        ),
    ]
