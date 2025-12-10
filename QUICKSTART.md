# 🚀 Quick Start Guide

Get your chat application up and running in minutes!

## Option 1: Using Batch Scripts (Windows - Easiest)

### Step 1: Start the Backend
1. Open `backend` folder
2. Double-click `start-backend.bat`
3. Wait for the message: "Started ChatAppApplication"

### Step 2: Start the Frontend
1. Open `frontend` folder
2. Double-click `start-frontend.bat`
3. Your browser should open automatically to `http://localhost:5173`

## Option 2: Using Command Line

### Terminal 1 - Backend
```bash
cd backend
mvn spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install  # Only needed first time
npm run dev
```

## 🎯 First Time Setup

### 1. Install Prerequisites

**Java 17+**
- Download: https://adoptium.net/
- Verify: `java -version`

**Maven**
- Download: https://maven.apache.org/download.cgi
- Verify: `mvn -version`

**Node.js 20.19+**
- Download: https://nodejs.org/
- Verify: `node -version`

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

This will install:
- React and React DOM
- React Router DOM
- SockJS Client
- STOMP.js
- Vite and development tools

## 🎮 Using the Application

### Create Your Account
1. Open http://localhost:5173 in your browser
2. Click "Create Account"
3. Enter a username and password
4. Click "Create Account"

### Start Chatting
1. After login, you'll see the chat interface
2. **Public Chat**: Messages visible to everyone
3. **Private Chat**: Click on a user in the sidebar to chat privately
4. **Search Users**: Use the search bar to find specific users

## 🔍 Troubleshooting

### Backend Won't Start

**Problem**: Maven not found
```bash
# Solution: Install Maven and add to PATH
# Windows: Add Maven bin folder to System Environment Variables
```

**Problem**: Port 8080 already in use
```bash
# Solution: Change port in backend/src/main/resources/application.properties
server.port=8081
# Then update frontend API URLs in Login.jsx and ChatRoom.jsx
```

**Problem**: Java version error
```bash
# Solution: Install Java 17 or higher
# Verify: java -version
```

### Frontend Won't Start

**Problem**: Node.js version warning
```bash
# Solution: Upgrade Node.js to 20.19+ or 22.12+
# Download from: https://nodejs.org/
```

**Problem**: Dependencies not found
```bash
# Solution: Install dependencies
cd frontend
npm install
```

**Problem**: Port 5173 already in use
```bash
# Vite will automatically use the next available port (5174, 5175, etc.)
# Check the terminal output for the actual URL
```

### Connection Issues

**Problem**: "Disconnected" status in chat
```bash
# Solution: Make sure backend is running on port 8080
# Check backend terminal for errors
# Verify WebSocket endpoint: http://localhost:8080/ws
```

**Problem**: Can't send messages
```bash
# Solution: 
# 1. Check if you're connected (green "Connected" badge)
# 2. Ensure backend is running
# 3. Check browser console for errors (F12)
```

## 📱 Testing the Application

### Test with Multiple Users
1. Open the app in multiple browser windows/tabs
2. Register different users in each window
3. Try public chat - all users should see messages
4. Try private chat - click on a user to message them privately

### Test Features
- ✅ User registration
- ✅ User login
- ✅ Public messaging
- ✅ Private messaging
- ✅ User search
- ✅ Online status
- ✅ Real-time updates
- ✅ Message timestamps

## 🎨 What You'll See

### Login Page
- Beautiful gradient background with animated orbs
- Glassmorphism card design
- Toggle between Login/Register
- Smooth animations

### Chat Interface
- **Left Sidebar**: User profile, search, active users list
- **Main Area**: Chat messages with timestamps
- **Message Input**: Send messages with Enter or click button
- **Status Indicators**: Online/offline, connected/disconnected

## 🔐 Default Configuration

### Backend
- **URL**: http://localhost:8080
- **Database**: H2 in-memory (data resets on restart)
- **WebSocket**: /ws endpoint with SockJS fallback

### Frontend
- **URL**: http://localhost:5173 (or next available)
- **Build Tool**: Vite
- **Hot Reload**: Enabled (changes reflect immediately)

## 📊 Monitoring

### Backend Logs
Watch the backend terminal for:
- User registrations/logins
- WebSocket connections
- Message routing
- Database queries

### Frontend Console
Open browser DevTools (F12) to see:
- WebSocket connection status
- Message events
- API calls
- Errors (if any)

### H2 Database Console
Access at: http://localhost:8080/h2-console
- **JDBC URL**: jdbc:h2:mem:testdb
- **Username**: sa
- **Password**: password

## 🎯 Next Steps

Once everything is running:

1. **Create Multiple Accounts**: Test with different users
2. **Try Public Chat**: Send messages everyone can see
3. **Try Private Chat**: Click users to message privately
4. **Test Search**: Find users by username
5. **Check Responsiveness**: Resize browser window

## 💡 Tips

- **Multiple Browsers**: Test with Chrome, Firefox, Edge for multi-user simulation
- **Incognito Mode**: Use for testing multiple accounts simultaneously
- **Network Tab**: Monitor WebSocket connections in DevTools
- **Console Logs**: Check for connection status and errors

## 🆘 Still Having Issues?

1. **Check Prerequisites**: Ensure Java, Maven, and Node.js are installed
2. **Verify Ports**: Make sure 8080 and 5173 are available
3. **Review Logs**: Check both backend and frontend terminal output
4. **Clear Cache**: Try clearing browser cache and npm cache
5. **Restart Services**: Stop and restart both backend and frontend

---

**Ready to chat? Let's go! 💬🚀**
