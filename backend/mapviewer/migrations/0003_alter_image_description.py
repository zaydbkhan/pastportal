# Generated by Django 5.1.5 on 2025-01-26 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapviewer', '0002_alter_image_embed_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
