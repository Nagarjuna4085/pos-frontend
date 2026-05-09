import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getOrdersApi } from "./orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadOrders = async (p = 0) => {
    try {
      const data = await getOrdersApi(p, 10);

      setOrders(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-5">Orders</h1>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.orderNumber}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3">{o.customerPhone}</td>

                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 rounded">
                    {o.orderStatus}
                  </span>
                </td>

                <td className="p-3">${o.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => loadOrders(i)}
            className={`px-3 py-1 border rounded ${
              page === i ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </MainLayout>
  );
};

export default Orders;
