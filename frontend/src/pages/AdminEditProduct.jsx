import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================= FETCH PRODUCT =================

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`
      );

      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setCategory(data.category || "");
      setStock(data.stock || "");
      setImage(data.image || "");
    } catch (error) {
      console.log("Fetch Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PRODUCT =================

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/products/${id}`,
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

      alert("Product Updated Successfully");

      navigate("/admin");
    } catch (error) {
      console.log("Update Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed To Update Product"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-2xl">✏️</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-5">
            Loading Product...
          </h2>

          <p className="text-slate-500 mt-2">
            Please wait while we fetch product details.
          </p>

        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="min-h-screen bg-slate-50 py-10">

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            ← Back to Admin Dashboard
          </Link>

          <p className="text-sm uppercase tracking-wider font-bold text-indigo-600 mt-7 mb-2">
            Product Management
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            Edit Product
          </h1>

          <p className="text-slate-500 mt-2">
            Update product information and inventory details.
          </p>

        </div>

        {/* ================= FORM CARD ================= */}

        <div className="premium-card p-6 md:p-8">

          <form
            onSubmit={updateProduct}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* PRODUCT NAME */}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
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
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
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
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock"
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
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter product image URL"
                className="input-modern"
                required
              />

              {/* IMAGE PREVIEW */}

              {image && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">

                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                    Image Preview
                  </p>

                  <div className="w-full h-52 rounded-xl bg-white flex items-center justify-center overflow-hidden">

                    <img
                      src={image}
                      alt={name}
                      className="max-h-full max-w-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                  </div>

                </div>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="input-modern resize-none"
                rows="6"
                required
              />

            </div>

            {/* ACTION BUTTONS */}

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-3">

              <Link
                to="/admin"
                className="flex-1 text-center py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 gradient-button py-3.5 rounded-xl font-black shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

        {/* ================= INFO ================= */}

        <div className="mt-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">

          <div className="flex gap-3">

            <span className="text-xl">
              💡
            </span>

            <div>

              <p className="font-black text-indigo-900">
                Admin Product Management
              </p>

              <p className="text-sm text-indigo-700 mt-1">
                Make sure the product information is correct
                before saving the changes.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminEditProduct;