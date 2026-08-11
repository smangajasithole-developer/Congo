from django.db import models
from django.core.signing import TimestampSigner

signer = TimestampSigner()


class Testimonial(models.Model):

    STAR_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=100)

    place_name = models.CharField(
        max_length=150,
        blank=True
    )

    description = models.TextField()

    rating = models.IntegerField(
        choices=STAR_CHOICES,
        default=5
    )

    approved = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    @property
    def approval_token(self):
        return signer.sign(str(self.id))

    def __str__(self):
        return self.name