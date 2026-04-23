@echo off
SETLOCAL EnableDelayedExpansion

echo ===================================================
echo 🚀 Lakhara Digital News - Full Stack Runner
echo ===================================================

:: Check for Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Java is not installed. Please install Java 17+ to run the backend.
    pause
    exit /b
)

:: Check for Maven
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [⚠️] Maven (mvn) is not recognized.
    echo Please install Maven from https://maven.apache.org/download.cgi
    echo or run the backend using an IDE like VS Code (Java Extension).
    echo.
    echo Continuing to start the Frontend...
) else (
    echo [✅] Maven detected. Starting Backend in a new window...
    start cmd /k "cd backend && mvn spring-boot:run"
)

:: Run Frontend
echo [✅] Starting Frontend...
if not exist node_modules (
    echo [📦] Installing dependencies...
    npm install
)
npm run dev

pause
