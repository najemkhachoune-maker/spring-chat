# Real-Time Chat Application

A modern, real-time chat application built with **Spring Boot** (backend) and **React** (frontend), featuring WebSocket communication, user authentication, and beautiful UI design.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Real-Time Messaging**: Instant message delivery using WebSockets (STOMP protocol)
- **Public Chat**: Group conversations visible to all users
- **Private Messaging**: One-on-one conversations between users
- **User Search**: Find and connect with other users
- **Online Status**: See who's currently active
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+** (for building the backend)
- **Node.js 20.19+** or **22.12+** (for the frontend)
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project using Maven:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   
   Or if you prefer using Java directly:
   ```bash
   java -jar target/chatapp-0.0.1-SNAPSHOT.jar
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or the next available port)

## 🐳 Docker Setup

You can also run the entire application using Docker Compose.

1.  **Build and Run**:
    ```bash
    docker-compose up --build
    ```

2.  **Access the App**:
    -   Frontend: `http://localhost:3000`
    -   Backend: `http://localhost:8080`

3.  **Stop the App**:
    ```bash
    docker-compose down
    ```

## 🎮 Usage

1. **Start the Backend**: Make sure the Spring Boot server is running on port 8080
2. **Start the Frontend**: Launch the React development server
3. **Create an Account**: Click "Create Account" on the login page
4. **Start Chatting**: 
   - Use the public chat to message everyone
   - Click on a user in the sidebar to start a private conversation
   - Search for users using the search bar

## 🏗️ Project Structure

### Backend (`/backend`)

```
backend/
├── src/
│   └── main/
│       ├── java/com/example/chatapp/
│       │   ├── config/           # WebSocket & Security configuration
│       │   ├── controller/       # REST & WebSocket controllers
│       │   ├── model/            # Entity models
│       │   ├── repository/       # JPA repositories
│       │   ├── service/          # Business logic
│       │   └── ChatAppApplication.java
│       └── resources/
│           └── application.properties
└── pom.xml
```

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login/Register component
│   │   ├── Login.css
│   │   ├── ChatRoom.jsx       # Main chat interface
│   │   └── ChatRoom.css
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── App.jsx                # Main app component
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🔧 Technologies Used

### Backend
- **Spring Boot 3.2.3** - Application framework
- **Spring WebSocket** - Real-time communication
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database (development)
- **Lombok** - Reduce boilerplate code
- **STOMP** - WebSocket messaging protocol

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **SockJS Client** - WebSocket fallback
- **STOMP.js** - STOMP protocol implementation
- **CSS3** - Modern styling with animations

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect
- **Gradient Backgrounds**: Dynamic, animated gradient orbs
- **Smooth Animations**: Micro-interactions for better UX
- **Dark Theme**: Eye-friendly dark color scheme
- **Responsive Layout**: Adapts to all screen sizes

## 🔐 API Endpoints

### REST Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/online` - Get list of online users

### WebSocket Endpoints

- `/ws` - WebSocket connection endpoint
- `/app/chat.addUser` - User joins chat
- `/app/chat.sendMessage` - Send a message
- `/app/chat.removeUser` - User leaves chat
- `/topic/public` - Public chat messages
- `/user/{username}/queue/messages` - Private messages

## 🐛 Troubleshooting

### Backend Issues

**Maven not found:**
- Install Maven from https://maven.apache.org/download.cgi
- Add Maven to your system PATH

**Java version error:**
- Ensure Java 17 or higher is installed
- Check version: `java -version`

**Port 8080 already in use:**
- Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
- Update the frontend API calls to use the new port

### Frontend Issues

**Node.js version warning:**
- Upgrade to Node.js 20.19+ or 22.12+
- Download from https://nodejs.org/

**Dependencies not installing:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**WebSocket connection failed:**
- Ensure the backend is running on port 8080
- Check CORS configuration in `WebSocketConfig.java`
- Verify the WebSocket URL in `ChatRoom.jsx`

## 📝 Environment Configuration

### Backend (`application.properties`)

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend

Update API endpoints in components if backend port changes:
- `Login.jsx` - Line 26: `http://localhost:8080`
- `ChatRoom.jsx` - Line 42: `http://localhost:8080`

## 🚀 Production Deployment

### Backend

1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/chatapp-0.0.1-SNAPSHOT.jar
   ```

### Frontend

1. Build for production:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist/` folder
3. Deploy to your preferred hosting service (Vercel, Netlify, etc.)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Spring Boot and React

---

**Enjoy chatting! 💬**
