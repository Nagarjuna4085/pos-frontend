import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import { getProductsApi } from "../products/productApi";

import AddInventoryModal from "./AddInventoryModal";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const getProducts = async () => {
    try {
      const data = await getProductsApi();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Inventory Management</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Manage Inventory
        </button>
      </div>

      {/* PRODUCTS TABLE */}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="text-left p-4">Image</th>

              <th className="text-left p-4">Product</th>

              <th className="text-left p-4">SKU</th>

              <th className="text-left p-4">Category</th>

              <th className="text-left p-4">Current Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt=""
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.sku}</td>

                <td className="p-4">{product.category?.name}</td>

                <td className="p-4">
                  <span
                    className={`
                        px-3 py-1 rounded text-white text-sm

                        ${product.quantity <= 5 ? "bg-red-500" : "bg-green-500"}
                      `}
                  >
                    {product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddInventoryModal open={open} setOpen={setOpen} />
    </MainLayout>
  );
};

export default Inventory;
