@echo off
setlocal EnableDelayedExpansion
echo ========================================
echo   GitHub Setup & Push Helper
echo ========================================
echo.

:: 1. Check Git Installation
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo Please run install-git.bat first.
    pause
    exit /b 1
)

:: 2. Check/Set Git Identity
git config user.email >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo It looks like Git is not configured yet.
    echo.
    set /p git_email="Enter your email (for Git): "
    set /p git_name="Enter your name (for Git): "
    
    git config --global user.email "!git_email!"
    git config --global user.name "!git_name!"
    echo.
    echo Git identity configured!
    echo.
)

:: 3. Initialize and Commit
if not exist .git (
    echo Initializing Git repository...
    git init
)

echo Adding files...
git add .

git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo No changes to commit.
) else (
    echo Committing files...
    git commit -m "Initial commit: Real-time Chat Application"
)

git branch -M main

:: 4. Remote Setup
echo.
echo ----------------------------------------
echo Now we need your GitHub Repository URL.
echo 1. Go to https://github.com/new
echo 2. Create a repo (don't add README/license)
echo 3. Copy the HTTPS URL
echo ----------------------------------------
echo.
set /p repo_url="Paste repository URL: "

if "%repo_url%"=="" (
    echo Error: URL cannot be empty.
    pause
    exit /b 1
)

git remote remove origin >nul 2>&1
git remote add origin %repo_url%

:: 5. Push
echo.
echo Pushing to GitHub...
echo (A browser window may open to sign in)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub.
    echo ========================================
) else (
    echo.
    echo [ERROR] Push failed.
    echo Check your URL and internet connection.
)

pause
