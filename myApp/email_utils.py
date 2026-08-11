from django.conf import settings
from django.urls import reverse

import resend


resend.api_key = settings.RESEND_API_KEY


def send_review_notification(testimonial):

    approve_url = (
        f"{settings.SITE_URL}"
        f"{reverse(
            'approve_review',
            args=[
                testimonial.id,
                testimonial.approval_token
            ]
        )}"
    )


    reject_url = (
        f"{settings.SITE_URL}"
        f"{reverse(
            'reject_review',
            args=[
                testimonial.id,
                testimonial.approval_token
            ]
        )}"
    )


    html = f"""
    <h2>New Testimonial Submitted</h2>

    <p>
        A new review has been submitted on the Congo website.
    </p>

    <hr>

    <p>
        <strong>Name:</strong><br>
        {testimonial.name}
    </p>

    <p>
        <strong>Venue / Company:</strong><br>
        {testimonial.place_name or "Not provided"}
    </p>

    <p>
        <strong>Rating:</strong><br>
        {'⭐' * testimonial.rating}
    </p>

    <p>
        <strong>Review:</strong><br>
        {testimonial.description}
    </p>

    <hr>

    <p>

        <a
            href="{approve_url}"
            style="
                background:#28a745;
                color:#ffffff;
                padding:12px 22px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
                margin-right:10px;
            "
        >
            ✅ Approve Review
        </a>


        <a
            href="{reject_url}"
            style="
                background:#dc3545;
                color:#ffffff;
                padding:12px 22px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
            "
        >
            ❌ Reject Review
        </a>

    </p>
    """


    # ==========================================
    # SEND EMAIL THROUGH RESEND
    # ==========================================

    try:

        response = resend.Emails.send(
            {
                "from": "onboarding@resend.dev",
                "to": settings.OWNER_EMAIL,
                "subject": "New Congo Website Testimonial",
                "html": html,
            }
        )

        print("==========================================")
        print("RESEND EMAIL RESPONSE:")
        print(response)
        print("==========================================")


    except Exception as e:

        print("==========================================")
        print("RESEND EMAIL ERROR:")
        print(e)
        print("==========================================")

        raise