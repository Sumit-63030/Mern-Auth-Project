# MERN Authentication App

A complete **MERN Stack Authentication System** featuring JWT-based login, signup, password reset, and protected routes. Built with Express, MongoDB, React, and Context API.

---

## 🚀 Features

### 🔐 Authentication

* User Signup
* User Login
* Secure Password Hashing (bcryptjs)
* JSON Web Token (JWT) Authentication
* Protected Routes (Backend + Frontend)
* Persistent Login State

### 🔄 Password Reset Flow

* Send OTP to email
* Validate OTP
* Reset password securely

### 🧰 Tech Stack

**Frontend:**

* React
* Context API
* Axios
* React Router DOM
* Toast Notifications

**Backend:**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt Password Hashing
* Nodemailer / OTP Flow

---

## 📁 Folder Structure

```
Mern-Auth-Project/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
│
└── server/              # Node.js Backend
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── models/
    │   └── server.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder.

Use this template:

```
MONGO_URI=
JWT_SECRET=
PORT=5000
EMAIL_USER=
EMAIL_PASS=
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Sumit-63030/Mern-Auth-Project.git
cd Mern-Auth-Project
```

### 2️⃣ Install backend dependencies

```
cd server
npm install
```

### 3️⃣ Install frontend dependencies

```
cd ../client
npm install
```

### 4️⃣ Start the Development Servers

**Backend:**

```
cd server
npm run dev
```

**Frontend:**

```
cd client
npm start
```

---

## 🔒 API Routes

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/send-otp
POST   /api/auth/verify-otp
POST   /api/auth/reset-password
GET    /api/auth/user (Protected)
```

---

## ⭐ Support

If you found this helpful, consider giving the repo a **star**! ✨

---


