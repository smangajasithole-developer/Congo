import resend

from django.conf import settings

resend.api_key = settings.RESEND_API_KEY

response = resend.Emails.send(
    {
        "from": "onboarding@resend.dev",
        "to": "djcongosa@gmail.com",
        "subject": "Django + Resend Test",
        "html": """
        <h2>Congratulations!</h2>

        <p>
            Your Django project is now connected to Resend.
        </p>
        """
    }
)

print(response)