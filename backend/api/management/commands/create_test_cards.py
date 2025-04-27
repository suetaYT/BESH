from django.core.management.base import BaseCommand
from api.models import TestCard

class Command(BaseCommand):
    help = 'Creates initial test cards for the application'

    def handle(self, *args, **options):
        test_cards = [
            {
                'card_number': 1,
                'question': 'What is the primary purpose of the useState hook in React?',
                'option_1': 'To persist data between renders',
                'option_2': 'To fetch data from an API',
                'option_3': 'To create global state accessible throughout the app',
                'option_4': 'To optimize rendering performance',
                'correct_answer': 1,
                'image_url': 'https://via.placeholder.com/400x200?text=React+Hooks'
            },
            {
                'card_number': 2,
                'question': 'Which of the following is NOT a core principle of REST API design?',
                'option_1': 'Statelessness',
                'option_2': 'Client-server architecture',
                'option_3': 'Cacheability',
                'option_4': 'Real-time updates',
                'correct_answer': 4,
                'image_url': 'https://via.placeholder.com/400x200?text=REST+API'
            },
            {
                'card_number': 3,
                'question': 'What does the "V" in MVC stand for?',
                'option_1': 'Verification',
                'option_2': 'Virtual',
                'option_3': 'View',
                'option_4': 'Validation',
                'correct_answer': 3,
                'image_url': 'https://via.placeholder.com/400x200?text=MVC+Architecture'
            },
            {
                'card_number': 4,
                'question': 'Which of the following is a benefit of using PostgreSQL over SQLite?',
                'option_1': 'Simpler setup',
                'option_2': 'Better performance for large datasets',
                'option_3': 'No installation required',
                'option_4': 'Smaller file size',
                'correct_answer': 2,
                'image_url': 'https://via.placeholder.com/400x200?text=Database+Systems'
            }
        ]
        
        created_count = 0
        updated_count = 0
        
        for card_data in test_cards:
            # Check if the card already exists
            card, created = TestCard.objects.update_or_create(
                card_number=card_data['card_number'],
                defaults=card_data
            )
            
            if created:
                created_count += 1
            else:
                updated_count += 1
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully {"created" if created else "updated"} test card #{card.card_number}'
                )
            )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Created {created_count} new test cards and updated {updated_count} existing ones.'
            )
        ) 