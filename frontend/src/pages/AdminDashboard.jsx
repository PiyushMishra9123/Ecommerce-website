import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const [productRes, orderRes, userRes] = await Promise.all([
        axios.get("https://ecommerce-website-00z8.onrender.com/api/products"),

        axios.get("https://ecommerce-website-00z8.onrender.com/api/orders", {
          headers: {
            authorization: userInfo.token,
          },
        }),

        axios.get("https://ecommerce-website-00z8.onrender.com/api/users", {
          headers: {
            authorization: userInfo.token,
          },
        }),
      ]);

      setProducts(productRes.data.products || []);

      setOrders(orderRes.data || []);

      setUsers(userRes.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
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
        },
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
      alert(error.response?.data?.message || "Failed To Add Product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      await axios.delete(
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`,
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      alert("Product Deleted Successfully");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Products</h2>

          <p className="text-4xl mt-2 text-blue-600">{products.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Orders</h2>

          <p className="text-4xl mt-2 text-green-600">{orders.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Users</h2>

          <p className="text-4xl mt-2 text-purple-600">{users.length}</p>
        </div>
      </div>

      {/* Add Product */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-5">Add New Product</h2>

        <form onSubmit={addProduct} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-3 rounded md:col-span-2"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded md:col-span-2"
            rows="3"
            required
          />

          <button
            type="submit"
            className="bg-[#2874F0] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 md:col-span-2"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product Table */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Products List</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3">Image</th>

              <th>Name</th>

              <th>Price</th>

              <th>Category</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b text-center">
                <td className="py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>

                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{product.category}</td>

                <td>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
