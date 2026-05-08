import api from "../../api/axios"

// Get all categories
export const getCategoriesApi = async () => {

  const response = await api.get("/categories")

  return response.data
}