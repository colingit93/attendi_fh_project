# Generated by Django 2.2.6 on 2020-01-21 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendiApp', '0002_auto_20200116_1708'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursesession',
            name='end_time',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='coursesession',
            name='start_time',
            field=models.DateField(),
        ),
    ]
