from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class Venue(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=20)
    zipcode = models.IntegerField()
    street_address = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Event(models.Model):
    venue = models.ForeignKey(
        Venue, on_delete=models.CASCADE, related_name='events')
    name=models.CharField(max_length=75)
    type = models.BooleanField()
    date = models.DateField()
    time = models.TimeField()
    description=models.TextField()
    performers = ArrayField(models.CharField(max_length=25))
    img_url=models.TextField()

    def __str__(self):
        return self.name


class Review(models.Model):
    venue = models.ForeignKey(
        Venue, on_delete=models.CASCADE, related_name='reviews')
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='reviews')
    title=models.CharField(max_length=100)
    text = models.TextField()
    rating = models.IntegerField(validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])

    def __str__(self):
        return self.title
