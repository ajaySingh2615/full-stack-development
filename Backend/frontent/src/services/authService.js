import { apiClient } from "./apiClient";

const AUTH_ENDPOINTS = {
  REGISTER: "/users/register",
  LOGIN: "/users/login",
  LOGOUT: "/users/logout",
  REFRESH_TOKEN: "/users/refresh-token",
  CURRENT_USER: "/users/current",
};

class AuthService {
  async register(userData) {
    try {
      // Since we're removing avatar, just send JSON data
      const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, {
        fullname: userData.fullname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });

      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);

      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  async refreshToken() {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      // Only log unexpected errors (not 401 which is normal when no refresh token exists)
      if (error?.response?.status !== 401) {
        console.error("Token refresh error:", error);
      }
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.CURRENT_USER);
      return response.data.data;
    } catch (error) {
      // Only log unexpected errors (not 401 which is normal for unauthenticated users)
      if (error?.response?.status !== 401) {
        console.error("Get current user error:", error);
      }
      return null;
    }
  }

  // Helper method to check if user is authenticated
  isAuthenticated() {
    // This will be handled by checking if API calls return 401
    return true;
  }
}

export const authService = new AuthService();
