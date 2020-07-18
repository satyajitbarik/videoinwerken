from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

#from user_profile.views import UserViewSet, EmployeeViewSet, UserProfileViewSet
from users.views import CustomUserViewSet, EmployeeViewSet, MyEmployeeViewSet
from videoinwerken_employee.views import EmployeeCourseView
from videoinwerken_manager.views import CourseView, CourseViewMyCourses, CourseQuestionView, CourseQuestionAnswerView

router = routers.DefaultRouter()
#router.register('accounts', UserViewSet)
#router.register('accountsprofile', UserProfileViewSet)
router.register('customusers', CustomUserViewSet)
router.register('manager/myemployees', MyEmployeeViewSet)
router.register('manager/employees', EmployeeViewSet)

router.register('manager/mycourses', CourseViewMyCourses) # list courses of manager
router.register('manager/courses', CourseView) # add/update/delete courses
router.register('manager/course/questions', CourseQuestionView)
router.register('manager/course/question/answers', CourseQuestionAnswerView)

#employees
router.register('employee/courses', EmployeeCourseView)

urlpatterns = [
    path('admin/', admin.site.urls),

    # This is used for user reset password
    path('', include('django.contrib.auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),

    path('api/',  include(router.urls)),
]