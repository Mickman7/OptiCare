import React, { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

// Create Context
// export const AuthContext = createContext();

// Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user); // Update user state when authentication state changes
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
