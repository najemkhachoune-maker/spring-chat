@echo off
echo ========================================
echo   Git Installation Helper
echo ========================================
echo.
echo This script will help you install Git.
echo.
echo OPTION 1: Install via Chocolatey
echo   - Best if you already installed Chocolatey
echo.
echo OPTION 2: Manual Download
echo   - Opens the official download page
echo.
echo ========================================
echo.

:menu
echo Please choose an option:
echo.
echo 1. Install Git using Chocolatey
echo 2. Open Git download page
echo 3. Check if Git is installed
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto install_choco
if "%choice%"=="2" goto manual_install
if "%choice%"=="3" goto check_install
if "%choice%"=="4" goto end

echo Invalid choice. Please try again.
echo.
goto menu

:install_choco
echo.
echo ========================================
echo   Installing Git via Chocolatey
echo ========================================
echo.
echo This requires Administrator privileges.
echo A new PowerShell window will open.
echo.
pause

powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit', '-Command', 'choco install git -y; Write-Host \"`nGit installed! Press any key to close...\" -ForegroundColor Green; Read-Host'"

echo.
echo If the installation was successful, please CLOSE this window
echo and open a NEW terminal to use Git.
echo.
pause
goto end

:manual_install
echo.
echo Opening https://git-scm.com/download/win ...
start https://git-scm.com/download/win
echo.
echo 1. Download the "64-bit Git for Windows Setup"
echo 2. Run the installer
echo 3. Click "Next" through all options (defaults are fine)
echo 4. Wait for installation to finish
echo.
pause
goto menu

:check_install
echo.
echo Checking for Git...
git --version 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Git is installed!
) else (
    echo [X] Git is NOT installed or not in PATH
)
echo.
pause
goto menu

:end
exit /b 0
