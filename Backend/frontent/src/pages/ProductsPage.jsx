import { useState } from "react";
import { Search, Filter, Star, ShoppingCart, Heart, Leaf } from "lucide-react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "skincare", name: "Natural Skincare" },
    { id: "supplements", name: "Herbal Supplements" },
    { id: "foods", name: "Organic Foods" },
    { id: "home", name: "Eco-Friendly Home" },
    { id: "wellness", name: "Health & Wellness" },
  ];

  const products = [
    {
      id: 1,
      name: "Organic Aloe Vera Gel",
      category: "skincare",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 127,
      image: "🧴",
      description:
        "Pure, organic aloe vera gel for soothing and hydrating skin.",
      tags: ["Organic", "Vegan", "Cruelty-Free"],
      inStock: true,
    },
    {
      id: 2,
      name: "Turmeric Curcumin Capsules",
      category: "supplements",
      price: 32.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 203,
      image: "💊",
      description:
        "High-potency turmeric with black pepper for maximum absorption.",
      tags: ["Non-GMO", "Gluten-Free", "Third-Party Tested"],
      inStock: true,
    },
    {
      id: 3,
      name: "Raw Organic Honey",
      category: "foods",
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.7,
      reviews: 89,
      image: "🍯",
      description:
        "Unfiltered, unpasteurized honey from local organic beekeepers.",
      tags: ["Raw", "Unfiltered", "Local"],
      inStock: true,
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set",
      category: "home",
      price: 15.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 156,
      image: "🪥",
      description: "Sustainable bamboo toothbrushes with soft bristles.",
      tags: ["Sustainable", "Biodegradable", "Zero Waste"],
      inStock: true,
    },
    {
      id: 5,
      name: "Lavender Essential Oil",
      category: "wellness",
      price: 28.99,
      originalPrice: 34.99,
      rating: 4.9,
      reviews: 92,
      image: "🫙",
      description:
        "Pure lavender essential oil for relaxation and aromatherapy.",
      tags: ["100% Pure", "Therapeutic Grade", "Steam Distilled"],
      inStock: false,
    },
    {
      id: 6,
      name: "Organic Green Tea",
      category: "foods",
      price: 21.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 134,
      image: "🍵",
      description: "Premium organic green tea leaves with antioxidants.",
      tags: ["Organic", "Fair Trade", "Loose Leaf"],
      inStock: true,
    },
    {
      id: 7,
      name: "Natural Face Moisturizer",
      category: "skincare",
      price: 42.99,
      originalPrice: 49.99,
      rating: 4.7,
      reviews: 78,
      image: "🧴",
      description: "Hydrating face moisturizer with natural botanicals.",
      tags: ["All Natural", "Sensitive Skin", "Anti-Aging"],
      inStock: true,
    },
    {
      id: 8,
      name: "Ashwagandha Root Powder",
      category: "supplements",
      price: 26.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 167,
      image: "💊",
      description: "Adaptogenic herb powder for stress support and wellness.",
      tags: ["Adaptogenic", "Stress Support", "Ancient Remedy"],
      inStock: true,
    },
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.reviews - a.reviews; // popular = most reviews
      }
    });

  return (
    <div className="min-h-screen bg-natural-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-natural-900 mb-4">
              Natural <span className="text-gradient-primary">Products</span>
            </h1>
            <p className="text-xl text-natural-600">
              Discover our curated collection of premium natural and organic
              products
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-natural-200">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-natural-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-natural-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field min-w-[180px]"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-[150px]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-natural-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card group hover:shadow-xl transition-shadow duration-200"
              >
                {/* Product Image */}
                <div className="relative p-6 text-center">
                  <div className="text-6xl mb-4">{product.image}</div>
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Sale
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-3 right-3 bg-natural-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Heart className="w-4 h-4 text-natural-600 hover:text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6 pt-0">
                  <h3 className="font-semibold text-natural-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-natural-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                      >
                        <Leaf className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-secondary-500 fill-current"
                              : "text-natural-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-natural-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-natural-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-natural-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      product.inStock
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-natural-300 text-natural-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-natural-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-natural-700 mb-2">
                No products found
              </h3>
              <p className="text-natural-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
