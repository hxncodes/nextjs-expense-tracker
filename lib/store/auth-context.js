"use client";

import { createContext } from "react";
import { auth } from "@/lib/firebase/config.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logOut: async () => {},
});

export default function AuthContextProvider({ children }) {
  // grabbing user and loading from useAuthState
  const [user, loading] = useAuthState(auth);

  // Instance for googleAuth
  const googleProvider = new GoogleAuthProvider(auth);

  // Google login function
  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  //   After signing out, value of user will set as blank
  const logOut = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    loading,
    googleLoginHandler,
    logOut,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
