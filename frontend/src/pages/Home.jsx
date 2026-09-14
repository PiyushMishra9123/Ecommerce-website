import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  const [searchMode, setSearchMode] = useState("recent");

  const searchRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { addToCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  const heroImages = [
    "/images/banner1.png",
    "/images/banner2.jpg",
    "/images/banner3.avif",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const allCategories = [...new Set(products.map((p) => p.category))];

  const matchedCategories = [
    ...new Set(
      products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        )
        .map((p) => p.category)
    ),
  ];

  const categories =
    search.trim() === ""
      ? ["All", ...allCategories]
      : ["All", ...matchedCategories];

  const filteredProducts = products.filter((product) => {
    const keyword = search.trim().toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.price.toString().includes(keyword);

    const categoryMatch =
      category === "All" ? true : product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}

      <section
        className="relative h-[300px] sm:h-[420px] lg:h-[560px] bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${heroImages[currentSlide]})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-10">
          <div className="max-w-xl text-white">
            <span className="inline-block bg-yellow-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              🔥 Biggest Sale 2026
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
              Big Shopping Festival
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-xl text-gray-200 leading-relaxed">
              Up To
              <span className="font-bold text-yellow-300"> 70% OFF </span>
              on Mobiles, Fashion, Electronics & Accessories.
            </p>

            <button
              onClick={() => {
                document
                  .getElementById("products-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-5 sm:mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg transition"
            >
              Shop Now →
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-7 bg-yellow-400"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= SEARCH SECTION ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div
          ref={searchRef}
          className="relative bg-white rounded-2xl shadow-2xl p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onFocus={() => {
                setShowSuggestions(true);

                if (search.trim() === "") {
                  setSearchMode("recent");
                }
              }}
              onChange={(e) => {
                const value = e.target.value;

                setSearch(value);

                if (value.trim() === "") {
                  setSearchMode("recent");
                  setSearchSuggestions([]);
                  return;
                }

                setSearchMode("category");

                const suggestions = [
                  ...new Set(
                    products
                      .filter(
                        (product) =>
                          product.name
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          product.category
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          product.description
                            .toLowerCase()
                            .includes(value.toLowerCase())
                      )
                      .map((product) => product.category)
                  ),
                ];

                setSearchSuggestions(suggestions);
                setShowSuggestions(true);
              }}
              className="w-full min-w-0 outline-none text-base sm:text-lg"
            />
          </div>

          {/* Recent Searches */}

          {showSuggestions &&
            searchMode === "recent" &&
            recentSearches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border z-50 p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-500">
                    🕒 Recent Searches
                  </h3>

                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem("recentSearches");
                    }}
                    className="text-red-500 text-sm hover:underline self-start sm:self-auto"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {recentSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearch(item);
                        setCategory(item);
                        setShowSuggestions(false);
                      }}
                      className="px-3 sm:px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Search Suggestions */}

          {showSuggestions &&
            search.trim() !== "" &&
            searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                {searchSuggestions.map((categoryName) => (
                  <div
                    key={categoryName}
                    onClick={() => {
                      setCategory(categoryName);
                      setSearch(categoryName);
                      setShowSuggestions(false);

                      if (!recentSearches.includes(categoryName)) {
                        const updated = [
                          categoryName,
                          ...recentSearches,
                        ].slice(0, 5);

                        setRecentSearches(updated);
                      }
                    }}
                    className="p-3 sm:p-4 hover:bg-gray-100 cursor-pointer border-b"
                  >
                    <h3 className="font-semibold text-base sm:text-lg">
                      📂 {categoryName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {
                        products.filter(
                          (p) => p.category === categoryName
                        ).length
                      }{" "}
                      Products
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">
          Shop By Category
        </h2>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);

                if (cat === "All") {
                  setSearch("");
                  fetchProducts();
                }
              }}
              className={`flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                category === cat
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}

      <div
        id="products-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
              🔥 Trending Products
            </h2>

            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              Showing{" "}
              <span className="font-bold text-black">
                {filteredProducts.length}
              </span>{" "}
              Products
            </p>
          </div>
        </div>

        {/* Product Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 text-center max-w-lg w-full">
                <div className="text-6xl sm:text-7xl mb-4 sm:mb-5">
                  🔍
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  No Products Found
                </h2>

                <p className="text-gray-500 mb-6 sm:mb-8">
                  Try another keyword or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden group hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                {/* Discount Badge */}

                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  <span className="bg-red-600 text-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-bold">
                    20% OFF
                  </span>
                </div>

                {/* Wishlist */}

                <button className="absolute right-3 top-3 bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow flex items-center justify-center hover:bg-red-500 hover:text-white transition z-10">
                  ❤
                </button>

                {/* Product Image */}

                <div className="h-48 sm:h-56 bg-gradient-to-br from-slate-50 to-indigo-50 flex justify-center items-center overflow-hidden">
                  <img
                    src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
                    alt={product.name}
                    className="h-40 sm:h-48 max-w-full object-contain group-hover:scale-110 group-hover:rotate-2 transition duration-500"
                  />
                </div>

                {/* Product Details */}

                <div className="p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold truncate">
                    {product.category}
                  </p>

                  <h2 className="text-lg sm:text-xl font-extrabold mt-2 line-clamp-2 text-slate-900 group-hover:text-indigo-600 transition">
                    {product.name}
                  </h2>

                  <div className="flex flex-wrap items-center mt-2 gap-2">
                    <span className="bg-emerald-500 text-white text-xs sm:text-sm px-2.5 py-1 rounded-lg font-bold">
                      4.5 ★
                    </span>

                    <span className="text-gray-500 text-xs sm:text-sm">
                      (245 Reviews)
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      ₹{product.price}
                    </span>

                    <span className="text-gray-400 line-through text-sm sm:text-base">
                      ₹{Math.round(product.price * 1.25)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="text-green-600 text-sm font-semibold">
                      🚚 Free Delivery
                    </span>
                  </div>

                  <p className="text-gray-500 mt-3 text-sm h-10 overflow-hidden">
                    {product.description}
                  </p>

                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs inline-block">
                      🎁 Buy 2 Get 10% OFF
                    </span>
                  </div>

                  {/* Stock */}

                  <div className="mt-4">
                    {product.stock > 10 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Only {product.stock} Left
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Out Of Stock
                      </span>
                    )}
                  </div>

                  {/* Buttons */}

                  <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
                    {product.stock > 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2.5 sm:py-3 rounded-xl transition duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                      >
                        🛒 Add To Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white font-bold py-2.5 sm:py-3 rounded-xl cursor-not-allowed text-sm sm:text-base"
                      >
                        Out Of Stock
                      </button>
                    )}

                    <Link
                      to={`/product/${product._id}`}
                      className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 sm:py-3 rounded-xl transition duration-300 text-sm sm:text-base"
                    >
                      👁 View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;