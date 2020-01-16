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


class CourseListSerializer(serializers.ModelSerializer):
    #session_location = serializers.SerializerMethodField()
    #students_username = serializers.SerializerMethodField()
    #lecturer_username = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'students', 'lecturer']

    #def get_session_location(self, obj):
        #return obj.session.location if obj.session else ''

   # def get_students_username(self, obj):
        #return obj.students.username if obj.students else ''

   # def get_lecturer_username(self, obj):
        #return obj.lecturer.username if obj.lecturer else ''


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
        #fields = ['id', 'location', 'mandatory', 'date', 'start_time', 'end_time', 'course_name']
        fields = '__all__'

    def get_course_name(self, obj):
        return obj.course.name if obj.course else ''


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