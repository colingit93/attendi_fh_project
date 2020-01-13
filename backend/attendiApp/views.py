from django.contrib.auth.decorators import permission_required
from django.contrib.auth.hashers import make_password
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from .models import Course, CourseSession, User, Statistic, AttendanceItem, Media, Profile
from .serializer import CourseFormSerializer, CourseListSerializer, CourseSessionFormSerializer, \
    CourseSessionListSerializer, AttendanceItemSerializer, MediaSerializer, StatisticSerializer, UserFormSerializer, \
    UserListSerializer, ProfileSerializer, UserOptionSerializer, AttendanceOptionSerializer, \
    CourseSessionOptionSerializer, CourseOptionSerializer, UserIdSerializer


@swagger_auto_schema(method='GET', responses={200: StatisticSerializer(many=True)})
@api_view(['GET'])
def statistic_list(request):
    statistics = Statistic.objects.all()
    serializer = StatisticSerializer(statistics, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CourseListSerializer(many=True)})
@api_view(['GET'])
# @permission_required('.view_course', raise_exception=True)
def courses_list(request):
    course = Course.objects.all()
    serializer = CourseListSerializer(course, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['POST'])
# @permission_required('.add_course', raise_exception=True)
def course_form_create(request):
    serializer = CourseFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['PUT'])
# @permission_required('.change_course', raise_exception=True)
def course_form_update(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)

    serializer = CourseFormSerializer(course, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CourseListSerializer()})
@api_view(['GET'])
# @permission_required('.view_course', raise_exception=True)
def course_form_get(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)

    serializer = CourseFormSerializer(course)
    return Response(serializer.data)


@api_view(['DELETE'])
# @permission_required('.delete_course', raise_exception=True)
def course_delete(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)
    course.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: CourseOptionSerializer(many=True)})
@api_view(['GET'])
def course_option_list(request):
    course = Course.objects.all()
    serializer = CourseOptionSerializer(course, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CourseSessionListSerializer(many=True)})
@api_view(['GET'])
# @permission_required('.view_course_session', raise_exception=True)
def coursesessions_list(request):
    coursesessions = CourseSession.objects.all()
    serializer = CourseSessionListSerializer(coursesessions, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CourseSessionFormSerializer,
                     responses={200: CourseSessionFormSerializer()})
@api_view(['POST'])
# @permission_required('.add_course_session', raise_exception=True)
def coursesession_form_create(request):
    serializer = CourseSessionFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CourseSessionFormSerializer,
                     responses={200: CourseSessionFormSerializer()})
@api_view(['PUT'])
# @permission_required('.change_course_session', raise_exception=True)
def coursesession_form_update(request, pk):
    try:
        coursesession = CourseSession.objects.get(pk=pk)
    except CourseSession.DoesNotExist:
        return Response({'error': 'Coursesession does not exist.'}, status=404)

    serializer = CourseSessionFormSerializer(coursesession, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CourseSessionListSerializer()})
@api_view(['GET'])
# @permission_required('.view_course_session', raise_exception=True)
def coursesession_form_get(request, pk):
    try:
        coursesession = CourseSession.objects.get(pk=pk)
    except CourseSession.DoesNotExist:
        return Response({'error': 'Coursesession does not exist.'}, status=404)

    serializer = CourseSessionFormSerializer(coursesession)
    return Response(serializer.data)


@api_view(['DELETE'])
# @permission_required('.delete_course_session', raise_exception=True)
def coursesession_delete(request, pk):
    try:
        coursesession = CourseSession.objects.get(pk=pk)
    except CourseSession.DoesNotExist:
        return Response({'error': 'Coursesession does not exist.'}, status=404)
    coursesession.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: CourseSessionOptionSerializer(many=True)})
@api_view(['GET'])
def coursesession_option_list(request):
    coursesession = CourseSession.objects.all()
    serializer = CourseSessionOptionSerializer(coursesession, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=ProfileSerializer, responses={200: ProfileSerializer()})
@api_view(['POST'])
# @permission_required('.add_user', raise_exception=True)
def profile_form_create(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: ProfileSerializer()})
@api_view(['GET'])
# @permission_required('.view_user', raise_exception=True)
def profile_form_get(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@swagger_auto_schema(method='PUT', request_body=ProfileSerializer, responses={200: ProfileSerializer()})
@api_view(['PUT'])
# @permission_required('.change_user', raise_exception=True)
def profile_form_update(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: UserListSerializer(many=True)})
@api_view(['GET'])
# @permission_required('.view_user', raise_exception=True)
def users_list(request):
    users = User.objects.all()
    serializer = UserListSerializer(users, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=UserFormSerializer, responses={200: UserFormSerializer()})
@api_view(['POST'])
# @permission_required('.add_user', raise_exception=True)
def user_form_create(request):
    serializer = UserFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=UserFormSerializer, responses={200: UserFormSerializer()})
@api_view(['PUT'])
# @permission_required('.change_user', raise_exception=True)
def user_form_update(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserFormSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: UserListSerializer()})
@api_view(['GET'])
# @permission_required('.view_user', raise_exception=True)
def user_form_get(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserFormSerializer(user)
    return Response(serializer.data)


@api_view(['DELETE'])
# @permission_required('.delete_user', raise_exception=True)
def user_delete(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    user.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: UserOptionSerializer(many=True)})
@api_view(['GET'])
def user_option_list(request):
    user = User.objects.all()
    serializer = UserOptionSerializer(user, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AttendanceItemSerializer(many=True)})
@api_view(['GET'])
def attendance_item_list(request):
    student = AttendanceItem.objects.all()
    serializer = AttendanceItemSerializer(student, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AttendanceOptionSerializer(many=True)})
@api_view(['GET'])
def attendance_item_option_list(request):
    attendance_list = AttendanceItem.objects.all()
    serializer = AttendanceOptionSerializer(attendance_list, many=True)
    return Response(serializer.data)


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file = request.FILES['file']
        content_type = request.data['content_type']
        file_input = {
            'file_name': file.name,
            'content_type': content_type
        }
        serializer = MediaSerializer(data=file_input)
        if serializer.is_valid():
            serializer.save()
            default_storage.save('media/' + str(serializer.data['id']), ContentFile(file.read()))
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


def media_download(request, pk):
    media = Media.objects.get(pk=pk)
    data = default_storage.open('media/' + str(pk)).read()
    content_type = media.content_type
    response = HttpResponse(data, content_type=content_type)
    file_name = media.file_name
    response['Content-Disposition'] = 'inline; filename=' + file_name
    return response


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Media does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def user_find_by_username(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserIdSerializer(user)
    return Response(serializer.data)
