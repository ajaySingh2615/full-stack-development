# 🔐 **Google OAuth Implementation Plan**

This guide provides a comprehensive plan for implementing Google OAuth authentication for both backend and frontend. This will allow users to sign in with their Google accounts.

## 📋 **Implementation Overview**

### **Backend (Node.js/Express)**

1. **Install Google OAuth dependencies**
2. **Create Google OAuth routes and controllers**
3. **Update User model to support Google accounts**
4. **Handle Google OAuth flow**

### **Frontend (React)**

1. **Install Google OAuth client library**
2. **Create Google Sign-In component**
3. **Update authentication context**
4. **Integrate with existing login flow**

---

## 🛠 **Backend Implementation**

### **Step 1: Install Dependencies**

```bash
cd myTube
npm install google-auth-library
```

### **Step 2: Create Google OAuth Configuration**

**File: `myTube/src/config/google.config.js`**

```javascript
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export { googleClient };
```

### **Step 3: Update User Model**

**File: `myTube/src/models/user.models.js`**

```javascript
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: function () {
        return !this.googleId;
      }, // Required only if not Google user
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: false,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }, // Required only if not Google user
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // short lived access token
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // long lived access token
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

export const User = mongoose.model("User", userSchema);
```

### **Step 4: Create Google OAuth Controller**

**File: `myTube/src/controllers/googleAuth.controllers.js`**

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { googleClient } from "../config/google.config.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate access and refresh token");
  }
};

const googleSignIn = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    throw new ApiError(400, "Google ID token is required");
  }

  try {
    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    if (!user) {
      // Create new user
      user = await User.create({
        fullname: name,
        email,
        googleId,
        avatar: picture,
        username:
          email.split("@")[0] + "_" + Math.random().toString(36).substr(2, 5), // Generate unique username
      });
    } else if (!user.googleId) {
      // Link existing email account with Google
      user.googleId = googleId;
      if (!user.avatar) {
        user.avatar = picture;
      }
      await user.save();
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "Google sign-in successful"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid Google token");
  }
});

export { googleSignIn };
```

### **Step 5: Create Google OAuth Routes**

**File: `myTube/src/routes/googleAuth.routes.js`**

```javascript
import { Router } from "express";
import { googleSignIn } from "../controllers/googleAuth.controllers.js";

const router = Router();

router.route("/google-signin").post(googleSignIn);

export default router;
```

### **Step 6: Update Main App Routes**

**File: `myTube/src/app.js`**

```javascript
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import googleAuthRoutes from "./routes/googleAuth.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", googleAuthRoutes);
app.use("/api/v1/healthcheck", healthcheckRoutes);

export { app };
```

---

## 🎨 **Frontend Implementation**

### **Step 1: Install Google OAuth Client**

```bash
cd frontent
npm install @react-oauth/google react-icons
```

### **Step 2: Update Main App with Google Provider**

**File: `frontent/src/main.jsx`**

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#374151",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
```

### **Step 3: Create Google Sign-In Component**

**File: `frontent/src/components/auth/GoogleSignIn.jsx`**

```javascript
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleSignIn = () => {
  const { googleLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await googleLogin(tokenResponse.access_token);
        if (result.success) {
          toast.success("Successfully signed in with Google!");
          navigate("/products");
        }
      } catch (error) {
        toast.error("Google sign-in failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-natural-300 rounded-lg shadow-sm bg-white text-natural-700 hover:bg-natural-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleSignIn;
```

### **Step 4: Update Auth Service**

**File: `frontent/src/services/authService.js`**

```javascript
import { apiClient } from "./apiClient";

const AUTH_ENDPOINTS = {
  REGISTER: "/users/register",
  LOGIN: "/users/login",
  LOGOUT: "/users/logout",
  REFRESH_TOKEN: "/users/refresh-token",
  CURRENT_USER: "/users/current",
  GOOGLE_SIGNIN: "/users/google-signin",
};

class AuthService {
  async register(userData) {
    try {
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

  async googleLogin(accessToken) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.GOOGLE_SIGNIN, {
        idToken: accessToken,
      });

      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Google login error:", error);
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
      if (error?.response?.status !== 401) {
        console.error("Get current user error:", error);
      }
      return null;
    }
  }

  isAuthenticated() {
    return true;
  }
}

export const authService = new AuthService();
```

### **Step 5: Update Auth Context**

**File: `frontent/src/context/AuthContext.jsx`**

```javascript
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("wasAuthenticated", "true");
      }
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error("Auth check failed:", error);
      }
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const result = await authService.login(credentials);

      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("wasAuthenticated", "true");
        toast.success("Successfully logged in!");
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const result = await authService.register(userData);

      if (result.success) {
        toast.success("Registration successful! Please log in.");
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false };
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
      localStorage.removeItem("wasAuthenticated");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    googleLogin,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### **Step 6: Update Login Page**

**File: `frontent/src/pages/auth/LoginPage.jsx`**

```javascript
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Leaf } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import GoogleSignIn from "../../components/auth/GoogleSignIn";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const isEmail = data.email.includes("@");

    const loginData = {
      password: data.password,
      ...(isEmail ? { email: data.email } : { username: data.email }),
    };

    const result = await login(loginData);
    if (result.success) {
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-primary-100 rounded-full">
              <Leaf className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold font-display text-natural-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-natural-600">
            Sign in to your account to continue shopping for natural products
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email or Username */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-natural-700 mb-2"
              >
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-natural-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email or username is required",
                    validate: (value) => {
                      if (!value.trim()) return "Email or username is required";
                      return true;
                    },
                  })}
                  type="text"
                  className={`input-field pl-10 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your email or username"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-natural-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-natural-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`input-field pl-10 pr-10 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-natural-400 hover:text-natural-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-natural-400 hover:text-natural-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner size="small" text="" /> : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-natural-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-natural-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign-In */}
          <GoogleSignIn />

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-natural-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>
        </form>

        {/* Features */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-natural-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-natural-500">
                Why choose us?
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full"></div>
              <p className="text-sm text-natural-600">
                100% Natural & Organic Products
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-secondary-500 rounded-full"></div>
              <p className="text-sm text-natural-600">Sustainably Sourced</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full"></div>
              <p className="text-sm text-natural-600">
                Free Shipping on Orders $50+
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
```

---

## 🔧 **Environment Variables**

### **Backend (myTube/.env)**

```env
# ... existing variables
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### **Frontend (frontent/.env)**

```env
# ... existing variables
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## 📝 **Google OAuth Setup Steps**

1. **Go to Google Cloud Console** (https://console.cloud.google.com/)
2. **Create a new project or select existing**
3. **Enable Google+ API**
4. **Go to Credentials → Create Credentials → OAuth 2.0 Client ID**
5. **Configure OAuth consent screen**
6. **Add authorized origins:**
   - `http://localhost:3000` (frontend)
   - `http://localhost:8000` (backend)
7. **Add authorized redirect URIs:**
   - `http://localhost:3000`
8. **Copy Client ID and Client Secret**

---

## 🚀 **Implementation Order**

1. **Backend Setup** (Steps 1-6)
2. **Frontend Setup** (Steps 1-6)
3. **Google OAuth Configuration**
4. **Testing**

This implementation provides a complete Google OAuth flow that integrates seamlessly with your existing authentication system! 🎉
