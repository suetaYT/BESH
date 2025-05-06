import os
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Импорт модели после настройки Django
from api.models import TestCard

def create_test_cards():
    """Создает тестовые карточки в базе данных"""
    
    # Базовый URL для изображений (локальный путь)
    base_url = '/media/cards/'
    
    test_cards = [
        {
            'card_number': 1,
            'question': 'Сколько фишек приходится на кажого игрока?',
            'option_1': '10',
            'option_2': '12',
            'option_3': '15',
            'option_4': '20',
            'correct_answer': 3,
            'image_url': f'{base_url}card1.jpg'
        },
        {
            'card_number': 2,
            'question': 'В какую сторону двигаются фишки?',
            'option_1': 'Против часовой стрелки',
            'option_2': 'По часовой стрелке',
            'option_3': 'В зависимости от выпавших кубиков',
            'option_4': 'В любом направлении, по желанию игрока',
            'correct_answer': 1,
            'image_url': f'{base_url}card2.jpg'
        },
        {
            'card_number': 3,
            'question': 'Что нельзя делать ни в коем случае?',
            'option_1': 'Ходить четырьмя фишками за раз',
            'option_2': 'Снимать две фишки с головы',
            'option_3': 'Ставить шесть фишек в ряд',
            'option_4': 'Ставить фишку на клетку, где уже стоит фишка противника',
            'correct_answer': 4,
            'image_url': f'{base_url}card3.jpg'
        },
        {
            'card_number': 4,
            'question': 'Как называются части доски, откуда и куда двигаются фишки?',
            'option_1': 'Из дома на улицу',
            'option_2': 'Со двора в дом',
            'option_3': 'С разбега в карьер',
            'option_4': 'Из дома во двор',
            'correct_answer': 2,
            'image_url': f'{base_url}card4.jpg'
        },
        {
            'card_number': 5,
            'question': 'Какой размер имеет стандартная доска для шеш-беш?',
            'option_1': '15 на 15 клеток',
            'option_2': '24 клетки (треугольники)',
            'option_3': '8 на 8 клеток',
            'option_4': '64 клетки в форме ромба',
            'correct_answer': 2,
            'image_url': f'{base_url}card5.jpg'
        },
        {
            'card_number': 6,
            'question': 'Сколько кубиков используется в игре шеш-беш?',
            'option_1': 'Один',
            'option_2': 'Два',
            'option_3': 'Три',
            'option_4': 'Четыре',
            'correct_answer': 2,
            'image_url': f'{base_url}card6.jpg'
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
            print(f'Created test card #{card.card_number}')
        else:
            updated_count += 1
            print(f'Updated test card #{card.card_number}')
    
    print(f'Created {created_count} new test cards and updated {updated_count} existing ones.')
    
    # Проверка количества карточек в базе данных
    cards_count = TestCard.objects.count()
    print(f"Total cards in database: {cards_count}")
    
    # Вывод всех карточек для проверки
    all_cards = TestCard.objects.all()
    print("All cards in database:")
    for card in all_cards:
        print(f"Card #{card.card_number}: {card.question[:30]}... | Image URL: {card.image_url}")

if __name__ == '__main__':
    print('Creating test cards...')
    create_test_cards()
    print('Done!') 