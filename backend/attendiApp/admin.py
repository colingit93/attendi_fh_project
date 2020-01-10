from django.contrib import admin
from .models import *


class CourseAdmin(admin.ModelAdmin): pass


class CourseSessionAdmin(admin.ModelAdmin): pass


class AttendanceItemAdmin(admin.ModelAdmin): pass


class StatisticAdmin(admin.ModelAdmin): pass


class ProfileAdmin(admin.ModelAdmin): pass

class MediaAdmin(admin.ModelAdmin): pass


admin.site.register(Course, CourseAdmin)
admin.site.register(CourseSession, CourseSessionAdmin)
admin.site.register(AttendanceItem, AttendanceItemAdmin)
admin.site.register(Statistic, StatisticAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Media, MediaAdmin)