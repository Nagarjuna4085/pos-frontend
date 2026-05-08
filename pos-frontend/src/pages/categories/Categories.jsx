import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import { getCategoriesApi, deleteCategoryApi } from "./categoryApi";

import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    try {
      const data = await getCategoriesApi();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategoryApi(id);

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);

    setOpenEdit(true);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Description</th>

              <th className="text-left p-4">Status</th>

              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-4">{category.name}</td>

                <td className="p-4">{category.description}</td>

                <td className="p-4">
                  {category.isActive ? "Active" : "Inactive"}
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        open={openAdd}
        setOpen={setOpenAdd}
        getCategories={getCategories}
      />

      <EditCategoryModal
        open={openEdit}
        setOpen={setOpenEdit}
        category={selectedCategory}
        getCategories={getCategories}
      />
    </MainLayout>
  );
};

export default Categories;
