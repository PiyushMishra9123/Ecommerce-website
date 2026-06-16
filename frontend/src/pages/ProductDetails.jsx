import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="border rounded-lg p-6 shadow">
        <h1 className="text-4xl font-bold mb-4">
          {product.name}
        </h1>

        <p className="mb-4">
          {product.description}
        </p>

        <p className="text-2xl font-bold mb-2">
          ₹{product.price}
        </p>

        <p className="mb-2">
          Category: {product.category}
        </p>

        <p>
          Stock: {product.stock}
        </p>
        <button onClick={() => addToCart(product)} className="bg-black text-white px-4 py-2 rounded mt-4">
             Add To Cart </button>
      </div>
    </div>
  );
}

export default ProductDetails;