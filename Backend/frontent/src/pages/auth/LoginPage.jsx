import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Leaf } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import GoogleSignIn from "../../pages/auth/GoogleSignIn";

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
