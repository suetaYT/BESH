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
                'image_url': '/boardimg2.jpg'
            },
            {
                'card_number': 2,
                'question': 'В какую сторону двигаются фишки?',
                'option_1': 'Против часовой стрелки',
                'option_2': 'По часовой стрелке',
                'option_3': 'В зависимости от выпавших кубиков',
                'option_4': 'В любом направлении, по желанию игрока',
                'correct_answer': 1,
                'image_url': '/boardimg2.jpg'
            },
            {
                'card_number': 3,
                'question': 'Что нельзя делать ни в коем случае?',
                'option_1': 'Ходить четырьмя фишками за раз',
                'option_2': 'Снимать две фишки с головы',
                'option_3': 'Ставить шесть фишек в ряд',
                'option_4': 'Ставить фишку на клетку, где уже стоит фишка противника',
                'correct_answer': 4,
                'image_url': '/boardimg2.jpg'
            },
            {
                'card_number': 4,
                'question': 'Как называются части доски, откуда и куда двигаются фишки?',
                'option_1': 'Из дома на улицу',
                'option_2': 'Со двора в дом',
                'option_3': 'С разбега в карьер',
                'option_4': 'Из дома во двор',
                'correct_answer': 2,
                'image_url': '/boardimg2.jpg'
            },
            {
                'card_number': 5,
                'question': 'Кто из игроков может начать вывод фишек при такой ситуации?',
                'option_1': 'Только белые',
                'option_2': 'Только черные',
                'option_3': 'Оба игрока',
                'option_4': 'Никто',
                'correct_answer': 1,
                'image_url': '/boardimgrules13.jpg'
            },
            {
                'card_number': 6,
                'question': 'Что происходит при выпадании игроку двух одинаковых кубиков?',
                'option_1': 'Игрок пропускает ход',
                'option_2': 'Игрок ходит только один из этих кубиков',
                'option_3': 'Игрок ходит выпавшие кубики дважды',
                'option_4': 'Не происходит ничего, обычный ход',
                'correct_answer': 3,
                'image_url': '/boardimgrules9.jpg'
            }
        ]
        
        created_count = 0
        updated_count = 0
        
        for card_data in test_cards:
            # Check if the card already exists
            print(f"Processing card #{card_data['card_number']} with image_url: {card_data['image_url']}")
            card, created = TestCard.objects.update_or_create(
                card_number=card_data['card_number'],
                defaults=card_data
            )
            
            if created:
                created_count += 1
                print(f"Created new card #{card.card_number} with image_url: {card.image_url}")
            else:
                updated_count += 1
                print(f"Updated card #{card.card_number} with image_url: {card.image_url}")
            
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