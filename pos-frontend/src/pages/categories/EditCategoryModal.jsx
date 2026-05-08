import { useEffect, useState } from "react";

import { updateCategoryApi } from "./categoryApi";

const EditCategoryModal = ({ open, setOpen, category, getCategories }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        isActive: category.isActive,
      });
    }
  }, [category]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateCategoryApi(category.id, formData);

      await getCategories();

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[450px]">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Edit Category</h2>

          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="isActive"
            value={formData.isActive}
            onChange={(e) =>
              setFormData({
                ...formData,
                isActive: e.target.value === "true",
              })
            }
            className="w-full border p-3 rounded"
          >
            <option value={true}>Active</option>

            <option value={false}>Inactive</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white p-3 rounded"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
