import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SellerDashboard() {
  const { userInfo } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userInfo?.token) {
      fetchProducts();
      fetchSellerOrders();
    }
  }, [userInfo]);

  // ================= FETCH PRODUCTS =================

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

  // ================= FETCH ORDERS =================

  const fetchSellerOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setSellerOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= ADD PRODUCT =================

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/products",
        {
          name,
          description,
          price,
          category,
          stock,
          image,
        },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success("Product Added Successfully", {
        position: "top-center",
        autoClose: 2000,
      });

      fetchProducts();

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  // ================= UPDATE STOCK =================

  const updateStock = async (id, currentStock) => {
    const newStock = prompt("Enter New Stock", currentStock);

    if (!newStock || Number(newStock) < 0) return;

    try {
      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/products/myproducts/${id}/stock`,
        {
          stock: Number(newStock),
        },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success("Stock Updated");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE PRODUCT =================

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://ecommerce-website-00z8.onrender.com/api/products/myproducts/${id}`,
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(data.image);

      toast.success("Image Uploaded");
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    }
  };

  // ================= UPDATE ORDER STATUS =================

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/status`,
        { status },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success("Order Status Updated");
      fetchSellerOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-7 sm:mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div className="min-w-0">

              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Seller Panel
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Seller Dashboard
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
                Manage your products and customer orders from one place.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full lg:w-auto">

              <Link
                to="/my-products"
                className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-center hover:border-indigo-300 hover:text-indigo-600 transition"
              >
                My Products
              </Link>

              <Link
                to="/customer-orders"
                className="px-5 py-3 rounded-xl gradient-button font-bold text-center"
              >
                Customer Orders
              </Link>

            </div>

          </div>

        </div>

        {/* ================= SELLER PROFILE CARD ================= */}

        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-5 sm:p-7 lg:p-9 mb-7 sm:mb-10 shadow-2xl">

          <div className="absolute -right-20 -top-20 w-56 sm:w-64 h-56 sm:h-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -left-20 -bottom-20 w-56 sm:w-64 h-56 sm:h-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
              {userInfo?.user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div className="text-white min-w-0">

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black break-words">
                  Welcome, {userInfo?.user?.name}
                </h2>

                <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase">
                  Seller
                </span>

              </div>

              <p className="text-sm sm:text-base text-slate-300 break-all">
                {userInfo?.user?.email}
              </p>

              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Manage your store, products and orders efficiently.
              </p>

            </div>

          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-10">

          {/* TOTAL PRODUCTS */}

          <div className="premium-card p-5 sm:p-6">

            <p className="text-sm font-bold text-slate-500">
              Total Products
            </p>

            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {products.length}
            </h3>

            <p className="text-xs text-indigo-600 font-semibold mt-2">
              Products in your store
            </p>

          </div>

          {/* ORDERS */}

          <div className="premium-card p-5 sm:p-6">

            <p className="text-sm font-bold text-slate-500">
              Customer Orders
            </p>

            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {sellerOrders.length}
            </h3>

            <p className="text-xs text-purple-600 font-semibold mt-2">
              Orders received
            </p>

          </div>

          {/* STOCK */}

          <div className="premium-card p-5 sm:p-6">

            <p className="text-sm font-bold text-slate-500">
              In Stock
            </p>

            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {totalStock}
            </h3>

            <p className="text-xs text-emerald-600 font-semibold mt-2">
              Total available units
            </p>

          </div>

          {/* QUICK ACTIONS */}

          <div className="premium-card p-5 sm:p-6">

            <p className="text-sm font-bold text-slate-500">
              Quick Actions
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">

              <Link
                to="/my-products"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
              >
                Products →
              </Link>

              <Link
                to="/customer-orders"
                className="text-sm font-bold text-purple-600 hover:text-purple-800"
              >
                Orders →
              </Link>

            </div>

          </div>

        </div>

        {/* ================= ADD PRODUCT ================= */}

        <div className="premium-card p-5 sm:p-6 lg:p-8 mb-7 sm:mb-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-7">

            <div>

              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600">
                Store Management
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Add New Product
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-1">
                Add a new product to your store.
              </p>

            </div>

            <div className="w-fit px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold">
              {products.length} Products
            </div>

          </div>

          <form
            onSubmit={addProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          >

            {/* PRODUCT NAME */}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Category
              </label>

              <input
                type="text"
                placeholder="e.g. Electronics"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* STOCK */}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Stock
              </label>

              <input
                type="number"
                placeholder="Available quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* IMAGE */}

            <div className="md:col-span-2">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Product Image
              </label>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50 hover:border-indigo-300 transition">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs sm:text-sm text-slate-600"
                />

                {image && (
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">

                    <img
                      src={`https://ecommerce-website-00z8.onrender.com${image}`}
                      alt="Product Preview"
                      className="w-20 h-20 object-cover rounded-xl border border-slate-200"
                    />

                    <div>
                      <p className="text-sm font-bold text-emerald-600">
                        ✓ Image uploaded
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Product image is ready.
                      </p>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                placeholder="Write a detailed product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-modern resize-none"
                rows="5"
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="gradient-button md:col-span-2 py-3.5 rounded-xl font-black shadow-lg shadow-indigo-200 hover:shadow-xl"
            >
              + Add Product
            </button>

          </form>

        </div>

        {/* ================= MY PRODUCTS ================= */}

        <div className="premium-card p-5 sm:p-6 lg:p-8 mb-7 sm:mb-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600">
                Inventory
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                My Products
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Manage your products, pricing and stock.
              </p>

            </div>

            <Link
              to="/my-products"
              className="gradient-button px-5 sm:px-6 py-3 rounded-xl font-bold text-center"
            >
              View All Products →
            </Link>

          </div>

          {/* PRODUCT PREVIEW */}

          {products.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-7">

              {products.slice(0, 4).map((product) => (

                <div
                  key={product._id}
                  className="group border border-slate-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="h-44 sm:h-40 bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden">

                    {product.image ? (

                      <img
                        src={`https://ecommerce-website-00z8.onrender.com${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                      />

                    ) : (

                      <span className="text-slate-400 text-sm">
                        No Image
                      </span>

                    )}

                  </div>

                  <div className="p-4">

                    <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold truncate">
                      {product.category}
                    </p>

                    <h3 className="font-black text-slate-900 mt-1 line-clamp-1 break-words">
                      {product.name}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">

                      <span className="font-black text-lg text-slate-900">
                        ₹{product.price}
                      </span>

                      <span
                        className={`w-fit text-xs font-bold px-2 py-1 rounded-lg ${
                          product.stock > 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="mt-6 sm:mt-7 py-10 sm:py-12 text-center bg-slate-50 rounded-2xl">

              <p className="text-slate-500 font-semibold">
                No products added yet.
              </p>

            </div>

          )}

        </div>

        {/* ================= CUSTOMER ORDERS ================= */}

        <div className="premium-card p-5 sm:p-6 lg:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div className="min-w-0">

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl sm:text-2xl mb-4">
                🛍️
              </div>

              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-purple-600">
                Order Management
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Customer Orders
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                View and manage orders placed by your customers.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 font-bold text-sm">
                {sellerOrders.length} Total Orders
              </div>

            </div>

            <Link
              to="/customer-orders"
              className="gradient-button w-full lg:w-auto px-6 sm:px-7 py-3.5 rounded-xl font-black text-center"
            >
              Manage Orders →
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SellerDashboard;