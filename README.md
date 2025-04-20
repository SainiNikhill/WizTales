# 🌍 WizTales – Travel Stories with a Touch of Magic ✨

WizTales is a full-stack travel storytelling platform built using the MERN stack. It allows users to share, explore, and relive magical travel memories by posting stories and images. Inspired by themes of adventure and wonder, WizTales is not just a platform—it's a journey through places and imagination.

---

## 🚀 Live Links

- 🌐 **Frontend Live**: [Click Here]()
- 🔗 **Backend Live**: [Click Here]()
- 🖼️ **Demo Video**: [Watch Here](https://your-demo-video-link.com)

---

## 🧹 Features

- 🧙‍♂️ Magical theme and animations using **Framer Motion**
- 🔐 JWT-based **Authentication** system (Register/Login)
- 📝 **CRUD operations** for travel stories
- 🖼️ **Cloudinary Image Uploads**
- 🔍 **Search & Filter** stories by location, tags, or title
- 🎥 Full-screen **Hero Section** with video background
- 📱 **Responsive Design** for all devices
- 💬 In-app **Story Details View**
- 🌃 Light/dark aesthetics inspired by magical worlds

---

## 🛠️ Tech Stack

### ⚙️ Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### 🔧 Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js (Password hashing)
- Cloudinary (for image storage)
- Multer (image upload middleware)

---

## 📁 Folder Structure (Simplified)

```
wiztales/
│
├── Frontend              # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── Backend              # Node + Express Backend
│   ├── models/
│   └── server.js
│
├── .env
├── README.md
└── package.json
```

---

## 🧪 How to Run Locally

### 🔽 Clone the Repository
```bash
git clone https://github.com/your-username/wiztales.git
cd wiztales
```

### ⚖️ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory with:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

Run the backend server:
```bash
npm start
```

### 🎨 Setup Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔒 Environment Variables

For secure functioning, set the following environment variables:

**Frontend (`client/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (`server/.env`)**
```env
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📸 Screenshots

| Home Page | Story Upload | Story View |
|-----------|--------------|-------------|
| ![home](https://your-image-link.com/home.png) | ![upload](https://your-image-link.com/upload.png) | ![view](https://your-image-link.com/view.png) |

---

## 💡 Future Enhancements

- 🌍 Add geolocation tagging using Maps API  
- 📩 Implement in-app messaging for travelers  
- ⭐ Like/Bookmark favorite stories  
- 🗘️ Explore section with story-based maps  
- 🌐 Multilingual support  

---

## 🙌 Credits

- UI Inspired by magical fantasy aesthetics  
- Backend REST API built from scratch  
- Assets and photos: Unsplash, Pexels  
- Special thanks to [you and your team, if applicable]

---

## 🪄 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

[MIT License](LICENSE)

---

## 🧙‍♀️ Made with ❤️ and a bit of magic by [Your Name](https://github.com/your-username)

