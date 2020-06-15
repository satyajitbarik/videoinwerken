from django.urls import path, include
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()
#router.register(r'user', UserViewSet,)

urlpatterns = [
    path('admin/', admin.site.urls),

    # This is used for user reset password
    path('', include('django.contrib.auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('api/',  include(router.urls)),

    path('accounts/', include('user_profile.urls')),

    path('courses/', include('videoinwerken_manager.urls')),

]