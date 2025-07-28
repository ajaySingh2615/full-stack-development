import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Natural Way", "Green Valley, CA 90210", "United States"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Toll-free: 1-800-NATURAL"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@naturalproducts.com", "support@naturalproducts.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-natural-900 mb-6">
              Get in <span className="text-gradient-primary">Touch</span>
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed">
              Have questions about our products or need personalized
              recommendations? We're here to help you on your natural living
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="card p-6 text-center group hover:shadow-lg transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-natural-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-natural-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-natural-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="card p-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-6 h-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold font-display text-natural-900">
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        type="text"
                        className={`input-field ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-natural-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        type="text"
                        className={`input-field ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className={`input-field ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="input-field"
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register("subject", {
                        required: "Please select a subject",
                      })}
                      className={`input-field ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="general-question">General Question</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-natural-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      rows={5}
                      className={`input-field resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map/Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="card p-8">
                <h3 className="text-xl font-semibold font-display text-natural-900 mb-4">
                  Visit Our Store
                </h3>
                <div className="bg-natural-200 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-natural-500 mx-auto mb-2" />
                    <p className="text-natural-600">Interactive Map</p>
                    <p className="text-sm text-natural-500">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-natural-600">
                  <p>
                    <strong>Address:</strong> 123 Natural Way, Green Valley, CA
                    90210
                  </p>
                  <p>
                    <strong>Parking:</strong> Free parking available
                  </p>
                  <p>
                    <strong>Public Transit:</strong> Metro Line 5, Green Valley
                    Station
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="card p-8">
                <h3 className="text-xl font-semibold font-display text-natural-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-natural-900 mb-1">
                      How quickly do you respond to inquiries?
                    </h4>
                    <p className="text-sm text-natural-600">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-natural-900 mb-1">
                      Do you offer product consultations?
                    </h4>
                    <p className="text-sm text-natural-600">
                      Yes! Our experts can help you find the perfect natural
                      products for your needs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-natural-900 mb-1">
                      Can I visit your store in person?
                    </h4>
                    <p className="text-sm text-natural-600">
                      Absolutely! We'd love to meet you. Check our business
                      hours above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
