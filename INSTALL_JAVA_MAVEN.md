# 📦 Installing Java and Maven on Windows

This guide will walk you through installing Java 17 and Apache Maven on Windows.

## 🔧 Step 1: Install Java 17 (JDK)

### Option A: Using Chocolatey (Recommended - Easiest)

If you have Chocolatey installed:

```powershell
# Run PowerShell as Administrator
choco install openjdk17 -y
```

### Option B: Manual Installation (Most Common)

1. **Download Java 17**
   - Go to: https://adoptium.net/temurin/releases/
   - Select:
     - **Version**: 17 - LTS
     - **Operating System**: Windows
     - **Architecture**: x64 (for 64-bit Windows)
   - Click the `.msi` installer download button

2. **Install Java**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installer
   - **IMPORTANT**: Check the box "Add to PATH" or "Set JAVA_HOME variable"
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Java Installation**
   Open a **NEW** Command Prompt or PowerShell and run:
   ```bash
   java -version
   ```
   
   You should see something like:
   ```
   openjdk version "17.0.x" 2024-xx-xx
   OpenJDK Runtime Environment Temurin-17.0.x (build 17.0.x+x)
   OpenJDK 64-Bit Server VM Temurin-17.0.x (build 17.0.x+x, mixed mode, sharing)
   ```

### If Java is Not in PATH

If `java -version` doesn't work, you need to add Java to your PATH manually:

1. **Find Java Installation Path**
   - Usually: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\`
   - Or: `C:\Program Files\Java\jdk-17.x.x\`

2. **Add to PATH**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin`
   - Click "OK" on all windows
   - **Restart your terminal**

3. **Set JAVA_HOME** (Important for Maven)
   - In "Environment Variables" window
   - Under "System variables", click "New"
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
   - Click "OK"

## 🔧 Step 2: Install Apache Maven

### Option A: Using Chocolatey (Recommended - Easiest)

If you have Chocolatey installed:

```powershell
# Run PowerShell as Administrator
choco install maven -y
```

### Option B: Manual Installation

1. **Download Maven**
   - Go to: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.x-bin.zip` (Binary zip archive)

2. **Extract Maven**
   - Extract the downloaded ZIP file
   - Move the extracted folder to: `C:\Program Files\Apache\maven`
   - Final path should be: `C:\Program Files\Apache\maven\apache-maven-3.9.x`

3. **Add Maven to PATH**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\Apache\maven\apache-maven-3.9.x\bin`
   - Click "OK" on all windows

4. **Set M2_HOME** (Optional but recommended)
   - In "Environment Variables" window
   - Under "System variables", click "New"
   - Variable name: `M2_HOME`
   - Variable value: `C:\Program Files\Apache\maven\apache-maven-3.9.x`
   - Click "OK"

5. **Verify Maven Installation**
   Open a **NEW** Command Prompt or PowerShell and run:
   ```bash
   mvn -version
   ```
   
   You should see something like:
   ```
   Apache Maven 3.9.x (xxxxx)
   Maven home: C:\Program Files\Apache\maven\apache-maven-3.9.x
   Java version: 17.0.x, vendor: Eclipse Adoptium
   ```

## 🚀 Step 3: Install Chocolatey (Optional but Recommended)

Chocolatey is a package manager for Windows that makes installing software much easier.

1. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Run this command**:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. **Close and reopen PowerShell as Administrator**

4. **Install Java and Maven with Chocolatey**:
   ```powershell
   choco install openjdk17 maven -y
   ```

## ✅ Verification Checklist

After installation, open a **NEW** terminal and verify:

```bash
# Check Java
java -version
# Should show: openjdk version "17.x.x"

# Check Maven
mvn -version
# Should show: Apache Maven 3.9.x

# Check JAVA_HOME
echo %JAVA_HOME%
# Should show: C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
```

## 🐛 Troubleshooting

### Problem: "java is not recognized as an internal or external command"

**Solution**:
1. Make sure Java is installed
2. Add Java bin folder to PATH (see instructions above)
3. **Restart your terminal** (very important!)
4. Try again

### Problem: "mvn is not recognized as an internal or external command"

**Solution**:
1. Make sure Maven is installed
2. Add Maven bin folder to PATH (see instructions above)
3. **Restart your terminal** (very important!)
4. Try again

### Problem: Maven shows "JAVA_HOME not set"

**Solution**:
1. Set JAVA_HOME environment variable (see instructions above)
2. Make sure it points to the JDK folder (not the bin folder)
3. **Restart your terminal**
4. Try again

### Problem: PowerShell execution policy error

**Solution**:
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🎯 Quick Install Commands (If you have Chocolatey)

```powershell
# Run PowerShell as Administrator
choco install openjdk17 maven -y

# Verify installations
java -version
mvn -version
```

## 📝 After Installation

Once Java and Maven are installed:

1. **Close ALL terminal windows**
2. **Open a NEW terminal**
3. **Navigate to your project**:
   ```bash
   cd C:\Users\HP\.gemini\antigravity\scratch\chat-app\backend
   ```
4. **Start the backend**:
   ```bash
   mvn spring-boot:run
   ```

## 🎉 Success!

Once you see "Started ChatAppApplication" in the terminal, your backend is running!

- Backend API: http://localhost:8080
- H2 Database Console: http://localhost:8080/h2-console

Now you can use your chat application! 💬🚀

---

**Need help?** Check the troubleshooting section or refer to:
- Java: https://adoptium.net/installation/
- Maven: https://maven.apache.org/install.html
