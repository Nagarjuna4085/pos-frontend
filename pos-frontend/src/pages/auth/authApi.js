import api from "../../api/axios"

export const loginApi = async (data) => {

  const response = await api.post("/auth/login", data)

  return response.data
}


// REGISTER
export const registerApi = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};