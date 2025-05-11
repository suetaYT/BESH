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
Start-Sleep -Seconds 10

# Запросить сертификат (домены указываются без портов)
Write-Host "Requesting SSL certificate..."
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot `
  --email minaumov02.17@yandex.ru -d xn----btbkc5gbd.xn--p1ai --agree-tos --no-eff-email

# Перезапустить все сервисы для применения SSL
Write-Host "Restarting all services to apply SSL configuration..."
docker-compose down
docker-compose up -d

Write-Host "SSL certificate installation completed."
Write-Host "Your site should now be available at:"
Write-Host "http://xn----btbkc5gbd.xn--p1ai"
Write-Host "https://xn----btbkc5gbd.xn--p1ai (if certificate was successfully obtained)" 