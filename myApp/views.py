from django.shortcuts import (
    render,
    redirect,
    get_object_or_404
)

from django.http import HttpResponse
from django.contrib import messages

from .models import Testimonial, signer
from .email_utils import send_review_notification

from django.core.signing import BadSignature


def home(request):

    # ==========================================
    # APPROVED TESTIMONIALS
    # ==========================================

    testimonials = Testimonial.objects.filter(
        approved=True
    ).order_by('-created_at')


    # ==========================================
    # REVIEW FORM SUBMISSION
    # ==========================================

    if request.method == 'POST':

        # ==========================================
        # GET FORM DATA
        # ==========================================

        name = request.POST.get('name', '').strip()
        place_name = request.POST.get('place_name', '').strip()
        description = request.POST.get('description', '').strip()
        rating = request.POST.get('rating', '').strip()


        # ==========================================
        # FUNCTION TO RETURN FORM WITH ERROR
        # ==========================================

        def review_error(message):

            messages.error(
                request,
                message
            )

            context = {
                'testimonials': testimonials,

                # Preserve everything the user entered
                'review_name': name,
                'review_place_name': place_name,
                'review_description': description,
                'review_rating': rating,
            }

            return render(
                request,
                'myApp/home.html',
                context
            )


        # ==========================================
        # NAME VALIDATION
        # ==========================================

        if not name:

            return review_error(
                "Please enter your name."
            )


        if len(name) < 2:

            return review_error(
                "Name not accepted. Please enter a name with at least 2 characters."
            )


        if len(name) > 100:

            return review_error(
                "Name not accepted. Your name is too long."
            )


        # Name must contain at least one letter

        if not any(character.isalpha() for character in name):

            return review_error(
                "Name not accepted. Please enter a name using letters."
            )


        # Name cannot contain numbers

        if any(character.isdigit() for character in name):

            return review_error(
                "Name not accepted. Numbers are not allowed in the name field."
            )


        # Allow only letters, spaces, apostrophes,
        # hyphens and periods

        allowed_name_characters = " '-."

        if any(
            not character.isalpha()
            and character not in allowed_name_characters
            for character in name
        ):

            return review_error(
                "Name not accepted. Please use letters, spaces, apostrophes, hyphens or periods only."
            )


        # ==========================================
        # RATING VALIDATION
        # ==========================================

        try:

            rating_number = int(rating)

        except (TypeError, ValueError):

            return review_error(
                "Please select a valid rating."
            )


        if rating_number not in [1, 2, 3, 4, 5]:

            return review_error(
                "Please select a rating between 1 and 5 stars."
            )


        # ==========================================
        # REVIEW VALIDATION
        # ==========================================

        if not description:

            return review_error(
                "Please enter your review."
            )


        if len(description) < 5:

            return review_error(
                "Your review is too short."
            )


        # ==========================================
        # CREATE TESTIMONIAL
        # ==========================================

        testimonial = Testimonial.objects.create(
            name=name,
            place_name=place_name,
            description=description,
            rating=rating_number,
            approved=False,
            status='pending',
        )


        # ==========================================
        # SEND APPROVAL EMAIL
        # ==========================================

        send_review_notification(testimonial)


        # ==========================================
        # SUCCESS MESSAGE
        # ==========================================

        messages.success(
            request,
            "Thank you for taking your time to review our work. "
            "Your testimony has been submitted successfully "
            "and will appear after approval."
        )


        # ==========================================
        # SUCCESSFUL SUBMISSION
        # ==========================================

        return redirect('home')


    # ==========================================
    # NORMAL PAGE LOAD
    # ==========================================

    context = {
        'testimonials': testimonials
    }


    return render(
        request,
        'myApp/home.html',
        context
    )


def approve_review(request, testimonial_id, token):

    testimonial = get_object_or_404(
        Testimonial,
        id=testimonial_id
    )


    try:

        signed_id = signer.unsign(token)

    except BadSignature:

        return render(
            request,
            'myApp/review_invalid.html',
            status=403
        )


    if signed_id != str(testimonial.id):

        return render(
            request,
            'myApp/review_invalid.html',
            status=403
        )


    if testimonial.status != 'pending':

        return render(
            request,
            'myApp/review_already_processed.html'
        )


    testimonial.approved = True
    testimonial.status = 'approved'

    testimonial.save()


    return render(
        request,
        'myApp/review_approved.html'
    )


def reject_review(request, testimonial_id, token):

    testimonial = get_object_or_404(
        Testimonial,
        id=testimonial_id
    )


    try:

        signed_id = signer.unsign(token)

    except BadSignature:

        return render(
            request,
            'myApp/review_invalid.html',
            status=403
        )


    if signed_id != str(testimonial.id):

        return render(
            request,
            'myApp/review_invalid.html',
            status=403
        )


    if testimonial.status != 'pending':

        return render(
            request,
            'myApp/review_already_processed.html'
        )


    testimonial.approved = False
    testimonial.status = 'rejected'

    testimonial.save()


    return render(
        request,
        'myApp/review_rejected.html'
    )