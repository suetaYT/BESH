FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create a non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings

# Create static directory and collect static files
RUN mkdir -p static && \
    python manage.py collectstatic --noinput || true

# Run migrations
RUN python manage.py migrate

EXPOSE 8000

# Use shell form to allow environment variable expansion
CMD gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 backend.wsgi:application 