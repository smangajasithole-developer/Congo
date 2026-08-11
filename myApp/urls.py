from django.urls import path
from . import views


urlpatterns = [

    path(
        '',
        views.home,
        name='home'
    ),

    path(
        'reviews/approve/<int:testimonial_id>/<str:token>/',
        views.approve_review,
        name='approve_review'
    ),

    path(
        'reviews/reject/<int:testimonial_id>/<str:token>/',
        views.reject_review,
        name='reject_review'
    ),

]