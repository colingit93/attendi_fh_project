from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from .views import FileUploadView
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('statistic/list', views.statistic_list),
    path('course/list', views.courses_list),
    path('course/create', views.course_form_create),
    path('course/<int:pk>/get', views.course_form_get),
    path('course/<int:pk>/update', views.course_form_update),
    path('course/<int:pk>/delete', views.course_delete),
    path('course/options', views.course_option_list),
    path('course_session/list', views.course_sessions_list),
    path('course_session/create', views.course_session_form_create),
    path('course_session/<int:pk>/get', views.course_session_form_get),
    path('course_session/<int:pk>/update', views.course_session_form_update),
    path('course_session/<int:pk>/delete', views.course_session_delete),
    path('course_session/options', views.course_session_option_list),
    path('user/list', views.users_list),
    path('user/create', views.user_form_create),
    path('user/<int:pk>/get', views.user_form_get),
    path('user/<int:pk>/update', views.user_form_update),
    path('user/<int:pk>/delete', views.user_delete),
    path('user/options', views.user_option_list),
    path('profile/create', views.profile_form_create),
    path('attendance_item/list', views.attendance_item_list),
    path('attendance_item/options', views.attendance_item_option_list),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
