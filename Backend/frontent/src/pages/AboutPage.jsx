import { Leaf, Award, Users, Globe, Heart, Target } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We're committed to eco-friendly practices and supporting sustainable agriculture.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Every product is carefully selected and tested to meet our high standards.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a community of health-conscious individuals who care about the planet.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Making a positive impact on communities and environments worldwide.",
    },
  ];

  const team = [
    {
      name: "Alexandra Green",
      position: "Founder & CEO",
      description:
        "Passionate about natural living with 15+ years in organic farming.",
      image: "👩‍💼",
    },
    {
      name: "Marcus Chen",
      position: "Head of Product",
      description: "Expert in sustainable sourcing and product development.",
      image: "👨‍💼",
    },
    {
      name: "Elena Rodriguez",
      position: "Quality Assurance Director",
      description: "Ensures every product meets our strict quality standards.",
      image: "👩‍🔬",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-natural-900 mb-6">
              About{" "}
              <span className="text-gradient-primary">Natural Products</span>
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed">
              We're on a mission to make natural, organic products accessible to
              everyone. Founded in 2015, we've been dedicated to promoting
              healthy living and environmental sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-natural-700 leading-relaxed">
                <p>
                  It all started when our founder, Alexandra, struggled to find
                  truly natural products for her family. Frustrated by the lack
                  of transparency and quality in the market, she decided to
                  create a solution.
                </p>
                <p>
                  What began as a small local business has grown into a trusted
                  brand serving thousands of customers nationwide. We partner
                  directly with organic farmers and sustainable producers to
                  bring you the finest natural products.
                </p>
                <p>
                  Today, we're proud to be part of a movement that's changing
                  how people think about their health, their families, and their
                  impact on the planet.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="card p-6 text-center">
                  <Heart className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold font-display text-natural-900">
                    10K+
                  </div>
                  <div className="text-sm text-natural-600">Happy Families</div>
                </div>
                <div className="card p-6 text-center">
                  <Target className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold font-display text-natural-900">
                    99%
                  </div>
                  <div className="text-sm text-natural-600">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="card p-6 text-center">
                  <Leaf className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold font-display text-natural-900">
                    500+
                  </div>
                  <div className="text-sm text-natural-600">
                    Natural Products
                  </div>
                </div>
                <div className="card p-6 text-center">
                  <Globe className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold font-display text-natural-900">
                    50+
                  </div>
                  <div className="text-sm text-natural-600">Partner Farms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-natural-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-natural-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product selection to
              customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card p-6 text-center group hover:shadow-xl transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold font-display text-natural-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-natural-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              To make natural, sustainable products accessible to everyone,
              while supporting communities and protecting our planet for future
              generations. We believe that healthy living shouldn't come at the
              expense of environmental health.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-natural-600">
              Passionate individuals dedicated to bringing you the best natural
              products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold font-display text-natural-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-natural-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-natural-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-natural-900 mb-4">
              Certifications & Partnerships
            </h2>
            <p className="text-lg text-natural-600">
              We work with certified organic farms and trusted partners
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "USDA Organic",
              "Fair Trade Certified",
              "Non-GMO Project",
              "Rainforest Alliance",
            ].map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-primary-600" />
                </div>
                <p className="font-medium text-natural-900">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
