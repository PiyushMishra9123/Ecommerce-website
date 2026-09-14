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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Product Card */}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14 p-5 sm:p-8 lg:p-12">

            {/* ================= IMAGE SECTION ================= */}

            <div className="flex flex-col gap-5">

              <div className="relative min-h-[400px] sm:min-h-[500px] rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 border border-slate-100 flex items-center justify-center overflow-hidden group">

                {/* Decorative circles */}

                <div className="absolute -top-20 -right-20 w-56 h-56 bg-indigo-200/30 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl"></div>

                {/* Product Image */}

                <img
                  src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
                  alt={product.name}
                  className="relative z-10 max-h-[420px] max-w-[90%] object-contain transition duration-500 group-hover:scale-105 drop-shadow-xl"
                />

                {/* Category Badge */}

                <div className="absolute top-5 left-5 z-20">

                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-sm text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {product.category}
                  </span>

                </div>

              </div>

              {/* Small Info */}

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                  <div className="text-xl mb-1">🚚</div>

                  <p className="text-xs font-semibold text-slate-700">
                    Fast Delivery
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                  <div className="text-xl mb-1">🔒</div>

                  <p className="text-xs font-semibold text-slate-700">
                    Secure Payment
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                  <div className="text-xl mb-1">↩️</div>

                  <p className="text-xs font-semibold text-slate-700">
                    Easy Returns
                  </p>
                </div>

              </div>

            </div>

            {/* ================= DETAILS SECTION ================= */}

            <div className="flex flex-col justify-center">

              {/* Category */}

              <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-3">
                {product.category}
              </p>

              {/* Product Name */}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="flex flex-wrap items-center gap-3 mb-6">

                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                  4.5 ★
                </span>

                <span className="text-sm text-slate-500 font-medium">
                  12,345 Ratings
                </span>

                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>

                <span className="text-sm text-emerald-600 font-semibold">
                  Highly Rated
                </span>

              </div>

              {/* Divider */}

              <div className="h-px bg-slate-100 mb-6"></div>

              {/* Price */}

              <div className="mb-6">

                <p className="text-sm text-slate-500 mb-1">
                  Price
                </p>

                <div className="flex items-end gap-3">

                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                    ₹{product.price}
                  </span>

                  <span className="text-sm text-emerald-600 font-bold mb-2">
                    Inclusive of all taxes
                  </span>

                </div>

              </div>

              {/* Description */}

              <div className="mb-7">

                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  About this product
                </h2>

                <p className="text-slate-600 leading-7">
                  {product.description}
                </p>

              </div>

              {/* Product Info */}

              <div className="grid grid-cols-2 gap-4 mb-8">

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Category
                  </p>

                  <p className="font-bold text-slate-800">
                    {product.category}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Availability
                  </p>

                  <p
                    className={`font-bold ${
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
                      className="flex-1 py-4 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition duration-300 hover:-translate-y-0.5"
                    >
                      🛒 Add To Cart
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5"
                    >
                      Buy Now →
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-xl bg-slate-200 text-slate-500 font-bold cursor-not-allowed"
                  >
                    Out Of Stock
                  </button>
                )}

              </div>

              {/* Bottom Trust Text */}

              {product.stock > 0 && (
                <p className="text-xs text-slate-400 text-center mt-5">
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