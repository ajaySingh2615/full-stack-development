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
