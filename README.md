# 📇 Contacts Manager API

A **Node.js + Express + MongoDB REST API** for managing contacts with **JWT authentication**.  
This project allows users to register, login, and securely perform CRUD operations on their contacts.

---

## 🚀 Badges
- Node.js  
- Express.js  
- MongoDB  
- JWT  
- bcryptjs  

---

## ✨ Features
- User registration & login with hashed passwords (`bcryptjs`)  
- JWT-based authentication (private routes protected with middleware)  
- CRUD operations on contacts (Create, Read, Update, Delete)  
- Centralized error handling  
- MongoDB integration with Mongoose  

---

## 🛠️ Tech Stack
- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **JWT (jsonwebtoken)**  
- **bcryptjs**  

---

📂 Arsh-pixel-cmd
├── 📂 config/               # Database connection settings
│   └── dbConnection.js
├── 📂 controllers/          # User & Contact controllers
├── 📂 middleware/           # Error handler & JWT validation
├── 📂 models/               # Mongoose models (User, Contact)
├── 📂 routes/               # API route definitions
├── .gitignore               # Ignore node_modules, .env, etc.
├── LICENSE                  # MIT License
├── README.md                # Project documentation
├── constants.js             # Constants (error codes/messages)
├── package-lock.json        # Dependency lock file
├── package.json             # Project metadata & scripts
├── server.js                # Main entry point (Vercel-ready)
├── vercel.json              # Vercel deployment configuration
└── .env.example             # Example environment variables

 

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/Arsh-pixel-cmd/Contacts-Manager-API
cd Contacts-Manager-API
```

## 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root:
```
PORT=4000
CONNECTION_STRING=your_mongoDb_URI
ACCESS_TOKEN_SECRET=my_super_secret_key
```

### 4. Start the server
``` bash
npm start
```
✅ Expected console output
```
server is listening on port 4000
Connection Established : Host = localhost and Name = test
```

# 📡 API Endpoints  

## 👤 User Routes  
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/users/register` | Register a new user                  |
| POST   | `/api/users/login`    | Login and receive JWT                |
| GET    | `/api/users/current`  | Get logged-in user info (requires token) |

---

## 📇 Contact Routes (require JWT)  
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/contacts`       | Get all contacts for the logged-in user |
| POST   | `/api/contacts`       | Create a new contact                 |
| GET    | `/api/contacts/:id`   | Get a contact by ID                  |
| PUT    | `/api/contacts/:id`   | Update a contact by ID               |
| DELETE | `/api/contacts/:id`   | Delete a contact by ID               |

---

## 🧪 Testing with Postman  

### 1. Register User  
**POST** `your_local_server_url/api/users/register`  

```json
{
  "userName": "Arsh",
  "userEmail": "arsh@example.com",
  "password": "123456"
}
```

## 2. Login User  
**POST** `your_local_server_url/api/users/login`  

```json
{
  "userEmail": "arsh@example.com",
  "password": "123456"
}
```
✅ Response includes a JWT token.

### 3. Use JWT for protected routes

Add this header in Postman:
``` bash
Authorization: Bearer <your-token>
```

## 4. Example — Create Contact  
**POST** `your_local_server_url/api/contacts`  

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210"
}
```

## 📌 Important Notes  

- You must **register or login first** to get a JWT token.  
- All **contact routes** require a valid JWT in the `Authorization` header.  
- Current login token expiry is set to **1 minute** — consider updating it to `30m` or `1h` in `userControllers.js`.  
- Default MongoDB database is **test** unless you change it in `CONNECTION_STRING`.  


## 🤝 Contributing

Contributions are welcome!  

1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Push to the branch  
5. Open a Pull Request  

📜 License

This project is licensed under the MIT License.

## 🌐 Connect with Me  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/arsh-mishra-030093325/)  
[![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github)](https://github.com/Arsh-pixel-cmd) 
