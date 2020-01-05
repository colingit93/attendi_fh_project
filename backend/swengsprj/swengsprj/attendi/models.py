from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    ROLE = (
        ('S', 'Student'),
        ('L', 'Lecturer')
    )

    GROUP = (
        ('G1', 'Group 1'),
        ('G2', 'Group 2'),
        ('G3', 'Group 3')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    '''
    User fields:
        username
        first_name
        last_name
        email
        password
        groups
        user_permissions
        is_staff (boolean: access to admin site)
        is_active (recommended to use instead of user deletion)
        is_superuser
        last_login
        date_joined
    '''
    date_of_birth = models.DateField(null=True)
    role = models.CharField(max_length=1, choices=ROLE, null=True)
    student_group = models.CharField(max_length=2, choices=GROUP, null=True)
    statistics = models.ManyToManyField('Statistic', blank=True)
    image = models.ManyToManyField('Media', blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class AttendanceItem(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    present = models.BooleanField(default=False)
    absence_note = models.ManyToManyField('Media', blank=True)

    def __str__(self):
        return self.student


class CourseSession(models.Model):
    ROOMS = (
        ('V1', 'Vorlesungssaal 1'),
        ('V2', 'Vorlesungssaal 2'),
        ('V3', 'Vorlesungssaal 3'),
        ('V4', 'Vorlesungssaal 4'),
        ('V5', 'Vorlesungssaal 5'),
        ('S1', 'Seminarraum 18'),
        ('S2', 'Seminarraum 19'),
        ('L1', 'EDV-Labor 31'),
        ('L2', 'EDV-Labor 33'),
        ('L3', 'EDV-Labor 41'),
        ('L4', 'EDV-Labor 45'),
    )

    location = models.CharField(max_length=2, choices=ROOMS, null=True)
    mandatory = models.BooleanField()
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    attendance_list = models.OneToOneField(AttendanceItem, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.location


class Course(models.Model):
    name = models.TextField()
    description = models.TextField(blank=True)
    session = models.ForeignKey(CourseSession, on_delete=models.CASCADE, null=True)
    students = models.ManyToManyField(User, blank=True, related_name='student')
    lecturer = models.ManyToManyField(User, blank=True, related_name='lecturer')

    def __str__(self):
        return self.name


class Statistic(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    attendance_percentage = models.FloatField()
    courses_missed = models.PositiveIntegerField()
    time_in_courses = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.course


class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()
