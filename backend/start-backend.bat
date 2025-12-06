@echo off
echo ========================================
echo   Chat App - Backend Server Startup
echo ========================================
echo.

cd /d "%~dp0"

echo Checking for Maven...
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    echo.
    pause
    exit /b 1
)

echo Checking for Java...
where java >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher from https://adoptium.net/
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

mvn spring-boot:run

pause
