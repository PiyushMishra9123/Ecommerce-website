import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        All Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p>{product.description}</p>

            <p className="font-bold">
              ₹{product.price}
            </p>

            <p>
              Category: {product.category}
            </p>
            <Link to={`/product/${product._id}`}className="bg-black text-white px-4 py-2 rounded inline-block mt-3"> View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;