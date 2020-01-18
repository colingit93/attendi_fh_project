import logging
from datetime import date

from django.contrib.auth.decorators import permission_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

logger = logging.getLogger(__name__)

from .models import Course, CourseSession, User, Statistic, AttendanceItem, Media, Profile
from .serializer import CourseFormSerializer, CourseListSerializer, CourseSessionFormSerializer, \
    CourseSessionListSerializer, AttendanceItemSerializer, MediaSerializer, StatisticSerializer, UserFormSerializer, \
    UserListSerializer, ProfileSerializer, UserOptionSerializer, AttendanceOptionSerializer, \
    CourseSessionOptionSerializer, CourseOptionSerializer, UserIdSerializer, StatisticListSerializer, GroupSerializer


def create_statistic(primarykey):
    # create a statistic for each user which attends the course
    course_item = Course.objects.get(pk=primarykey)
    course_student_values = course_item.students.values()

    student_id_list = []
    for i in range(len(course_student_values)):
        student_id_list.append(course_student_values[i].get('id'))

    for student_pk in student_id_list:
        newstat = Statistic.objects.create()
        newstat.course = Course.objects.get(pk=primarykey)
        newstat.total_course_sessions = 0
        newstat.total_mandatory_course_sessions = 0
        newstat.visited_course_sessions = 0
        newstat.attendance_percentage = 0
        newstat.courses_missed = 0
        newstat.time_in_courses = 0
        newstat.profile = Profile.objects.get(pk=student_pk)
        newstat.save()
    logging.warning('Statistic Created with Student IDs: %s' % student_id_list)
    return True


def create_attendance_item(student_group, course_session_id):
    # attendance_item = AttendanceItem.objects.create()
    students = Profile.objects.filter(student_group=student_group)
    # logging.warning('Students of: %s' % student_group + ' are %s' % students)
    # logging.warning('########## %s' % students[0].pk)
    for student in students:
        attendance_item = AttendanceItem.objects.create()
        attendance_item.student = User.objects.get(pk=student.pk)
        attendance_item.course_session = CourseSession.objects.get(pk=course_session_id)
        attendance_item.present = False
        attendance_item.absence_note = None
        attendance_item.save()
    return True


