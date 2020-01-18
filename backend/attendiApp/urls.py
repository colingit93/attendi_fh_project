from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views
from .views import FileUploadView

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('statistic/list/<int:pk>', views.statistic_list),
    path('statistic/<int:pk>/get', views.statistic_form_get),
    path('course/list', views.courses_list),
    path('course/create', views.course_form_create),
    path('course/<int:pk>/get', views.course_form_get),
    path('course/<int:pk>/update', views.course_form_update),
    path('course/<int:pk>/delete', views.course_delete),
    path('course/options', views.course_option_list),
    path('coursesession/list', views.course_sessions_list),
    path('coursesession/<str:group>/list', views.course_sessions_list),
    path('coursesession/create', views.coursesession_form_create),
    path('coursesession/<int:pk>/get', views.coursesession_form_get),
    path('coursesession/<int:pk>/update', views.coursesession_form_update),
    path('coursesession/<int:pk>/delete', views.coursesession_delete),
    path('coursesession/options', views.coursesession_option_list),
    path('user/list', views.users_list),
    path('user/create', views.user_form_create),
    path('user/<int:pk>/get', views.user_form_get),
    path('user/<int:pk>/update', views.user_form_update),
    path('user/<int:pk>/delete', views.user_delete),
    path('user/options', views.user_option_list),
    path('userId/<str:username>/get', views.user_find_by_username),
    path('profile/create', views.profile_form_create),
    path('profile/<int:pk>/update', views.profile_form_update),
    path('profile/<int:pk>/get', views.profile_form_get),
    path('attendance_item/list', views.attendance_item_list),
    path('attendance_item/<int:pk>/list', views.attendance_item_list),
    path('attendance_item/<int:pk>/update', views.attendance_item_update),
    path('attendance_item/options', views.attendance_item_option_list),
    path('attendance_item/<int:pk>/get', views.attendance_item_get),
    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),
    path('group/options', views.group_option_list),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
]
