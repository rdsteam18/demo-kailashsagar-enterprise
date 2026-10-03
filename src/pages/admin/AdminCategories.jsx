import { useState } from "react";
import {
  getStoredCategories,
  getStoredProducts,
  saveCategories,
} from "../../utils/storage";

export default function AdminCategories() {
  const [categories, setCategories] = useState(
    getStoredCategories()
  );

  const products = getStoredProducts();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingId) {
      const updated = categories.map(
        (category) =>
          category.id === editingId
            ? {
                ...category,
                name: name.trim(),
                description:
                  description.trim(),
              }
            : category
      );

      setCategories(updated);
      saveCategories(updated);

      setMessage("Category updated.");
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
      };

      const updated = [
        ...categories,
        newCategory,
      ];

      setCategories(updated);
      saveCategories(updated);

      setMessage("Category added.");
    }

    setName("");
    setDescription("");
    setEditingId(null);
  };

  const editCategory = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(
      category.description || ""
    );
  };

  const deleteCategory = (category) => {
    const usedByProducts = products.some(
      (product) =>
        product.categoryId === category.id
    );

    if (usedByProducts) {
      setMessage(
        "This category cannot be deleted because products are using it."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    const updated = categories.filter(
      (item) =>
        item.id !== category.id
    );

    setCategories(updated);
    saveCategories(updated);
  };

  return (
    <div>

      <div className="admin-page-heading">
        <div>
          <h1>Categories</h1>
          <p>
            Manage product categories.
          </p>
        </div>
      </div>

      <div className="admin-section-card">

        <div className="admin-section-header">
          <h2>
            {editingId
              ? "Edit Category"
              : "Add Category"}
          </h2>
        </div>

        <form
          className="admin-category-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-field">
            <label>Category Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Example: Electronics"
              required
            />
          </div>

          <div className="admin-field">
            <label>Description</label>

            <textarea
              rows="3"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />
          </div>

          {message && (
            <div className="admin-success">
              {message}
            </div>
          )}

          <div className="admin-form-actions">

            <button
              type="submit"
              className="admin-primary-button"
            >
              {editingId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      <div className="admin-section-card">

        <div className="admin-section-header">
          <h2>Category List</h2>
        </div>

        <div className="category-admin-grid">

          {categories.map((category) => {

            const productCount =
              products.filter(
                (product) =>
                  product.categoryId ===
                  category.id
              ).length;

            return (
              <div
                className="category-admin-card"
                key={category.id}
              >

                <div>
                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description ||
                      "No description"}
                  </p>

                  <span>
                    {productCount} products
                  </span>
                </div>

                <div className="table-actions">

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      editCategory(category)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      deleteCategory(category)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