def update_statistic(pk):
    logging.warning('Updating/Calculating Statistic...')

    # SECTION: UPDATE/CALC FIELD: TOTAL COURSE SESSIONS , TOTAL MANDATORY COURSE SESSIONS
    # Get and save Course ID's for the individual user (pk) from the statistic page
    courses_foreign_keys = []
    statistic_items = Statistic.objects.filter(profile=pk)
    statistic_fields = statistic_items.values()

    for i in range(len(statistic_fields)):
        # Save Foreign Keys of course the user is subscribed to from statistic into list
        courses_foreign_keys.append(statistic_fields[i].get('course_id'))
    logging.warning('-----Courses Foreign Keys: %s' % courses_foreign_keys)

    # get the ammount of course sessions for each course ID from the statistic (using the foreign key list)
    # Iterate through the course foreign keys
    for k in range(len(courses_foreign_keys)):
        student = Profile.objects.get(pk=pk)
        student_group = student.student_group
        # logging.warning('STUDENT GROUP::::::::: %s' % student_group)
        mandatory_coursesessions_for_this_course = CourseSession.objects.filter(course=courses_foreign_keys[k],
                                                                                mandatory=True,
                                                                                student_group=student_group).values()
        # only course sessions with the foreign key from the list
        coursesessions_for_this_course = CourseSession.objects.filter(course=courses_foreign_keys[k],
                                                                      student_group=student_group).values()
        # length gives us the ammount of course sessions
        total_course_sessions_ammount = len(coursesessions_for_this_course)
        mandatory_course_sessions_ammount = len(mandatory_coursesessions_for_this_course)
        logging.warning('Course with ID:%s' % courses_foreign_keys[
            k] + ' has %s' % total_course_sessions_ammount + ' total course sessions')
        logging.warning('Course with ID:%s' % courses_foreign_keys[
            k] + ' has %s' % mandatory_course_sessions_ammount + ' mandatory course sessions')
        # Update the field in statistics database model (for the specific user and course_id)
        Statistic.objects.filter(profile=pk, course_id=courses_foreign_keys[k]).update(
            total_course_sessions=total_course_sessions_ammount)
        Statistic.objects.filter(profile=pk, course_id=courses_foreign_keys[k]).update(
            total_mandatory_course_sessions=mandatory_course_sessions_ammount)

        # SECTION UPDATE/CALC FIELD: VISISTED COURSE SESSION
        visited_course_sessions = len(AttendanceItem.objects.filter(student=pk, present=True,
                                                                    course_session__course_id__exact=
                                                                    courses_foreign_keys[k]))
        logging.warning(
            'Amount of attended course sessions:%s' % visited_course_sessions + 'for course:%s' % courses_foreign_keys[
                k])
        Statistic.objects.filter(profile=pk, course_id=courses_foreign_keys[k]).update(
            visited_course_sessions=visited_course_sessions)

        # UPDATE/CALC FIELD: ATTENDANCE PERCENTAGE
        attendance_percentage = (visited_course_sessions / total_course_sessions_ammount) * 100
        Statistic.objects.filter(profile=pk, course_id=courses_foreign_keys[k]).update(
            attendance_percentage=attendance_percentage)

        # UPDATE/CALC FIELD: COURSE SESSIONS MISSED
        course_sessions_missed = (total_course_sessions_ammount - visited_course_sessions)
        Statistic.objects.filter(profile=pk, course_id=courses_foreign_keys[k]).update(
            course_sessions_missed=course_sessions_missed)

        # UPDATE/CALC FIELD: TIME IN COURSES
        # start_time = CourseSession.objects.filter(course= courses_foreign_keys[k]).values()
        # logging.warning('CourseSessionTime:%s' % start_time)
    return True


@swagger_auto_schema(method='GET', responses={200: StatisticSerializer(many=True)})
@api_view(['GET'])
def statistic_list(request, pk):
    update_statistic(pk)
    logger.warning("Get List Called")
    statistics = Statistic.objects.filter(profile=pk)
    serializer = StatisticSerializer(statistics, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: StatisticListSerializer()})
@api_view(['GET'])
# @permission_required('.view_course', raise_exception=True)
def statistic_form_get(request, pk):
    try:
        statistic = Statistic.objects.get(pk=pk)
    except Statistic.DoesNotExist:
        return Response({'error': 'Statistic does not exist.'}, status=404)

    serializer = StatisticListSerializer(statistic)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CourseListSerializer(many=True)})
@api_view(['GET'])
@permission_required('attendiApp.view_course', raise_exception=True)
def courses_list(request):
    course = Course.objects.all()
    serializer = CourseListSerializer(course, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['POST'])
@permission_required('attendiApp.add_course', raise_exception=True)
def course_form_create(request):
    serializer = CourseFormSerializer(data=request.data)
    if serializer.is_valid():
        savedobject = serializer.save()
        create_statistic(savedobject.pk)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['PUT'])
@permission_required('attendiApp.change_course', raise_exception=True)
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
@permission_required('attendiApp.view_course', raise_exception=True)
def course_form_get(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)

    serializer = CourseFormSerializer(course)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('attendiApp.delete_course', raise_exception=True)
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
@permission_required('attendiApp.view_coursesession', raise_exception=True)
def course_sessions_list(request, group=''):
    current_date = date.today()
    if group == '':
        course_sessions = CourseSession.objects.all().order_by('date', 'start_time').exclude(date__lt=current_date)
    else:
        course_sessions = CourseSession.objects.filter(student_group=group).order_by('date', 'start_time').exclude(
            date__lt=current_date)
    serializer = CourseSessionListSerializer(course_sessions, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CourseSessionFormSerializer,
                     responses={200: CourseSessionFormSerializer()})
