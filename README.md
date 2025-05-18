# 🏡 NestVibes – Residential Real Estate Website

[Live Site 🌐](https://nest-vibes-b0e09.web.app/)  
[GitHub Repository 📁](https://github.com/kawsar12759/react-nest-vibes)

NestVibes is a responsive, modern residential real estate website designed to help users explore and find different types of housing such as apartments, student housing, and vacation rentals. Built with **React.js**, **Tailwind CSS**, and **Firebase**, this platform offers an elegant user experience for property searching.

---

## ✨ Features

- 🔍 **Property Categories**: Explore Apartments, Student Housing, and Vacation Rentals.
- 🖼️ **Home Slider**: Dynamic slider with eye-catching visuals of properties.
- 🧭 **Navigation Bar**: Fully responsive with active link styles.
- 📝 **Authentication**: Register/Login with Firebase Authentication (email & password).
- 📸 **Photo URL Input**: Users can upload their profile picture via URL during registration.
- 🔐 **Protected Routes**: Certain pages are only accessible after logging in.
- 📄 **Property Details Page**: View full information and images of each property.
- 📱 **Responsive Design**: Mobile-friendly layout with clean UI using Tailwind CSS.

---

## 🛠️ Technologies Used

### Frontend:
- **React.js**
- **React Router DOM**
- **Tailwind CSS**
- **DaisyUI**
- **Heroicons**

### Backend / Hosting:
- **Firebase Authentication**
- **Firebase Hosting**

---

## 📁 Project Structure

```bash
react-nest-vibes/
├── public/
├── src/
│   ├── assets/               # Images and static assets
│   ├── components/           # Reusable components like Navbar, Footer, Slider, etc.
│   ├── layouts/              # Layout wrapper for pages
│   ├── pages/                # Page components like Home, Login, Register, Details
│   ├── routes/               # Route definitions and private route logic
│   ├── context/              # Auth context using React Context API
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── firebase.config.js
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Firebase account for authentication and hosting

### Installation
1. Clone the repository:
```bash
git clone https://github.com/kawsar12759/react-nest-vibes.git
cd react-nest-vibes
```

2. Install dependencies:
```bash
npm install
```
3. Add your Firebase configuration:
- Create a file named firebase.config.js in the root of src/
- Add your Firebase credentials:
```bash
// src/firebase.config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export default firebaseConfig;
```
4. Run the development server:
```bash
npm run dev
```

---

## 📦 Deployment
The app is deployed using Firebase Hosting:
```bash 
npm run build
firebase deploy
```

---

## 🤝 Contributing
Contributions are welcome!
If you'd like to suggest improvements or report issues, feel free to open an issue or pull request.

---

## 🧑‍💻 Author

**MD. Kawsar Hossain**  
Frontend & Backend Developer | Firebase | React.js | Tailwind  
📧 Email: [kawsar.hossain12759@gmail.com](mailto:kawsar.hossain12759@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/kawsar-hossain-antor/)  
🐙 [GitHub](https://github.com/kawsar12759)

