# 💬 WhyChat

A real-time cross-platform chat application with a **React + Vite** web client, a **React Native Expo** mobile app, and a shared **Node.js** backend — all powered by JavaScript and TypeScript.

---

## 🚀 Features

- **Real-Time Messaging** — Instant message delivery using WebSockets
- **Cross-Platform** — Chat from the browser (web) or your phone (iOS & Android)
- **User Authentication** — Secure login and registration
- **Chat Rooms / Direct Messages** — Organized conversations
- **Shared Backend** — A single server powers both the web and mobile clients
- **Modern Stack** — Vite for fast web dev, Expo for frictionless mobile builds

---

## 🛠️ Tech Stack

### Web Client (`/webchat`)
| Technology | Purpose |
|---|---|
| React.js | UI library |
| Vite | Build tool & dev server |
| JavaScript / TypeScript | Core languages |
| CSS | Styling |
| Axios / Fetch API | HTTP & API communication |

### Mobile App (`/phonechat`)
| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile framework |
| Expo | Mobile toolchain & build system |
| JavaScript / TypeScript | Core languages |
| React Navigation | Screen navigation |

### Backend (`/Server`)
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework & routing |
| Socket.IO | Real-time WebSocket communication |
| MongoDB / Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
WhyChat/
│
├── Server/                  # Node.js + Express backend
│   ├── models/              # Mongoose data models
│   ├── routes/              # Express route handlers
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & error handling
│   ├── config/              # DB and environment config
│   └── server.js            # Entry point
│
├── webchat/                 # React + Vite web application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API & socket services
│   │   └── App.jsx          # Root component
│   ├── index.html
│   └── vite.config.js
│
└── phonechat                # React Native Expo mobile app
    ├── app/
    │   ├── screens/         # Screen-level components
    │   ├── components/      # Reusable UI components
    │   ├── navigation/      # Navigation configuration
    │   └── services/        # API & socket services
    ├── app.json             # Expo config
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — for the mobile app
- [Expo Go](https://expo.dev/client) app on your phone (optional, for quick testing)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Devrajchapai/WhyChat.git
cd WhyChat
```

---

### 2. Setup the Server

```bash
cd Server
npm install
```

Create a `.env` file in `/Server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm start
# or with hot-reload:
npm run dev
```

Server runs at `http://localhost:5000`

---

### 3. Setup the Web Client

```bash
cd ../webchat
npm install
npm run dev
```

Web app runs at `http://localhost:5173`

---

### 4. Setup the Mobile App

```bash
cd ../phonechat
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

> **Note:** Update the `BASE_URL` in your API config to your machine's local IP address (e.g., `http://192.168.x.x:5000`) when testing on a physical device.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/messages/:roomId` | Get messages for a chat room |
| `POST` | `/api/messages` | Send a new message |

---

## 🔌 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Client → Server | User connects |
| `join_room` | Client → Server | User joins a chat room |
| `send_message` | Client → Server | User sends a message |
| `receive_message` | Server → Client | Broadcast new message to room |
| `disconnect` | Client → Server | User disconnects |

---

## 🗂️ Database Models

### User
```js
{
  username: String,
  email: String,
  password: String,   // hashed with bcrypt
  avatar: String,
  createdAt: Date
}
```

### Message
```js
{
  sender: ObjectId,   // ref: User
  roomId: String,
  content: String,
  createdAt: Date
}
```

## 👤 Author

**Devraj Chapai**

- GitHub: [@Devrajchapai](https://github.com/Devrajchapai)

---

> ⭐ If you found this project useful, please consider giving it a star!
