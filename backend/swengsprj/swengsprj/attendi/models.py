from django.db import models


class User(models.Model):

    ROLE = (
        ('S', 'Student'),
        ('L', 'Lecturer')
    )

    GROUP = (
        ('G1', 'Group 1'),
        ('G2', 'Group 2'),
        ('G3', 'Group 3')
    )

    personnumber = models.IntegerField()
    first_name = models.TextField()
    last_name = models.TextField()
    date_of_birth = models.DateField()
    role = models.CharField(max_length=1, choices=ROLE, null=True)
    group = models.CharField(max_length=2, choices=GROUP, null=True)
    #statistics = models.(Statistic, blank=True)
    image = models.ManyToManyField('Media', blank=True)

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.date_of_birth)




class AttendanceItem(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    status = models.BooleanField()
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
    students = models.ManyToManyField('User', blank=True)
    lecturer = models.ManyToManyField('User', blank=True)


    def __str__(self):
        return self.name



class Statistic(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    attendance_percentage = models.FloatField()
    courses_missed = models.PositiveIntegerField()
    time_in_courses = models.TimeField()


    def __str__(self):
        return self.course


class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()

