from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListCourse.as_view()), #also used for create
    path('<int:pk>/', views.DetailCourse.as_view()),
]