import api from "../../api/axios";

// CREATE ORDER
export const createOrderApi = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// PAY ORDER
export const payOrderApi = async (id) => {
  const res = await api.put(`/orders/${id}/pay`);
  return res.data;
};

// COMPLETE ORDER
export const completeOrderApi = async (id) => {
  const res = await api.put(`/orders/${id}/complete`);
  return res.data;
};