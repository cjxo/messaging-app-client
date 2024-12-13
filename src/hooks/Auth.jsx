import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth]       = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await api.auth.isAuth();
      setIsAuth(result.ok);
      setIsLoading(false);
      console.log(result);
    };

    checkAuth();
  }, []);

  const signIn = async (username, password) => {
    const result = await api.auth.signIn(username, password);
    if (result.ok) {
      setIsAuth(true);
    }
    return result;
  };

  const signUp = async (firstName, lastName, username, email, password) => {
    const result = await api.auth.signUp(firstName, lastName, username, email, password);
    return result;
  };

  const signOut = () => {
    setIsAuth(false);
    api.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ isLoading, isAuth, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
