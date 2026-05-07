import api from "../../api/axios"

export const getProductsApi = async () => {

  const response = await api.get("/products")

  return response.data
}

export const createProductApi = async (data) => {

  const response = await api.post(
    "/products",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )

  return response.data
}

export const deleteProductApi = async (id) => {

  const response = await api.delete(`/products/${id}`)

  return response.data
}