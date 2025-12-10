# 🐧 Testing in WSL (Kali Linux)

Here are the commands to run your application manually in your WSL terminal.

## ⚠️ Prerequisite: Install Java 17 or 21
Your Kali Linux has Java 11, but this app needs Java 17+. Run this first:

```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
# OR for Java 21:
sudo apt install openjdk-21-jdk -y
```

## 1. Start the Backend

Open a terminal in the project folder and run:

```bash
cd backend
mvn spring-boot:run
```

*Wait until you see "Started ChatAppApplication in ... seconds"*

## 2. Start the Frontend

Open a **new** terminal (split pane or new tab) in the project folder and run:

```bash
cd frontend
npm install
npm run dev
```

*Wait until you see "Local: http://localhost:5173/"*

## 3. Access the App

Open your browser and go to:
[http://localhost:5173](http://localhost:5173)

## ⚠️ Troubleshooting

**"Operation not permitted" or "FileSystemException"**
This happens if the Windows terminal is holding a lock on the files.
1.  **Close all other terminals** running the app (especially `start-backend.bat`).
2.  Run `mvn clean` in the backend folder.
3.  Try `mvn spring-boot:run` again.

