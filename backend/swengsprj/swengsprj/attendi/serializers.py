from rest_framework import serializers
from .models import Course, CourseSession, User, AttendanceItem, Statistic, Media, Profile


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ['id', 'course']


class CourseListSerializer(serializers.ModelSerializer):
    course_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'country_name', 'description', 'session', 'students', 'lecturer']

    def get_course_name(self, obj):
        return obj.course.name if obj.course else ''


class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


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


class UserListSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username']

    def get_user_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))


class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class AttendanceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceItem
        fields = ['id', 'student']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'
