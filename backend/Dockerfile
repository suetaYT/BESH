FROM python:3.9-slim

WORKDIR /app

# Define build arguments
ARG INSTALL_IMAGEMAGICK=false

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-traditional \
    curl \
    && if [ "$INSTALL_IMAGEMAGICK" = "true" ] ; then \
       apt-get install -y imagemagick ; \
    fi \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create media directories
RUN mkdir -p /app/media/cards

# Create sample images for cards if they don't exist
RUN if [ "$INSTALL_IMAGEMAGICK" = "true" ] ; then \
    for i in $(seq 1 6); do \
      if [ ! -f /app/media/cards/card$i.jpg ]; then \
        echo "Creating placeholder for card$i.jpg"; \
        convert -size 400x200 -background lightblue -fill blue \
        -pointsize 24 -gravity center label:"Карточка $i" \
        /app/media/cards/card$i.jpg; \
      fi; \
    done; \
    else \
      echo "ImageMagick not installed, using placeholder URLs instead"; \
    fi

# Create a non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings

# Create static directory and collect static files
RUN mkdir -p static && \
    python manage.py collectstatic --noinput || true

# Create startup script
RUN echo '#!/bin/sh\n\
echo "Waiting for database..."\n\
host=${DATABASE_URL##*@}\n\
host=${host%%/*}\n\
db_host=${host%%:*}\n\
db_port=${host##*:}\n\
\n\
echo "Waiting for database at $db_host:$db_port..."\n\
while ! nc -z $db_host $db_port; do\n\
  sleep 1\n\
  echo "Still waiting for database..."\n\
done\n\
echo "Database is up!"\n\
\n\
echo "Running migrations..."\n\
python manage.py migrate\n\
\n\
echo "Creating test cards..."\n\
python create_cards.py\n\
\n\
echo "Starting Gunicorn..."\n\
exec gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 config.wsgi:application\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8000

# Use the startup script
CMD ["/app/start.sh"] 