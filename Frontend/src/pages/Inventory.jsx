import { useEffect, useState } from "react";
import API from "../Api/axios";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load inventory
  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("api/inventory");

      const inventoryData = Array.isArray(res.data)
        ? res.data
        : res.data.inventory;

      const validItems = inventoryData.filter(
        (item) => item.product && item.product._id
      );

      setItems(validItems);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // STOCK IN
  const increaseStock = async (productId) => {
    const amount = prompt("Enter quantity to IN:");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    try {
      await API.post("/inventory/in", {
        productId,
        quantity: Number(amount),
      });

      loadInventory();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to increase stock");
    }
  };

  // STOCK OUT
  const decreaseStock = async (productId, currentStock) => {
    const amount = prompt("Enter quantity to OUT:");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    if (Number(amount) > currentStock) {
      alert("❌ Stock cannot go below zero");
      return;
    }

    try {
      await API.post("/inventory/out", {
        productId,
        quantity: Number(amount),
      });

      loadInventory();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to decrease stock");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Chemical Inventory
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading inventory...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Unit</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    No inventory found
                  </td>
                </tr>
              ) : (
                items.map((i) => (
                  <tr key={i._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i.product.name}</td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold ${
                          i.currentStock < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {i.currentStock}
                      </span>
                    </td>

                    <td className="p-3 text-center">{i.product.unit}</td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          increaseStock(i.product._id)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        IN
                      </button>

                      <button
                        onClick={() =>
                          decreaseStock(
                            i.product._id,
                            i.currentStock
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        OUT
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
