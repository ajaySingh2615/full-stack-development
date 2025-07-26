import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Shield,
  Truck,
  Heart,
  Star,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description:
        "All our products are sourced from organic farms and natural ingredients",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Rigorous testing and certification ensure the highest quality standards",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description:
        "Free shipping on orders over $50 with quick delivery nationwide",
    },
    {
      icon: Heart,
      title: "Health Focused",
      description: "Products designed to promote wellness and healthy living",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing quality products! I've been using their organic skincare line for months and my skin has never looked better.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Fast shipping and excellent customer service. The herbal supplements have really improved my energy levels.",
    },
    {
      name: "Emily Davis",
      rating: 5,
      text: "Love the eco-friendly packaging and the products are top quality. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-primary-100 px-4 py-2 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 mr-2" />
              Welcome to Natural Living
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-display text-natural-900 mb-6 leading-tight">
              Discover the Power of{" "}
              <span className="text-gradient-primary">Natural Products</span>
            </h1>

            <p className="text-xl text-natural-600 mb-8 leading-relaxed">
              Transform your lifestyle with our premium collection of organic,
              sustainably-sourced products that nurture your body and protect
              our planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={isAuthenticated ? "/products" : "/register"}
                className="btn-primary inline-flex items-center text-lg px-8 py-4"
              >
                {isAuthenticated ? "Shop Now" : "Get Started"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/about"
                className="btn-outline inline-flex items-center text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Leaf className="w-16 h-16 text-primary-500 transform rotate-12" />
        </div>
        <div className="absolute bottom-32 right-16 opacity-20">
          <Leaf className="w-12 h-12 text-secondary-500 transform -rotate-45" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-4">
              Why Choose Natural Products?
            </h2>
            <p className="text-lg text-natural-600 max-w-2xl mx-auto">
              We're committed to providing you with the finest natural products
              that support your health and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold font-display text-natural-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-natural-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold font-display mb-2">
                10K+
              </div>
              <div className="text-primary-100 font-medium">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold font-display mb-2">
                500+
              </div>
              <div className="text-primary-100 font-medium">
                Natural Products
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold font-display mb-2">
                99%
              </div>
              <div className="text-primary-100 font-medium">
                Satisfaction Rate
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold font-display mb-2">
                24/7
              </div>
              <div className="text-primary-100 font-medium">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-natural-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-natural-600">
              Join thousands of satisfied customers who trust us for their
              natural lifestyle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-secondary-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-natural-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-natural-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-natural-600">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
            Ready to Start Your Natural Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of health-conscious individuals and discover the
            difference natural products can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/products" : "/register"}
              className="bg-white text-primary-600 hover:bg-natural-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              {isAuthenticated ? "Browse Products" : "Join Now"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
