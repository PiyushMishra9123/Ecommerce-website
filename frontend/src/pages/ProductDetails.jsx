import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`,
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl font-bold">Loading... </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-white rounded-2xl p-6 flex items-center justify-center border">
            <img
              src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
              alt={product.name}
              className="max-h-[500px] w-auto object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <p className="text-gray-600 mb-5">{product.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded">
                4.5 ★
              </span>

              <span className="text-gray-500">12,345 Ratings</span>
            </div>

            <h2 className="text-4xl font-bold text-green-600 mb-4">
              ₹{product.price}
            </h2>

            <p className="mb-2 text-lg">
              Category:
              <span className="font-semibold ml-2">{product.category}</span>
            </p>

            <p className="mb-6 text-lg">
              Stock:
              <span className="font-semibold ml-2">{product.stock}</span>
            </p>

            <div className="flex gap-4 mt-6">
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-yellow-500 text-white px-8 py-3 rounded-lg"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg"
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-8 py-3 rounded-lg cursor-not-allowed"
                >
                  Out Of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
