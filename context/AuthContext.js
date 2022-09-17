import { createContext, useContext, useState } from "react";
import { API_URL } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState({
    status: "",
    msg: "",
  });

  // Register user
  const register = async ({ user }) => {
    // 'http://localhost:1337/api/auth/local/register'
    console.log("register", user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setJwt(data.jwt);
      setError(null);
    } else {
      setUser(null);
      setError({
        status: data?.error?.status,
        msg: data?.error?.message,
      });
    }
  };

  // logout user
  const logout = async () => {
    console.log("logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log("checkUserLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
