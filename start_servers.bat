@echo off
echo Starting Django and React servers...

:: Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

:: Start Django server in a new command prompt window
echo Starting Django server...
start cmd /k "cd backend && python manage.py runserver"

:: Start React server in a new command prompt window
echo Starting React frontend...
start cmd /k "cd frontend && npm start"

echo Both servers are starting. Check the new command prompt windows for details.
echo Django server: http://localhost:8000
echo React frontend: http://localhost:3000 