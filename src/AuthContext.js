import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setLoggedIn(false);
      navigate("/");
      return;
    }

    fetch("http://localhost:3080/verify", {
      method: "POST",
      headers: {
        "jwt-token": user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if ("success" === r.message) {
          setLoggedIn(true);
          setEmail(user.email || "");
        } else {
          setLoggedIn(false);
          navigate("/");
        }
      });
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};