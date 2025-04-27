# Fullstack Project with React and Django

A full-stack web application that uses React for the frontend, Django for the backend, and PostgreSQL as the database.

## Project Structure
- `frontend/`: React application
- `backend/`: Django application with REST API
- `venv/`: Python virtual environment

## Backend Setup

1. Activate virtual environment:
   ```
   # Windows
   .\venv\Scripts\Activate
   
   # Unix/MacOS
   source venv/bin/activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Configure PostgreSQL database in `backend/config/settings.py`

4. Run migrations:
   ```
   cd backend
   python manage.py migrate
   ```

5. Start the Django server:
   ```
   python manage.py runserver
   ```

## Frontend Setup

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Deployment

Instructions for deployment will be added later. 