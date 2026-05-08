import { useState } from "react";

import { createCategoryApi } from "./categoryApi";

const AddCategoryModal = ({ open, setOpen, getCategories }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

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

      await createCategoryApi({
        ...formData,
        isActive: true,
      });

      await getCategories();

      setOpen(false);

      setFormData({
        name: "",
        description: "",
      });
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
          <h2 className="text-2xl font-bold">Add Category</h2>

          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white p-3 rounded"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
