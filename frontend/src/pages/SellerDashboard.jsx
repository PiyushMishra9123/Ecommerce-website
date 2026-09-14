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

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Seller Panel
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                Seller Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your products and customer orders from one place.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/my-products"
                className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-indigo-300 hover:text-indigo-600 transition"
              >
                My Products
              </Link>

              <Link
                to="/customer-orders"
                className="px-5 py-3 rounded-xl gradient-button font-bold"
              >
                Customer Orders
              </Link>
            </div>
          </div>
        </div>

        {/* SELLER PROFILE CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-7 md:p-9 mb-10 shadow-2xl">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-6">

            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-black text-white">
              {userInfo?.user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div className="text-white">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-black">
                  Welcome, {userInfo?.user?.name}
                </h2>

                <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase">
                  Seller
                </span>
              </div>

              <p className="text-slate-300">
                {userInfo?.user?.email}
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Manage your store, products and orders efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="premium-card p-6">
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

          <div className="premium-card p-6">
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

          <div className="premium-card p-6">
            <p className="text-sm font-bold text-slate-500">
              In Stock
            </p>

            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {products.reduce(
                (total, product) => total + Number(product.stock || 0),
                0
              )}
            </h3>

            <p className="text-xs text-emerald-600 font-semibold mt-2">
              Total available units
            </p>
          </div>

          <div className="premium-card p-6">
            <p className="text-sm font-bold text-slate-500">
              Quick Actions
            </p>

            <div className="flex gap-2 mt-3">
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

        {/* ADD PRODUCT */}
        <div className="premium-card p-6 md:p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>
              <p className="text-sm uppercase tracking-wider font-bold text-indigo-600">
                Store Management
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Add New Product
              </h2>

              <p className="text-slate-500 mt-1">
                Add a new product to your store.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold">
              {products.length} Products
            </div>
          </div>

          <form
            onSubmit={addProduct}
            className="grid md:grid-cols-2 gap-5"
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

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 bg-slate-50 hover:border-indigo-300 transition">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-slate-600"
                />

                {image && (
                  <div className="mt-4 flex items-center gap-3">
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

        {/* MY PRODUCTS */}
        <div className="premium-card p-6 md:p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm uppercase tracking-wider font-bold text-indigo-600">
                Inventory
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-1">
                My Products
              </h2>

              <p className="text-slate-500 mt-2">
                Manage your products, pricing and stock.
              </p>
            </div>

            <Link
              to="/my-products"
              className="gradient-button px-6 py-3 rounded-xl font-bold text-center"
            >
              View All Products →
            </Link>
          </div>

          {/* PRODUCT PREVIEW */}
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">

              {products.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="group border border-slate-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden">

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

                    <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                      {product.category}
                    </p>

                    <h3 className="font-black text-slate-900 mt-1 line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-black text-lg text-slate-900">
                        ₹{product.price}
                      </span>

                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-lg ${
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
            <div className="mt-7 py-12 text-center bg-slate-50 rounded-2xl">
              <p className="text-slate-500 font-semibold">
                No products added yet.
              </p>
            </div>
          )}
        </div>

        {/* CUSTOMER ORDERS */}
        <div className="premium-card p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-4">
                🛍️
              </div>

              <p className="text-sm uppercase tracking-wider font-bold text-purple-600">
                Order Management
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Customer Orders
              </h2>

              <p className="text-slate-500 mt-2">
                View and manage orders placed by your customers.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 font-bold text-sm">
                {sellerOrders.length} Total Orders
              </div>
            </div>

            <Link
              to="/customer-orders"
              className="gradient-button px-7 py-3.5 rounded-xl font-black text-center"
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