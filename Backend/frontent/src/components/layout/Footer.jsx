import { Link } from "react-router-dom";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-natural-900 text-natural-100">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Natural Products
              </span>
            </div>
            <p className="text-natural-300 text-sm leading-relaxed">
              Your trusted source for premium natural and organic products.
              We're committed to sustainable living and healthy choices for you
              and your family.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-natural-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-natural-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-natural-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-display text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Products", path: "/products" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-natural-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-display text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Organic Foods",
                "Natural Skincare",
                "Herbal Supplements",
                "Eco-Friendly Home",
                "Green Living",
                "Health & Wellness",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-natural-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-display text-white">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <p className="text-natural-300 text-sm">
                  123 Natural Way
                  <br />
                  Green Valley, CA 90210
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <p className="text-natural-300 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <p className="text-natural-300 text-sm">
                  hello@naturalproducts.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-natural-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-natural-400 text-sm">
            © {currentYear} Natural Products. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-natural-400 hover:text-primary-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-natural-400 hover:text-primary-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-natural-400 hover:text-primary-400 transition-colors duration-200 text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
