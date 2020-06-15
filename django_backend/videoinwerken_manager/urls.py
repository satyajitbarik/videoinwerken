from django.urls import path

from . import views

urlpatterns = [
    path('courses/', views.ListAllCourses.as_view()), #also used for create
    path('courses/<int:id>/', views.DetailCourse.as_view()),
]