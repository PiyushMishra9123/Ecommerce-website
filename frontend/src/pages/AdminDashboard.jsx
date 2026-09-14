import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo?.token) {
        setLoading(false);
        return;
      }

      const [productRes, orderRes, userRes] = await Promise.all([
        axios.get(
          "https://ecommerce-website-00z8.onrender.com/api/products"
        ),

        axios.get(
          "https://ecommerce-website-00z8.onrender.com/api/orders",
          {
            headers: {
              authorization: userInfo.token,
            },
          }
        ),

        axios.get(
          "https://ecommerce-website-00z8.onrender.com/api/users",
          {
            headers: {
              authorization: userInfo.token,
            },
          }
        ),
      ]);

      setProducts(productRes.data.products || []);
      setOrders(orderRes.data || []);
      setUsers(userRes.data || []);
    } catch (error) {
      console.log("Admin Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      setAddingProduct(true);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

      alert("Product Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImage("");

      fetchData();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Add Product"
      );
    } finally {
      setAddingProduct(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      await axios.delete(
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`,
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      alert("Product Deleted Successfully");

      fetchData();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Delete Product"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-2xl">⚙️</span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 mt-5">
            Loading Admin Dashboard...
          </h1>

          <p className="text-slate-500 mt-2">
            Fetching products, orders and users.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <p className="text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
            Administration
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your store, products, users and orders.
              </p>
            </div>

            <div className="px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-sm font-semibold text-slate-500">
                Store Status
              </span>

              <span className="ml-2 inline-flex items-center gap-2 text-sm font-black text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

          </div>
        </div>

        {/* ================= WELCOME BANNER ================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-7 md:p-9 mb-10 shadow-2xl">

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl">
              👑
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Welcome to ShopKart Admin
              </h2>

              <p className="text-slate-300 mt-2">
                Keep track of everything happening across your store.
              </p>
            </div>

          </div>
        </div>

        {/* ================= DASHBOARD CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {/* PRODUCTS */}
          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Total Products
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {products.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                📦
              </div>

            </div>

            <p className="text-xs font-bold text-indigo-600 mt-4">
              Products in store
            </p>

          </div>

          {/* ORDERS */}
          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Total Orders
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {orders.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                🛍️
              </div>

            </div>

            <p className="text-xs font-bold text-emerald-600 mt-4">
              Customer orders
            </p>

          </div>

          {/* USERS */}
          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Total Users
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {users.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                👥
              </div>

            </div>

            <p className="text-xs font-bold text-purple-600 mt-4">
              Registered users
            </p>

          </div>

        </div>

        {/* ================= ADD PRODUCT ================= */}

        <div className="premium-card p-6 md:p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>

              <p className="text-sm uppercase tracking-wider font-bold text-indigo-600">
                Product Management
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Add New Product
              </h2>

              <p className="text-slate-500 mt-1">
                Create and publish a new product in your store.
              </p>

            </div>

            <div className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold">
              Admin Access
            </div>

          </div>

          <form
            onSubmit={addProduct}
            className="grid md:grid-cols-2 gap-5"
          >

            {/* NAME */}
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
                placeholder="Enter product price"
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
                Image URL
              </label>

              <input
                type="text"
                placeholder="Enter product image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-modern"
                required
              />

            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                placeholder="Write product description..."
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
              disabled={addingProduct}
              className="gradient-button md:col-span-2 py-3.5 rounded-xl font-black shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {addingProduct
                ? "Adding Product..."
                : "+ Add Product"}
            </button>

          </form>
        </div>

        {/* ================= PRODUCTS LIST ================= */}

        <div className="premium-card overflow-hidden">

          <div className="p-6 md:p-8 border-b border-slate-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <p className="text-sm uppercase tracking-wider font-bold text-purple-600">
                  Inventory
                </p>

                <h2 className="text-3xl font-black text-slate-900 mt-1">
                  Products List
                </h2>

              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm">
                {products.length} Products
              </div>

            </div>

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-black text-slate-500">
                    Product
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-black text-slate-500">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-black text-slate-500">
                    Price
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-black text-slate-500">
                    Category
                  </th>

                  <th className="text-center px-6 py-4 text-xs uppercase tracking-wider font-black text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-slate-100 hover:bg-indigo-50/30 transition"
                  >

                    {/* IMAGE */}
                    <td className="px-6 py-4">

                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />

                      </div>

                    </td>

                    {/* NAME */}
                    <td className="px-6 py-4">

                      <p className="font-black text-slate-900">
                        {product.name}
                      </p>

                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4">

                      <p className="font-black text-slate-900">
                        ₹
                        {Number(product.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4">

                      <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold">
                        {product.category}
                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-center">

                      <div className="flex justify-center gap-2">
                        <Link to={`/admin/edit-product/${product._id}`}
                        className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition font-bold text-sm" >
                          Edit
                          </Link>
                          <button onClick={() => deleteProduct(product._id)}
                          className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition font-bold text-sm">
                            Delete
                            </button>
                      </div>
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* MOBILE PRODUCT CARDS */}
          <div className="md:hidden p-4 space-y-4">

            {products.map((product) => (

              <div
                key={product._id}
                className="border border-slate-100 rounded-2xl p-4"
              >

                <div className="flex gap-4">

                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden flex-shrink-0">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />

                  </div>

                  <div className="flex-1 min-w-0">

                    <h3 className="font-black text-slate-900 truncate">
                      {product.name}
                    </h3>

                    <p className="text-lg font-black text-indigo-600 mt-1">
                      ₹
                      {Number(product.price || 0).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold">
                      {product.category}
                    </span>

                  </div>

                </div>

                <div className="flex gap-2 mt-4">
  <Link
    to={`/admin/edit-product/${product._id}`}
    className="flex-1 text-center py-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition font-bold"
  >
    Edit Product
  </Link>

  <button
    onClick={() => deleteProduct(product._id)}
    className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition font-bold"
  >
    Delete
  </button>
</div>

              </div>

            ))}

          </div>

          {/* EMPTY */}
          {products.length === 0 && (
            <div className="py-16 text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">
                📦
              </div>

              <h3 className="text-xl font-black text-slate-900 mt-5">
                No Products Found
              </h3>

              <p className="text-slate-500 mt-2">
                Add your first product using the form above.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;