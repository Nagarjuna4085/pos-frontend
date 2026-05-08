import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getProductsApi } from "../products/productApi";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await getProductsApi();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-80px)] gap-4">
        {/* LEFT: PRODUCTS */}
        <div className="w-2/3 bg-white p-4 overflow-auto rounded shadow">
          <h2 className="text-xl font-bold mb-4">Products</h2>
        </div>

        {/* RIGHT: CART */}
        <div className="w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
        </div>
      </div>
    </MainLayout>
  );
};

export default POS;
