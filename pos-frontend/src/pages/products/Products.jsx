import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import AddProductModal from "./AddProductModal";
import { getProductsApi, deleteProductApi } from "./productApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const getProducts = async () => {
    try {
      const data = await getProductsApi();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts();
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProductApi(id);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          className="bg-slate-900 text-white px-4 py-2 rounded"
          onClick={() => setOpen(true)}
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="text-left p-4">Image</th>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Price</th>

              <th className="text-left p-4">quantity</th>

              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">
                  <img
                    src={`${baseURL}${product.imageUrl}`}
                    alt=""
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">${product.price}</td>

                <td className="p-4">{product.quantity}</td>

                <td className="p-4 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
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

      <AddProductModal
        open={open}
        setOpen={setOpen}
        getProducts={getProducts}
      />
    </MainLayout>
  );
};

export default Products;
