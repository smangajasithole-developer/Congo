from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'place_name',
        'rating',
        'approved',
        'created_at'
    )

    list_filter = (
        'approved',
        'rating'
    )

    search_fields = (
        'name',
        'place_name',
        'description'
    )