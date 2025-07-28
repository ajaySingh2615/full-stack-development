import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        // Mark that user is authenticated
        localStorage.setItem("wasAuthenticated", "true");
      }
    } catch (error) {
      // Only log the error if it's not a 401 (which is expected when not logged in)
      if (error?.response?.status !== 401) {
        console.error("Auth check failed:", error);
      }
      setUser(null);
      setIsAuthenticated(false);
      // Don't remove wasAuthenticated here - let the interceptor handle it
      // This prevents clearing the flag on initial page load for new users
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Mark that user is now authenticated
        localStorage.setItem("wasAuthenticated", "true");
        toast.success("Login successful! Welcome back.");
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);

      if (response.success) {
        toast.success("Registration successful! Please login to continue.");
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      // Clear authentication state
      localStorage.removeItem("wasAuthenticated");
      toast.success("Logged out successfully!");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
      // Clear authentication state
      localStorage.removeItem("wasAuthenticated");
      toast.error("Logout failed, but you have been logged out locally.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      if (response.success) {
        return { success: true };
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: error.message };
    }
  };

  const googleLogin = async (accessToken) => {
    try {
      setIsLoading(true);
      const result = await authService.googleLogin(accessToken);

      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("wasAuthenticated", "true");
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    googleLogin,
    refreshToken,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
