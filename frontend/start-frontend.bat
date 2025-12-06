@echo off
echo ========================================
echo   Chat App - Frontend Server Startup
echo ========================================
echo.

cd /d "%~dp0"

echo Checking for Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Checking for npm...
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed or not in PATH
    echo.
    pause
    exit /b 1
)

echo.
echo Installing dependencies (if needed)...
if not exist "node_modules\" (
    echo Running npm install...
    call npm install
)

echo.
echo Starting Vite development server...
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
