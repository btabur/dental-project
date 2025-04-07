"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, token: initialToken }) => {
  const [token, setToken] = useState(initialToken || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  useEffect(() => {
    setIsLoggedIn(!!token);  
  }, [token]);

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
