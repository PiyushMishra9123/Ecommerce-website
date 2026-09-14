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
    if (userInfo?.token) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/products/myproducts",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
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
        }
      );

      fetchProducts();

      setShowDeleteModal(false);
      setDeleteId(null);

      toast.success("Product Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const updateStock = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock);
    setShowStockModal(true);
  };

  const saveStock = async () => {
    if (Number(newStock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

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
        }
      );

      fetchProducts();

      setShowStockModal(false);
      setSelectedProduct(null);

      toast.success("Stock Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Stock Update Failed");
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ? true : product.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-7 sm:mb-10">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
            Seller Inventory
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                My Products
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Manage your products, stock and inventory.
              </p>
            </div>

            <div className="w-full md:w-auto px-5 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between md:justify-start gap-2">
              <span className="text-sm text-slate-500 font-semibold">
                Total Products
              </span>

              <span className="text-xl font-black text-indigo-600">
                {products.length}
              </span>
            </div>

          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="premium-card p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8">

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

            {/* SEARCH */}
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                Search Products
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-modern pl-11"
                />
              </div>
            </div>

            {/* RESULT COUNT */}
            <div className="flex items-end">
              <div className="w-full lg:w-auto px-5 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm text-center">
                {filteredProducts.length} Results
              </div>
            </div>

          </div>

          {/* CATEGORIES */}
          <div className="mt-5 sm:mt-6">

            <p className="text-xs sm:text-sm font-bold text-slate-700 mb-3">
              Categories
            </p>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                    category === cat
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {cat}
                </button>
              ))}

            </div>
          </div>

        </div>

        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">

            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 overflow-hidden transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
              >

                {/* IMAGE */}
                <div className="h-52 sm:h-56 lg:h-60 bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden">

                  {product.image ? (
                    <img
                      src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-contain p-5 sm:p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-slate-400 text-sm font-semibold">
                      No Image Available
                    </div>
                  )}

                </div>

                {/* PRODUCT INFO */}
                <div className="p-4 sm:p-6">

                  <div className="flex items-start justify-between gap-3">

                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-indigo-600 font-black break-words">
                      {product.category}
                    </span>

                    <span
                      className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold ${
                        product.stock > 0
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>

                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 line-clamp-1 group-hover:text-indigo-600 transition">
                    {product.name}
                  </h2>

                  {/* PRICE */}
                  <div className="mt-3">
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* STOCK */}
                  <div className="flex items-center justify-between mt-4 p-3 rounded-xl bg-slate-50">

                    <span className="text-xs sm:text-sm font-semibold text-slate-500">
                      Available Stock
                    </span>

                    <span className="text-base sm:text-lg font-black text-slate-900">
                      {product.stock}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-6">

                    <button
                      onClick={() => updateStock(product)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-100 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Update Stock
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(product._id);
                        setShowDeleteModal(true);
                      }}
                      className="sm:px-5 py-3 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="premium-card py-16 sm:py-20 px-5 text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-4xl">
              📦
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-5">
              No Products Found
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
              {search
                ? "Try searching with a different product name."
                : "You haven't added any products yet."}
            </p>

          </div>
        )}

      </div>

      {/* ================= STOCK MODAL ================= */}

      {showStockModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 w-full max-w-md shadow-2xl my-auto">

            <div className="flex items-start justify-between gap-4 mb-2">

              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600">
                  Inventory
                </p>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Update Stock
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowStockModal(false);
                  setSelectedProduct(null);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition font-bold"
              >
                ✕
              </button>

            </div>

            <p className="text-sm sm:text-base text-slate-500 mt-4 mb-6 leading-6">
              Update the available quantity for{" "}
              <span className="font-bold text-slate-800 break-words">
                {selectedProduct?.name}
              </span>
              .
            </p>

            {/* STOCK CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-3">

              <button
                onClick={() =>
                  setNewStock((prev) =>
                    Math.max(0, Number(prev) - 1)
                  )
                }
                className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-2xl font-bold transition"
              >
                −
              </button>

              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) =>
                  setNewStock(Number(e.target.value))
                }
                className="flex-1 input-modern text-center text-xl sm:text-2xl font-black"
              />

              <button
                onClick={() =>
                  setNewStock((prev) => Number(prev) + 1)
                }
                className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-2xl font-bold transition"
              >
                +
              </button>

            </div>

            {/* MODAL BUTTONS */}
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-7">

              <button
                onClick={() => {
                  setShowStockModal(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveStock}
                className="flex-1 py-3 rounded-xl gradient-button font-bold"
              >
                Update Stock
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">

          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md p-5 sm:p-7 lg:p-8 shadow-2xl my-auto">

            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-5">
              🗑️
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Delete Product?
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-3 leading-6">
              Are you sure you want to delete this product? This action
              cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-7">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteProduct}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-lg shadow-red-100"
              >
                Delete Product
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MyProducts;