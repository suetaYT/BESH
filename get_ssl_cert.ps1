# Остановить контейнеры, если они запущены
Write-Host "Stopping all services..."
docker-compose down

# Создать необходимые директории для certbot
Write-Host "Creating directories for certbot..."
New-Item -Path ./certbot/conf -ItemType Directory -Force
New-Item -Path ./certbot/www -ItemType Directory -Force

# Запустить только nginx для валидации домена
Write-Host "Starting nginx for domain validation..."
docker-compose up -d frontend

# Даем nginx несколько секунд на запуск
Write-Host "Waiting for nginx to start..."
Start-Sleep -Seconds 5

# Запросить сертификат
Write-Host "Requesting SSL certificate..."
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot `
  --email minaumov02.17@yandex.ru -d шеш-беш.рф -d xn--e1afchk6c7d.xn--p1ai --agree-tos --no-eff-email

# Перезапустить все сервисы
Write-Host "Restarting all services..."
docker-compose down
docker-compose up -d

Write-Host "SSL certificate installation completed. Your site should now be available at https://шеш-беш.рф" 