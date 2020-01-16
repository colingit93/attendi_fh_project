from django.contrib.auth.models import Group
from rest_framework import serializers

from .models import Course, CourseSession, User, AttendanceItem, Statistic, Media, Profile


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = '__all__'

class StatisticListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = '__all__'

class CourseOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name']


class UserOptionSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'fullname']

    def get_fullname(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))


class CourseListSerializer(serializers.ModelSerializer):
    lecturer = serializers.StringRelatedField(many=True, read_only=True)
    students = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'students', 'lecturer']


class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseSessionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSession
        fields = ['id', 'location']


class CourseSessionListSerializer(serializers.ModelSerializer):
    course_name = serializers.SerializerMethodField()


    class Meta:
        model = CourseSession
        fields = ['id', 'location', 'studentgroup', 'mandatory', 'date', 'start_time', 'end_time', 'course_name', 'password']
        fields = '__all__'

    def get_course_name(self, obj):
        return obj.course.name if obj.course else ''


class CourseSessionFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSession
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'profile']

    def get_full_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))


class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AttendanceOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        fields = ['id', 'student']


class AttendanceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        #fields = ['id', 'student', 'present', 'absence_note']
        fields = '__all__'


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']
