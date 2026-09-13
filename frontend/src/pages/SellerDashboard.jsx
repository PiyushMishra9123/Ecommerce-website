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
    fetchProducts();
    fetchSellerOrders();
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

  const fetchSellerOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller",
        {
          headers: {
            authorization: userInfo.token,
          },
        },
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
        },
      );

      toast.success("✅ Product Added Successfully", {
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
        },
      );

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
        },
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

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
        },
      );

      setImage(data.image);
    } catch (error) {
      console.log(error);
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
        },
      );

      fetchSellerOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Seller Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">Welcome Seller 👋</h2>

        <p>{userInfo?.user?.name}</p>

        <p>{userInfo?.user?.email}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-5">Add Product</h2>

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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-3 rounded md:col-span-2"
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
            className="bg-[#2874F0] text-white py-3 rounded-lg font-semibold md:col-span-2"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Products</h2>

          <Link
            to="/my-products"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Customer Orders</h2>

            <p className="text-gray-500 mt-2">Manage all customer orders</p>
          </div>

          <Link
            to="/customer-orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
