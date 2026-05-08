import { useState } from "react";

import { uploadImageApi, createProductApi } from "./productApi";
import { useEffect } from "react";

import { getCategoriesApi } from "./categoryApi";
const AddProductModal = ({ open, setOpen, getProducts }) => {
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    price: "",
    costPrice: "",
    quantity: "",
    description: "",
    categoryId: "",
  });

  const getCategories = async () => {
    try {
      const data = await getCategoriesApi();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  // IMAGE UPLOAD
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const url = await uploadImageApi(file);

      setImageUrl(url);
      setPreview(url);
      console.log("url", url);
    } catch (error) {
      console.log("Image upload failed", error);
    }
  };

  // FORM CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        sku: formData.sku,
        barcode: formData.barcode,
        price: formData.price,
        costPrice: formData.costPrice,
        quantity: formData.quantity,
        description: formData.description,
        categoryId: formData.categoryId,
        imageUrl: imageUrl,
      };

      await createProductApi(payload);

      await getProducts();

      setOpen(false);

      // reset form
      setFormData({
        name: "",
        sku: "",
        barcode: "",
        price: "",
        costPrice: "",
        quantity: "",
        description: "",
        categoryId: "",
      });

      setImageUrl("");
      setPreview("");
    } catch (error) {
      console.log("Create product failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Add Product</h2>
          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="barcode"
            placeholder="Barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="costPrice"
            placeholder="Cost Price"
            value={formData.costPrice}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="quantity"
            placeholder="quantity"
            value={formData.quantity}
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

          {/* IMAGE */}
          <input type="file" onChange={handleImage} className="w-full" />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-28 h-28 object-cover rounded"
            />
          )}

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white p-3 rounded"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
