// src/firebase/authUtils.js
import { auth, googleProvider } from './firebaseConfig';

import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification  
} from 'firebase/auth';

// Google login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  localStorage.setItem('token', idToken);
  return result.user;
};

// Function to sign up with email and password
export const signUpWithEmail = async (email, password, name) => {
    try {
      // Create user with email and password
      console.log('Email:', email);  // Log the email before signup
      console.log("Password:", password);
      email = email.trim(); 
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update the user profile with name
      await updateProfile(user, {
        displayName: name, // Add the name to the user's profile
      });
  
      // Send email verification
      await sendEmailVerification(user); // This sends the email verification
  
      console.log('User created and verification email sent:', user);
    } catch (error) {
      throw new Error(error.message); // Capture and throw any error
    }
  };

// Email/Password Login
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken();
  localStorage.setItem('token', idToken);
  return result.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('token');
};
