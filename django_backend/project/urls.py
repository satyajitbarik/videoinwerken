from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

#from user_profile.views import UserViewSet, EmployeeViewSet, UserProfileViewSet
from users.views import CustomUserViewSet, EmployeeViewSet
from videoinwerken_manager.views import CourseView, CourseViewMyCourses

router = routers.DefaultRouter()
#router.register('accounts', UserViewSet)
#router.register('accountsprofile', UserProfileViewSet)
router.register('customusers', CustomUserViewSet)
router.register('manager/employees', EmployeeViewSet)
router.register('manager/mycourses', CourseViewMyCourses)
router.register('manager/courses', CourseView)
#router.register('manager/coursesviewall', CourseViewAll, base_name="CourseViewAll")


urlpatterns = [
    path('admin/', admin.site.urls),

    # This is used for user reset password
    path('', include('django.contrib.auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),

    path('api/',  include(router.urls)),
]