from django.db import models # type: ignore

class LaundryOrder(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    pickup_date = models.DateField()
    frequency = models.CharField(
        max_length=20,
        choices=[
            ('one-time', 'One-Time'),
            ('weekly', 'Weekly'),
            ('bi-weekly', 'Bi-Weekly'),
            ('monthly', 'Monthly'),
        ]
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.pickup_date}"
