from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListUsers.as_view()),
    path('<int:pk>/', views.DetailUser.as_view()), #view/edit

    #path('gg', views.UserViewSet),
]
