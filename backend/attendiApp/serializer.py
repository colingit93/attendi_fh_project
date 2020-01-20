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

        fields = ['id', 'location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'course_name',
                  'student_group', 'password']

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


class AttendanceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        depth = 1
        fields = ['id', 'present', 'course_session', 'student', 'absence_note']


class AttendanceItemSerializer(serializers.ModelSerializer):
    student_username = serializers.SerializerMethodField()

    class Meta:
        model = AttendanceItem
        depth = 2
        fields = ['id', 'student_username', 'present', 'course_session', 'absence_note']

    def get_student_username(self, obj):
        return obj.student.username if obj.student else ''


class AttendanceItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        fields = ['id', 'present', 'course_session', 'absence_note']


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
