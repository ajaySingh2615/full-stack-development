import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important: This ensures cookies are sent with requests
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    // Since we're using HTTP-only cookies, no need to manually add auth headers

    // Only log non-auth requests to reduce console noise
    if (
      !config.url?.includes("/users/current") &&
      !config.url?.includes("/refresh-token")
    ) {
      console.log(
        `Making ${config.method?.toUpperCase()} request to: ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Flag to track if we're currently refreshing token to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor for handling token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't try to refresh if the request itself is a refresh-token request
      if (originalRequest.url?.includes("/refresh-token")) {
        // This means the refresh token itself is invalid/expired
        // Only redirect to login if user was previously authenticated
        // Check if user was logged in before (stored in localStorage)
        const wasAuthenticated =
          localStorage.getItem("wasAuthenticated") === "true";

        if (wasAuthenticated && window.location.pathname !== "/login") {
          console.log("Previous session expired. Redirecting to login.");
          localStorage.removeItem("wasAuthenticated");
          window.location.href = "/login";
        }
        // Silently handle case where no previous session exists (normal for new users)
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        await apiClient.post("/users/refresh-token");
        processQueue(null);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Only redirect if user was previously authenticated
        const wasAuthenticated =
          localStorage.getItem("wasAuthenticated") === "true";

        if (wasAuthenticated && window.location.pathname !== "/login") {
          console.log("Session expired. Redirecting to login.");
          localStorage.removeItem("wasAuthenticated");
          window.location.href = "/login";
        }
        // Silently handle refresh failures for unauthenticated users
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