@api_view(['POST'])
@permission_required('attendiApp.add_coursesession', raise_exception=True)
def coursesession_form_create(request):
    serializer = CourseSessionFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer_data = serializer.save()
        # Get Student Group and create Attendance item
        student_group = serializer_data.student_group
        course_session_id = serializer_data.pk
        # logging.warning('studentgroupDEBUG: %s' % student_group)
        # logging.warning('sessionId courseDEBUG: %s' % course_session_id)
        create_attendance_item(student_group, course_session_id)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CourseSessionFormSerializer,
                     responses={200: CourseSessionFormSerializer()})
@api_view(['PUT'])
@permission_required('attendiApp.change_coursesession', raise_exception=True)
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
@permission_required('attendiApp.view_coursesession', raise_exception=True)
def coursesession_form_get(request, pk):
    try:
        coursesession = CourseSession.objects.get(pk=pk)
    except CourseSession.DoesNotExist:
        return Response({'error': 'Coursesession does not exist.'}, status=404)

    serializer = CourseSessionFormSerializer(coursesession)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('attendiApp.delete_coursesession', raise_exception=True)
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
@permission_required('attendiApp.add_profile', raise_exception=True)
def profile_form_create(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: ProfileSerializer()})
@api_view(['GET'])
@permission_required('attendiApp.view_profile', raise_exception=True)
def profile_form_get(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@swagger_auto_schema(method='PUT', request_body=ProfileSerializer, responses={200: ProfileSerializer()})
@api_view(['PUT'])
@permission_required('attendiApp.change_profile', raise_exception=True)
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
@permission_required('auth.view_user', raise_exception=True)
def users_list(request):
    users = User.objects.all()
    serializer = UserListSerializer(users, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=UserFormSerializer, responses={200: UserFormSerializer()})
@api_view(['POST'])
@permission_required('auth.add_user', raise_exception=True)
def user_form_create(request):
    serializer = UserFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=UserFormSerializer, responses={200: UserFormSerializer()})
@api_view(['PUT'])
@permission_required('auth.change_user', raise_exception=True)
def user_form_update(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserFormSerializer(user, data=request.data)
    if serializer.is_valid():
        if serializer.validated_data['password'] == "noChange":
            serializer.validated_data['password'] = user.password
        else:
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: UserListSerializer()})
@api_view(['GET'])
@permission_required('auth.view_user', raise_exception=True)
def user_form_get(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserFormSerializer(user)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('attendiApp.delete_user', raise_exception=True)
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
@permission_required('attendiApp.view_attendanceitem', raise_exception=True)
def attendance_item_list(request, pk):
    user = User.objects.get(pk=pk)
    current_date = date.today()
    if user.groups == [1]:
        items = AttendanceItem.objects.all().order_by('course_session__date', 'course_session__start_time')
    else:
        items = AttendanceItem.objects.filter(student=user).exclude(course_session__date__lt=current_date).order_by('course_session__date', 'course_session__start_time')
    serializer = AttendanceItemSerializer(items, many=True)
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
@permission_required('attendiApp.view_media', raise_exception=True)
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Media does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
@permission_required('attendiApp.view_media', raise_exception=True)
def user_find_by_username(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    serializer = UserIdSerializer(user)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: GroupSerializer()})
@api_view(['GET'])
@permission_required('auth.view_group')
def group_option_list(request):
    group = Group.objects.all()
    serializer = GroupSerializer(group, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AttendanceItemSerializer()})
@api_view(['GET'])
def attendance_item_get(request, pk):
    attendance_item = AttendanceItem.objects.get(pk=pk)
    serializer = AttendanceItemSerializer(attendance_item)
    return Response(serializer.data)


@swagger_auto_schema(method='PUT', request_body=AttendanceItemSerializer, responses={200: AttendanceItemSerializer()})
@api_view(['PUT'])
@permission_required('attendiApp.change_coursesession', raise_exception=True)
def attendance_item_update(request, pk):
    try:
        attendance_item = AttendanceItem.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'AttendanceItem does not exist.'}, status=404)

    serializer = AttendanceItemSerializer(attendance_item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)