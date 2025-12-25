import { useEffect, useState } from "react";
import API from "../Api/axios";
import Navbar from "../components/Navbar";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); 
  const [products, setProducts] = useState([]);       
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    casNumber: "",
    unit: "KG",
  });

  /* =======================
     LOAD PRODUCTS (ONCE)
  ======================= */
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/products");
      const data = res.data.products || [];
      setAllProducts(data);
      setProducts(data); // default show all
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =======================
     FRONTEND SEARCH (CAS)
  ======================= */
  useEffect(() => {
    if (!search.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) =>
      p.casNumber?.toLowerCase().includes(search.toLowerCase())
    );

    setProducts(filtered);
  }, [search, allProducts]);

  /* =======================
     CREATE PRODUCT
  ======================= */
  const createProduct = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.casNumber) {
      return setError("All fields are required");
    }

    try {
      await API.post("/products", form);
      setForm({ name: "", casNumber: "", unit: "KG" });
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "CAS number must be unique");
    }
  };

  /* =======================
     DELETE PRODUCT
  ======================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    loadProducts();
  };

  /* =======================
     UI
  ======================= */
  return (
    <>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chemical Products</h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}

        {/* 🔍 SEARCH BY CAS */}
        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Search by CAS Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ADD PRODUCT FORM */}
        <form
          onSubmit={createProduct}
          className="bg-white shadow p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <input
            className="border p-2 rounded"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="CAS Number"
            value={form.casNumber}
            onChange={(e) =>
              setForm({ ...form, casNumber: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          >
            <option value="KG">KG</option>
            <option value="MT">MT</option>
            <option value="Litre">Litre</option>
          </select>

          <button className="bg-green-600 text-white rounded hover:bg-green-700">
            Add Product
          </button>
        </form>

        {/* PRODUCTS TABLE */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2">CAS Number</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2 text-center">{p.casNumber}</td>
                    <td className="p-2 text-center">{p.unit}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
