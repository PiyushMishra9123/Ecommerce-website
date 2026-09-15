import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-600 font-semibold">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-6 sm:py-8 lg:py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 p-4 sm:p-8 lg:p-12">

            {/* ================= IMAGE SECTION ================= */}

            <div className="flex flex-col gap-4 sm:gap-5">

              <div className="relative h-[320px] sm:h-[450px] lg:min-h-[500px] lg:h-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 border border-slate-100 flex items-center justify-center overflow-hidden group">

                {/* Decorative circles */}

                <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-40 h-40 sm:w-56 sm:h-56 bg-indigo-200/30 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-40 h-40 sm:w-56 sm:h-56 bg-purple-200/30 rounded-full blur-3xl"></div>

                {/* Product Image */}

                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-[270px] sm:max-h-[380px] lg:max-h-[420px] max-w-[82%] sm:max-w-[90%] object-contain transition duration-500 group-hover:scale-105 drop-shadow-xl"
                />

                {/* Category Badge */}

                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 max-w-[70%]">
                  <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 truncate">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Small Info */}

              <div className="grid grid-cols-3 gap-2 sm:gap-3">

                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-2.5 sm:p-4 text-center">
                  <div className="text-lg sm:text-xl mb-1">
                    🚚
                  </div>

                  <p className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">
                    Fast Delivery
                  </p>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-2.5 sm:p-4 text-center">
                  <div className="text-lg sm:text-xl mb-1">
                    🔒
                  </div>

                  <p className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">
                    Secure Payment
                  </p>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-2.5 sm:p-4 text-center">
                  <div className="text-lg sm:text-xl mb-1">
                    ↩️
                  </div>

                  <p className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">
                    Easy Returns
                  </p>
                </div>

              </div>
            </div>

            {/* ================= DETAILS SECTION ================= */}

            <div className="flex flex-col justify-center">

              {/* Category */}

              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-2 sm:mb-3">
                {product.category}
              </p>

              {/* Product Name */}

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 sm:mb-5 break-words">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">

                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm">
                  4.5 ★
                </span>

                <span className="text-xs sm:text-sm text-slate-500 font-medium">
                  12,345 Ratings
                </span>

                <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>

                <span className="text-xs sm:text-sm text-emerald-600 font-semibold">
                  Highly Rated
                </span>

              </div>

              {/* Divider */}

              <div className="h-px bg-slate-100 mb-5 sm:mb-6"></div>

              {/* Price */}

              <div className="mb-5 sm:mb-6">

                <p className="text-sm text-slate-500 mb-1">
                  Price
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3">

                  <span className="text-3xl sm:text-5xl font-extrabold text-slate-900">
                    ₹{product.price}
                  </span>

                  <span className="text-xs sm:text-sm text-emerald-600 font-bold sm:mb-2">
                    Inclusive of all taxes
                  </span>

                </div>
              </div>

              {/* Description */}

              <div className="mb-6 sm:mb-7">

                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  About this product
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7 break-words">
                  {product.description}
                </p>

              </div>

              {/* Product Info */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">

                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-3 sm:p-4">

                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Category
                  </p>

                  <p className="font-bold text-sm sm:text-base text-slate-800 break-words">
                    {product.category}
                  </p>

                </div>

                <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-3 sm:p-4">

                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Availability
                  </p>

                  <p
                    className={`font-bold text-sm sm:text-base ${
                      product.stock > 0
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </p>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-3">

                {product.stock > 0 ? (
                  <>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                      🛒 Add To Cart
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="flex-1 py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                      Buy Now →
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-slate-200 text-slate-500 font-bold cursor-not-allowed"
                  >
                    Out Of Stock
                  </button>
                )}

              </div>

              {/* Bottom Trust Text */}

              {product.stock > 0 && (
                <p className="text-[10px] sm:text-xs text-slate-400 text-center mt-4 sm:mt-5 leading-5">
                  🔒 Secure checkout • 🚚 Fast delivery • ↩️ Easy returns
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;