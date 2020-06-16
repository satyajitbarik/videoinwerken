from django.urls import path, include
from django.contrib import admin
from rest_framework import routers

from user_profile.views import UserViewSet
from videoinwerken_manager.views import CourseViewSet

router = routers.DefaultRouter()
router.register('accounts', UserViewSet)
router.register('manager/courses', CourseViewSet, base_name="CourseView")

urlpatterns = [
    path('admin/', admin.site.urls),

    # This is used for user reset password
    path('', include('django.contrib.auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),

    path('api/',  include(router.urls)),

    #path('accounts/', include(router.urls)),

    #path('manager/', include('videoinwerken_manager.urls')),
    #path('abc/', include(router.urls)),

]