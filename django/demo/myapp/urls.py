from django.urls import path
from . import views

urlpatterns = [
    path('', views.loading, name='loading'),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('universities/', views.universities, name='universities'),
    path('galerie/', views.universities, name='galerie'),
]