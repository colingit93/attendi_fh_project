# Generated by Django 2.2.6 on 2020-01-15 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendiApp', '0007_media_content_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursesession',
            name='studentgroup',
            field=models.CharField(choices=[('G1', 'Group 1'), ('G2', 'Group 2'), ('G3', 'Group 3')], max_length=2, null=True),
        ),
    ]
