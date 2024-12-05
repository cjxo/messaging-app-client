import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken]         = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = async () => {
    // TODO: fetch access token
    setToken("NAUR");
    setIsLoading(false);
  };

  useEffect(() => {
    const key = setInterval(() => {
      fetchToken();
    }, 14 * 60 * 1000); // 14 min expiry of access token, so refetch after 14 min
  
    fetchToken();
    return () => clearInterval(key);
  }, [token]);

  const signin = () => {
  };

  const signup = () => {
  };

  return (
    <AuthContext.Provider value={{ isLoading, token, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
