import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axiosInstance from "../api/axiosInstance";
import { useLocation } from "react-router-dom";

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const skipFetch = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // Skip fetch for these routes
    if (["/signin", "/signup", "/"].includes(location.pathname)) {
      setLoading(false);
      return;
    }

    if (skipFetch.current) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me");
        console.log(res.data);
        if (res.data.success) {
          setUser(res.data.user);
          setIsLogged(true);
        } else {
          setUser(null);
          setIsLogged(false);
        }
      } catch (err) {
        console.error("❌ User fetch error:", err);
        setUser(null);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  const login = (userData) => {
    skipFetch.current = true;
    setUser(userData);
    setIsLogged(true);
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } finally {
      setUser(null);
      setIsLogged(false);
      setLoading(false);
      skipFetch.current = false;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isLogged }}>
      {children}
    </UserContext.Provider>
  );
};
