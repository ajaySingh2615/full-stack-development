import { Loader } from "lucide-react";

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <Loader
          className={`${sizeClasses[size]} animate-spin text-primary-600`}
          strokeWidth={2}
        />
      </div>

      {text && (
        <p className="text-natural-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
