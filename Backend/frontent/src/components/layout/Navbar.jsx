import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/");
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const authenticatedLinks = [{ path: "/products", label: "Products" }];

  return (
    <nav className="bg-white shadow-lg border-b border-natural-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
              <Leaf className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-xl font-bold font-display text-gradient-primary">
              Natural Products
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePath(link.path)
                    ? "bg-primary-100 text-primary-700"
                    : "text-natural-700 hover:bg-natural-100 hover:text-primary-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated &&
              authenticatedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActivePath(link.path)
                      ? "bg-primary-100 text-primary-700"
                      : "text-natural-700 hover:bg-natural-100 hover:text-primary-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-natural-100 rounded-lg">
                  <User className="w-4 h-4 text-natural-600" />
                  <span className="text-sm font-medium text-natural-700">
                    {user?.fullname || user?.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-natural-600 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-natural-600 hover:text-primary-600 hover:bg-natural-100 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-natural-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActivePath(link.path)
                      ? "bg-primary-100 text-primary-700"
                      : "text-natural-700 hover:bg-natural-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated &&
                authenticatedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActivePath(link.path)
                        ? "bg-primary-100 text-primary-700"
                        : "text-natural-700 hover:bg-natural-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              <div className="pt-4 border-t border-natural-200 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-natural-100 rounded-lg">
                      <User className="w-4 h-4 text-natural-600" />
                      <span className="text-sm font-medium text-natural-700">
                        {user?.fullname || user?.username}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-1 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full btn-primary text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
