import api from "../../api/axios";

// DASHBOARD SUMMARY
export const getDashboardApi = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

// SALES REPORT
export const getSalesReportApi = async () => {
  const res = await api.get("/dashboard/sales-report");
  return res.data;
};