#!/bin/bash
# Создаем директории для certbot
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Останавливаем существующие контейнеры
docker-compose down

# Запускаем только frontend для валидации
docker-compose up -d frontend

# Ждем запуска nginx
sleep 10

# Получаем сертификат с правильным punycode
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot \
  --email minaumov02.17@yandex.ru -d xn----btbkc5gbd.xn--p1ai --agree-tos --no-eff-email

# Перезапускаем все сервисы
docker-compose down
docker-compose up -d

echo "SSL certificate installed. Site should be available at https://xn----btbkc5gbd.xn--p1ai" 