import api from "../../api/axios";

// STOCK IN
export const addStockApi = async (data) => {
  const response = await api.post("/inventory/add-stock", data);

  return response.data;
};

// STOCK OUT
export const removeStockApi = async (data) => {
  const response = await api.post("/inventory/remove-stock", data);

  return response.data;
};
