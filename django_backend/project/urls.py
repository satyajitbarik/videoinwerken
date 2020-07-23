from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

#from user_profile.views import UserViewSet, EmployeeViewSet, UserProfileViewSet
from users.views import CustomUserViewSet, EmployeeViewSet, MyEmployeeViewSet, Employers
from videoinwerken_employee.models import EmployeeQuestion
from videoinwerken_employee.views import EmployeeCourseView, EmployeeQuestionView, EmployeeCourseQuestionsView, \
    EmployeeQuestionsCourse
from videoinwerken_manager.views import CourseView, CourseViewMyCourses, CourseQuestionView, CourseQuestionAnswerView

router = routers.DefaultRouter()
#router.register('accounts', UserViewSet)
#router.register('accountsprofile', UserProfileViewSet)
router.register('customusers', CustomUserViewSet)
router.register('manager/myemployees', MyEmployeeViewSet)
router.register('manager/employees', EmployeeViewSet)

router.register('employers', Employers)

router.register('manager/mycourses', CourseViewMyCourses) # list courses of manager
router.register('manager/courses', CourseView) # add/update/delete courses
router.register('manager/course/questions', CourseQuestionView)
router.register('manager/course/question/answers', CourseQuestionAnswerView)

# employee-questions pairs for course_id and employee
router.register('employee/employeequestionscourse', EmployeeQuestionsCourse)

#employees
router.register('employee/courses', EmployeeCourseView)

# Get course-questions pairs for an employee
router.register('employee/coursequestions', EmployeeCourseQuestionsView)

# Employee question record, use to see if attempted/passed the question
router.register('employee/employeequestion', EmployeeQuestionView)

urlpatterns = [
    path('admin/', admin.site.urls),

    # This is used for user reset password
    path('', include('django.contrib.auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),

    path('api/',  include(router.urls)),
]