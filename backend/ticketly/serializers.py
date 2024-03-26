from rest_framework import serializers
from .models import Venue, Event, Review

class VenueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Venue
        fields = ('id', 'name', 'city', 'state', 'zipcode', 'street_address')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    venue = VenueSerializer()

    class Meta:
        model = Event
        fields = ('id', 'venue', 'name', 'type', 'date', 'time', 'description', 'performers', 'img_url')

class ReviewEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name')

class ReviewVenueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Venue
        fields = ('id', 'name')

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    venue = ReviewVenueSerializer()
    event = ReviewEventSerializer()

    class Meta:
        model = Review
        fields = ('id', 'venue', 'event', 'title', 'text', 'rating')
