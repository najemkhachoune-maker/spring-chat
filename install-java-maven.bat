@echo off
echo ========================================
echo   Java and Maven Installation Helper
echo ========================================
echo.
echo This script will help you install Java 17 and Maven.
echo.
echo OPTION 1: Install Chocolatey (Package Manager)
echo   - Easiest method
echo   - Automatically installs and configures everything
echo   - Recommended for beginners
echo.
echo OPTION 2: Manual Installation
echo   - Download and install manually
echo   - More control over installation
echo.
echo ========================================
echo.

:menu
echo Please choose an option:
echo.
echo 1. Install Chocolatey and then Java + Maven (Recommended)
echo 2. Open download pages for manual installation
echo 3. Check if Java and Maven are already installed
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
echo   Installing Chocolatey
echo ========================================
echo.
echo This requires Administrator privileges.
echo A new PowerShell window will open.
echo.
echo Please follow these steps in the PowerShell window:
echo 1. If prompted, type 'Y' to allow script execution
echo 2. Wait for Chocolatey to install
echo 3. Close the PowerShell window when done
echo 4. Come back to this window
echo.
pause

powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit', '-Command', 'Write-Host \"Installing Chocolatey...\" -ForegroundColor Green; Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\"https://community.chocolatey.org/install.ps1\")); Write-Host \"`nChocolatey installed! Now installing Java and Maven...\" -ForegroundColor Green; choco install openjdk17 maven -y; Write-Host \"`nInstallation complete! Press any key to close this window...\" -ForegroundColor Green; Read-Host'"

echo.
echo ========================================
echo Chocolatey, Java, and Maven should now be installed!
echo.
echo IMPORTANT: Close this window and open a NEW Command Prompt
echo to use Java and Maven.
echo ========================================
echo.
pause
goto end

:manual_install
echo.
echo ========================================
echo   Manual Installation
echo ========================================
echo.
echo Opening download pages in your browser...
echo.
echo 1. Java 17 (Adoptium Temurin)
start https://adoptium.net/temurin/releases/?version=17
timeout /t 2 /nobreak >nul

echo 2. Apache Maven
start https://maven.apache.org/download.cgi
timeout /t 2 /nobreak >nul

echo.
echo Download pages opened in your browser.
echo.
echo INSTALLATION STEPS:
echo.
echo FOR JAVA:
echo   1. Download the .msi installer (Windows x64)
echo   2. Run the installer
echo   3. Check "Add to PATH" during installation
echo   4. Complete the installation
echo.
echo FOR MAVEN:
echo   1. Download apache-maven-X.X.X-bin.zip
echo   2. Extract to C:\Program Files\Apache\maven
echo   3. Add to PATH: C:\Program Files\Apache\maven\apache-maven-X.X.X\bin
echo.
echo For detailed instructions, see: INSTALL_JAVA_MAVEN.md
echo.
pause
goto menu

:check_install
echo.
echo ========================================
echo   Checking Installations
echo ========================================
echo.

echo Checking Java...
java -version 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Java is installed!
) else (
    echo [X] Java is NOT installed or not in PATH
)

echo.
echo Checking Maven...
mvn -version 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Maven is installed!
) else (
    echo [X] Maven is NOT installed or not in PATH
)

echo.
echo Checking JAVA_HOME...
if defined JAVA_HOME (
    echo [OK] JAVA_HOME is set to: %JAVA_HOME%
) else (
    echo [X] JAVA_HOME is NOT set
)

echo.
echo ========================================
echo.
pause
goto menu

:end
echo.
echo Exiting...
exit /b 0
