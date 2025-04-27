# PowerShell script to start both servers
Write-Host "Starting Django and React servers..." -ForegroundColor Green

# Create a function to check if a port is in use
function Test-TcpPort {
    param(
        [int]$Port
    )
    
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    try {
        $tcpClient.Connect("127.0.0.1", $Port)
        return $true
    }
    catch {
        return $false
    }
    finally {
        $tcpClient.Close()
    }
}

# Kill processes on ports if they're already in use
if (Test-TcpPort -Port 8000) {
    Write-Host "Port 8000 is in use. Attempting to free it..." -ForegroundColor Yellow
    $processes = netstat -ano | findstr :8000
    foreach ($process in $processes) {
        $pid = ($process -split ' ')[-1]
        if ($pid -match '^\d+$') {
            taskkill /PID $pid /F
        }
    }
}

if (Test-TcpPort -Port 3000) {
    Write-Host "Port 3000 is in use. Attempting to free it..." -ForegroundColor Yellow
    $processes = netstat -ano | findstr :3000
    foreach ($process in $processes) {
        $pid = ($process -split ' ')[-1]
        if ($pid -match '^\d+$') {
            taskkill /PID $pid /F
        }
    }
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Cyan
& "$PSScriptRoot\venv\Scripts\Activate.ps1"

# Start Django server in a new PowerShell window
Write-Host "Starting Django server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python manage.py runserver"

# Start React server in a new PowerShell window
Write-Host "Starting React frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"

Write-Host "Both servers are starting. Check the new PowerShell windows for details." -ForegroundColor Green
Write-Host "Django server: http://localhost:8000" -ForegroundColor Cyan
Write-Host "React frontend: http://localhost:3000" -ForegroundColor Cyan 