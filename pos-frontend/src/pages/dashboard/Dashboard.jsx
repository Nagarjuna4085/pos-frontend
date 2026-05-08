import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboardApi, getSalesReportApi } from "./dashboardApi";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [report, setReport] = useState([]);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardApi();
      setData(res);

      const rep = await getSalesReportApi();
      setReport(rep);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Orders</h3>
          <p className="text-2xl font-bold">{data.totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Total Revenue</h3>
          <p className="text-2xl font-bold">${data.totalRevenue}</p>
        </div>

        {/* <div className="bg-white p-4 rounded shadow">
          <h3>Total Sales</h3>
          <p className="text-2xl font-bold">
            {data.totalSales ?? 0}
          </p>
        </div> */}
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">Top Products</h2>

        {data.topProducts.map((p, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{p.productName}</span>
            <span>{p.totalSold}</span>
          </div>
        ))}
      </div>

      {/* LOW STOCK */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">Low Stock</h2>

        {data.lowStockProducts.map((p, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{p.productName}</span>
            <span className="text-red-500">{p.quantity}</span>
          </div>
        ))}
      </div>

      {/* SALES REPORT */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Sales Report</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Date</th>
              <th>Orders</th>
              <th>Sales</th>
            </tr>
          </thead>

          <tbody>
            {report.map((r, i) => (
              <tr key={i} className="border-b">
                <td>{r.date}</td>
                <td>{r.totalOrders}</td>
                <td>${r.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
