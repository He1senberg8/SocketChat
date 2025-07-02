# Socketly

A sleek, real-time MERN-based chat app powered by WebSockets.

> A real-time chat application built with the MERN stack and Socket.IO.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://socketchat-x.onrender.com)  


---

## 📖 Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Screenshots](#screenshots)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [Usage](#usage)  
- [Deployment](#deployment)   
- [Contact](#contact)

---

## 🌟 Overview

Socketly is a modern, real-time chat application that allows users to interact seamlessly with one another. Built on the MERN (MongoDB, Express, React, Node.js) stack, it leverages Socket.IO for instant two-way communication.

Visit the live demo: [https://socketchat-x.onrender.com](https://socketchat-x.onrender.com)

---

## 🚀 Features

- **Real-time Messaging**: Instant push and pull of messages using WebSockets.  
- **Private & Group Chats**: One-on-one and multi-user chat rooms.  
- **Online Status**: See which users are online/offline.  
- **User Authentication**: Secure login and registration with JWT.  
- **Responsive Design**: Works seamlessly on desktop and mobile.  

---

## 🖼 Screenshots

<div align="center">

| Login Screen                         | Chat Interface (Light Mode)             |
| ------------------------------------ | --------------------------------------- |
| <img src="./assets/Screenshot 2025-07-02 015702.png" alt="Login Screen" width="300" /> | <img src="./assets/Screenshot 2025-07-02 052716.png" alt="Chat Light" width="300" /> |

| Chat Interface (Dark Mode)           |                                       |
| ------------------------------------ | --------------------------------------- |
| <img src="./assets/Screenshot 2025-07-02 052746.png" alt="Chat Dark" width="300" /> |                                       |

</div>

---

## 🛠 Tech Stack

- **Frontend:** React, Redux (or Context API), Tailwind CSS  
- **Backend:** Node.js, Express, Socket.IO  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, bcrypt  

---

## 📦 Getting Started

Follow these steps to run Socketly locally.

### Prerequisites

- Node.js >= 14.x  
- npm or Yarn  
- MongoDB Atlas account (or local instance)  

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/He1senberg8/socketly.git
   cd socketly

   # In the project root
   npm install

   # In the frontend folder
   cd frontend && npm install
   cd ..

   # In the backend folder
   cd backend && npm install
   cd ..
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLIENT_URL=http://localhost:3000
```

---

### Running Locally

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Usage

- **Sign Up / Login:** Create an account or log in with your credentials.
- **Select a Contact:** Click on any user in the sidebar to start chatting.
- **Send Messages:** Type in the input at the bottom and hit Enter or click Send.
- **Toggle Themes:** Switch between Light and Dark mode via the settings.

---

## 🚢 Deployment

Socketly is deployed on Render. To deploy your own copy:

1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Connect your GitHub repo and set your environment variables.
4. Set the build commands:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
5. For the frontend, set the publish directory to `frontend/build`.

Your app will go live on Render!

---


## 📬 Contact

Created by [He1senberg8](https://github.com/He1senberg8)

Project Link: [https://github.com/He1senberg8/socketly](https://github.com/He1senberg8/socketly)

Happy chatting with Socketly!