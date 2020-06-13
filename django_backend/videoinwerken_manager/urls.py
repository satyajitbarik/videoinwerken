from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^', views.ListCourse.as_view()),
    #url(r'^<int:pk>/', views.DetailCourse.as_view()),
]
