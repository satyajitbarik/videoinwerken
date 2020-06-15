from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^', views.ListUsers.as_view()),
    #url(r'^create/', views.CreateUser.as_view()),
    url(r'^<int:pk>/', views.DetailUser.as_view()),
]
