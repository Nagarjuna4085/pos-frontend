import { useState, useEffect } from "react";

import { addStockApi, removeStockApi } from "./inventoryApi";

import { getProductsApi } from "../products/productApi";

const AddInventoryModal = ({ open, setOpen }) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    reason: "",
    type: "IN",
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await getProductsApi();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        productId: Number(formData.productId),
        quantity: Number(formData.quantity),
        reason: formData.reason,
      };

      if (formData.type === "IN") {
        await addStockApi(payload);
      } else {
        await removeStockApi(payload);
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Inventory Management</h2>

          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PRODUCT DROPDOWN */}
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          {/* TYPE */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="IN">Stock In</option>

            <option value="OUT">Stock Out</option>
          </select>

          {/* QUANTITY */}
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* REASON */}
          <textarea
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white p-3 rounded"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryModal;
