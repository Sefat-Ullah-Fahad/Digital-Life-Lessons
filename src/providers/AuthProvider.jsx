import React, { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile,
  GoogleAuthProvider 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init"; // আপনার ফাইলের নাম অনুযায়ী পাথ ঠিক করা হয়েছে

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. নতুন ইউজার তৈরি (Registration)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. লগইন করা (Login)
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ৩. গুগল দিয়ে লগইন
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ৪. ইউজারের নাম ও ছবি আপডেট করা
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: photo
    });
  };

  // ৫. লগ আউট করা
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ইউজারের অবস্থা পর্যবেক্ষণ করা (Observer)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = { 
    user, 
    loading, 
    createUser, 
    logIn, 
    googleSignIn, 
    updateUserProfile, 
    logOut 
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}