# Generated by Django 2.2.7 on 2020-01-16 12:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True)),
                ('lecturer', models.ManyToManyField(blank=True, related_name='lecturer', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(blank=True, related_name='student', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.TextField()),
                ('content_type', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField(null=True)),
                ('student_group', models.CharField(blank=True, choices=[('G1', 'Group 1'), ('G2', 'Group 2'), ('G3', 'Group 3')], max_length=2, null=True)),
                ('image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='attendiApp.Media')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Statistic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_course_sessions', models.IntegerField(default=None, null=True)),
                ('total_mandatory_course_sessions', models.IntegerField(default=None, null=True)),
                ('visited_course_sessions', models.IntegerField(default=None, null=True)),
                ('attendance_percentage', models.FloatField(default=None, null=True)),
                ('course_sessions_missed', models.PositiveIntegerField(default=None, null=True)),
                ('time_in_courses', models.IntegerField(default=None, null=True)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='attendiApp.Course')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='attendiApp.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='CourseSession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(choices=[('V1', 'Vorlesungssaal 1'), ('V2', 'Vorlesungssaal 2'), ('V3', 'Vorlesungssaal 3'), ('V4', 'Vorlesungssaal 4'), ('V5', 'Vorlesungssaal 5'), ('S1', 'Seminarraum 18'), ('S2', 'Seminarraum 19'), ('L1', 'EDV-Labor 31'), ('L2', 'EDV-Labor 33'), ('L3', 'EDV-Labor 41'), ('L4', 'EDV-Labor 45')], max_length=2, null=True)),
                ('mandatory', models.BooleanField()),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('student_group', models.CharField(choices=[('G1', 'Group 1'), ('G2', 'Group 2'), ('G3', 'Group 3')], max_length=2, null=True)),
                ('password', models.TextField()),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='attendiApp.Course')),
            ],
        ),
        migrations.CreateModel(
            name='AttendanceItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('present', models.BooleanField(default=False)),
                ('absence_note', models.ManyToManyField(blank=True, to='attendiApp.Media')),
                ('course_session', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='attendiApp.CourseSession')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
