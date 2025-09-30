import React, { useEffect, useState } from "react";
import { showToast } from "../utils/toastUtil";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && jwtToken) {
      setJwtToken(jwtToken);
      setUser(user);
    }
    setIsUserLoading(false);
  }, []);

  const login = (jwtToken, user) => {
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setJwtToken(jwtToken);
  };

  const logout = (userEvent = true) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setUser(null);
    setJwtToken(null);
    if (userEvent) {
      showToast(true, "Logged out successfully!");
    }else{
      showToast(false, "Session expired! Please login again.");
    }
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider value={{ jwtToken, user,updateUser, login, logout }}>
      {!isUserLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
