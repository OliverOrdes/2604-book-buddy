import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Whenever the token changes, load (or clear) the current user.
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    api
      .getMe(token)
      .then(setUser)
      .catch(() => {
        // Token is missing/expired — clean it up.
        localStorage.removeItem("token");
        setToken(null);
      });
  }, [token]);

  async function register(credentials) {
    const result = await api.register(credentials);
    localStorage.setItem("token", result.token);
    setToken(result.token);
  }

  async function login(credentials) {
    const result = await api.login(credentials);
    localStorage.setItem("token", result.token);
    setToken(result.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
