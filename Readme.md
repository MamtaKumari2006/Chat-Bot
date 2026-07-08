# 🤖 AI Chat Application

A full-stack AI-powered chat application built with **React**, **Node.js**, **MongoDB**, and **Groq AI**. Users can register, login, create conversations, and chat with an AI assistant in real-time.

---

## 🌐 Live Demo

- **Frontend**: https://chat-bot-two-woad.vercel.app/
- **Backend**: https://chat-bot-9pc9.onrender.com/

---





---

## ✨ Features

- 🔐 User Authentication (Register / Login / Logout)
- 🍪 JWT Token with Cookie-based Auth
- 🛡️ Protected Routes
- 💬 Create / Delete Conversations
- 📨 Send Messages & Get AI Replies
- 🤖 AI Responses powered by Groq (Llama 3.1)
- 📱 Toggle Sidebar
- 🎨 Modern Dark UI with Blue-Purple Theme
- 🔄 Auto-create New Chat on Login
- 📜 Chat History Maintained

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React | UI Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Axios | API Calls |
| React Router DOM | Routing |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| cookie-parser | Cookie Handling |
| cors | Cross-Origin Requests |

### AI Model
| Technology | Purpose |
|-----------|---------|
| Groq API | AI Response Generation |
| Llama 3.1 8B | Language Model |

---

## 📁 Project Structure

```bash
ai-chat-app/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── conversation.controller.js
│   │   │   └── message.controller.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── auth.model.js
│   │   │   ├── chats.model.js
│   │   │   └── message.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── conversation.routes.js
│   │   │   └── message.route.js
│   │   ├── services/
│   │   │   └── groq.service.js
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── authContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   ├── services/
│   │   │   ├── axios.js
│   │   │   ├── authServer.js
│   │   │   ├── conversationService.js
│   │   │   └── messageService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Groq API Key https://console.groq.com/keys

---

### 1. Clone the Repository

```bash
git clone https://github.com/MamtaKumari2006/Chat-Bot
cd your-repo-name
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/current` | Get current user |

### Conversations
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/conversation/create` | Create conversation |
| GET | `/api/conversation/all` | Get all conversations |
| GET | `/api/conversation/:id` | Get one conversation |
| PUT | `/api/conversation/:id/rename` | Rename conversation |
| DELETE | `/api/conversation/:id` | Delete conversation |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/messages/send/:conversationId` | Send message |
| GET | `/api/messages/:conversationId` | Get messages |

---

## ⚙️ How It Works

```
User → Frontend (React)
         ↓
    Axios API Call
         ↓
    Backend (Express)
         ↓
    Auth Middleware (JWT)
         ↓
    Controller Logic
         ↓
    MongoDB (Save Message)
         ↓
    Groq API (AI Reply)
         ↓
    Save AI Response
         ↓
    Return to Frontend
         ↓
    Display in Chat UI
```

---

## 🧠 What I Learned

- Full-stack application architecture
- JWT authentication with cookies
- MongoDB schema design and relationships
- RESTful API design
- React state management and component communication
- Protected routes in frontend
- AI API integration (Ollama → Groq migration)
- CORS configuration
- Frontend-Backend integration
- Debugging full-stack applications
- Git version control
- Deployment strategies

---

## 🔮 Future Improvements

- [ ] Rename conversation from UI
- [ ] Mobile responsive design
- [ ] Loading animations
- [ ] Markdown rendering for AI responses
- [ ] Auto-scroll improvements
- [ ] Message edit/delete
- [ ] Regenerate AI response
- [ ] Dark/Light theme toggle
- [ ] PWA support (install as app)
- [ ] Rate limiting
- [ ] Streaming AI responses

---

## 🤔 Challenges Faced

- JWT cookie authentication across different origins
- CORS configuration between frontend and backend
- Route parameter mismatches
- Ollama to Groq API migration
- React state management for conversation flow
- Browser autofill styling issues
- Sidebar toggle with smooth transitions

---

## 👩‍💻 Author

**Your Name**

- GitHub: https://github.com/MamtaKumari2006
- LinkedIn: https://www.linkedin.com/in/mamta-kumari-262b6b373/

---

## 📄 License

This project is for **learning and portfolio purposes**.

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!