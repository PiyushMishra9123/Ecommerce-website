import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showStockModal, setShowStockModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newStock, setNewStock] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/products/myproducts",
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `https://ecommerce-website-00z8.onrender.com/api/products/myproducts/${deleteId}`,
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      fetchProducts();

      setShowDeleteModal(false);

      toast.success("🗑 Product Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const updateStock = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock);
    setShowStockModal(true);
  };

  const saveStock = async () => {
    try {
      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/products/myproducts/${selectedProduct._id}/stock`,
        {
          stock: Number(newStock),
        },
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      fetchProducts();

      setShowStockModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ? true : product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">My Products</h1>

        {/* Search */}

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-5"
        />

        {/* Categories */}

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-lg ${
                category === cat ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-60 flex justify-center items-center bg-gray-100">
                <img
                  src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-bold">{product.name}</h2>

                <p className="text-green-600 text-xl font-bold mt-2">
                  ₹{product.price}
                </p>

                <p className="mt-2">
                  <b>Category :</b> {product.category}
                </p>

                <p className="mt-2">
                  <b>Stock :</b> {product.stock}
                </p>

                <p className="mt-3 text-gray-600">{product.description}</p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateStock(product)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                  >
                    Update Stock
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(product._id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showStockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[400px]">
            <h2 className="text-2xl font-bold mb-3">Update Stock</h2>

            <p className="text-gray-600 mb-5">
              How many items do you want to keep in stock?
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setNewStock((prev) => Math.max(0, Number(prev) - 1))
                }
                className="w-12 h-12 bg-red-500 text-white rounded-lg text-2xl"
              >
                -
              </button>

              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="flex-1 border rounded-lg p-3 text-center text-2xl"
              />

              <button
                onClick={() => setNewStock((prev) => Number(prev) + 1)}
                className="w-12 h-12 bg-green-500 text-white rounded-lg text-2xl"
              >
                +
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={saveStock}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Delete Product
            </h2>

            <p className="text-gray-600 mb-8">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                className="px-5 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={deleteProduct}
                className="px-5 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProducts;
