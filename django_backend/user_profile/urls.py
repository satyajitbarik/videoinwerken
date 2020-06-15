from django.conf.urls import include, url
from django.urls import path

from . import views

urlpatterns = [
    url(r'^ff', views.ListUsers.as_view()),
    #url(r'^create/', views.CreateUser.as_view()), not needed because this can be done with list
    url(r'^<int:pk>/', views.DetailUser.as_view()),

    path(r'^posts/<int:pk>/$', views.DetailUser.as_view()),

    url(r'^gg', views.UserViewSet),
]
