from rest_framework import serializers
from .models import Course, CourseSession, User, AttendanceItem, Statistic, Media, Profile


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ['id', 'course']


class CourseOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name']


class CourseListSerializer(serializers.ModelSerializer):
    course_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'course_name', 'description', 'session', 'students', 'lecturer']

    def get_course_name(self, obj):
        return obj.course.name if obj.course else ''


class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseSessionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSession
        fields = ['id', 'location']


class CourseSessionListSerializer(serializers.ModelSerializer):
    coursesession_location = serializers.SerializerMethodField()

    class Meta:
        model = CourseSession
        fields = ['id', 'coursesession_location', 'location', 'mandatory', 'start_time', 'end_time', 'attendance_list']

    def get_coursesession_location(self, obj):
        return obj.coursesession.location if obj.course else ''


class CourseSessionFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSession
        fields = '__all__'


class UserOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']


class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name']

    def get_full_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))


class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class AttendanceOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        fields = ['id', 'student']


class AttendanceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        fields = ['id', 'student', 'present', 'absence_note']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'
