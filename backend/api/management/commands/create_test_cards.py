from django.core.management.base import BaseCommand
from api.models import TestCard

class Command(BaseCommand):
    help = 'Creates initial test cards for the application'

    def handle(self, *args, **options):
        test_cards = [
            {
                'card_number': 1,
                'question': 'Сколько фишек приходится на кажого игрока?',
                'option_1': '10',
                'option_2': '12',
                'option_3': '15',
                'option_4': '20',
                'correct_answer': 3,
                'image_url': 'https://via.placeholder.com/400x200?text=React+Hooks'
            },
            {
                'card_number': 2,
                'question': 'В какую сторону двигаются фишки?',
                'option_1': 'Против часовой стрелки',
                'option_2': 'По часовой стрелке',
                'option_3': 'В зависимости от выпавших кубиков',
                'option_4': 'В любом направлении, по желанию игрока',
                'correct_answer': 1,
                'image_url': 'https://via.placeholder.com/400x200?text=REST+API'
            },
            {
                'card_number': 3,
                'question': 'Что нельзя делать ни в коем случае?',
                'option_1': 'Ходить четырьмя фишками за раз',
                'option_2': 'Снимать две фишки с головы',
                'option_3': 'Ставить шесть фишек в ряд',
                'option_4': 'Ставить фишку на клетку, где уже стоит фишка противника',
                'correct_answer': 4,
                'image_url': 'https://via.placeholder.com/400x200?text=MVC+Architecture'
            },
            {
                'card_number': 4,
                'question': 'Как называются части доски, откуда и куда двигаются фишки?',
                'option_1': 'Из дома на улицу',
                'option_2': 'Со двора в дом',
                'option_3': 'С разбега в карьер',
                'option_4': 'Из дома во двор',
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