# Generated by Django 2.2.7 on 2020-01-13 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendiApp', '0004_auto_20200113_1210'),
    ]

    operations = [
        migrations.RenameField(
            model_name='media',
            old_name='original_file_name',
            new_name='file_name',
        ),
        migrations.RemoveField(
            model_name='media',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='media',
            name='size',
        ),
    ]
