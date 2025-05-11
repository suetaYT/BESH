# Build stage
FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL configuration (будет использована после получения сертификатов)
COPY ssl.conf /etc/nginx/ssl.conf.template

# Создадим скрипт для проверки наличия сертификатов
RUN echo '#!/bin/sh\n\
if [ -f /etc/letsencrypt/live/шеш-беш.рф/fullchain.pem ] && [ -f /etc/letsencrypt/live/шеш-беш.рф/privkey.pem ]; then\n\
  echo "SSL certificates found, enabling HTTPS"\n\
  cp /etc/nginx/ssl.conf.template /etc/nginx/conf.d/ssl.conf\n\
else\n\
  echo "SSL certificates not found, running in HTTP-only mode"\n\
  rm -f /etc/nginx/conf.d/ssl.conf\n\
fi\n\
\n\
exec nginx -g "daemon off;"\n' > /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh

EXPOSE 80 443

CMD ["/docker-entrypoint.sh"] 