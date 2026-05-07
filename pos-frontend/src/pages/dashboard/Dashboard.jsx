import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded shadow">
            <h2>Total Sales</h2>
            <p className="text-2xl font-bold mt-2">$12,000</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>Total Orders</h2>
            <p className="text-2xl font-bold mt-2">230</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>Products</h2>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>Customers</h2>
            <p className="text-2xl font-bold mt-2">50</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
