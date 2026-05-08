import api from "../../api/axios"

// GET ALL
export const getCategoriesApi = async () => {

  const response = await api.get("/categories")

  return response.data
}

// CREATE
export const createCategoryApi = async (data) => {

  const response = await api.post(
    "/categories",
    data
  )

  return response.data
}

// UPDATE
export const updateCategoryApi = async (id, data) => {

  const response = await api.put(
    `/categories/${id}`,
    data
  )

  return response.data
}

// DELETE
export const deleteCategoryApi = async (id) => {

  const response = await api.delete(
    `/categories/${id}`
  )

  return response.data
}