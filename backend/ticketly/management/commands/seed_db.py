from django.core.management.base import BaseCommand
from django.contrib.postgres.fields import ArrayField
from faker import Faker
import random 
from ticketly.models import Venue, Event, Review

class Command(BaseCommand):
    help = 'Seed database with random data'

    def add_arguments(self, parser):
        parser.add_argument('-n', '--number', type=int, default=10, help='Number of each model to create')

    def handle(self, *args, **options):
        number = options['number']
        fake = Faker()

        for _ in range(number):
            Venue.objects.create(
                name = fake.company(),
                city = fake.city(),
                state = fake.state(),
                zipcode = fake.random_int(min=10000, max=99999),
                street_address = fake.street_address()
            )

        venues = Venue.objects.all()

        for _ in range(number):
            Event.objects.create(
            venue=random.choice(venues),
            name=fake.catch_phrase(),
            type=fake.boolean(),
            date=fake.date_between(start_date='today', end_date='+1y'),
            time=fake.time(),
            description=fake.text(max_nb_chars=200),
            performers=[fake.first_name() for _ in range(random.randint(1, 10))],  # Assuming performers is an ArrayField
            img_url=fake.image_url()
            )


        events = Event.objects.all()

        for _ in range(number):
            Review.objects.create(
                venue = random.choice(venues),
                event = random.choice(events),
                title = fake.sentence(),
                text = fake.text(max_nb_chars=500),
                rating = random. randint(0, 5)
            )

            self.stdout.write(self.style.SUCCESS(f'Successfully seeded the database with {number} venues, events, and reviews.'))