// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  // Optional, for Firebase analytics

// Firebase configuration from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBIBLQFuVsOqwUbNLVCxyDy-LYitxM6Nn4",
  authDomain: "ecommerce-app-a387e.firebaseapp.com",
  projectId: "ecommerce-app-a387e",
  storageBucket: "ecommerce-app-a387e.firebasestorage.app",
  messagingSenderId: "778250397192",
  appId: "1:778250397192:web:7e0c1aa6142454b9f613bd",
  measurementId: "G-768D8SNLYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics if you're using Firebase Analytics
const analytics = getAnalytics(app);
