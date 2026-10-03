import { useState } from "react";
import {
  getStoredProducts,
  getStoredCategories,
  saveProducts,
} from "../../utils/storage";

const emptyVariant = {
  id: "",
  size: "",
  color: "",
  material: "",
};

const emptyForm = {
  name: "",
  categoryId: "",
  subCategory: "",
  description: "",
  moq: 1,
  material: "",
  image: "",
  variants: [],
};

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminProducts() {
  const [products, setProducts] = useState(
    getStoredProducts()
  );

  const categories = getStoredCategories();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          ...emptyVariant,
          id: `variant-${Date.now()}`,
        },
      ],
    }));
  };

  const updateVariant = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      ),
    }));
  };

  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = categories.find(
      (item) => item.id === form.categoryId
    );

    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    const productData = {
      id:
        editingId ||
        `product-${Date.now()}`,

      name: form.name.trim(),

      slug: createSlug(form.name),

      categoryId: form.categoryId,

      subCategory:
        form.subCategory.trim(),

      description:
        form.description.trim(),

      moq: Number(form.moq),

      material:
        form.material.trim(),

      images: form.image
        ? [form.image.trim()]
        : ["/images/products/default.jpg"],

      variants: form.variants,
    };

    let updatedProducts;

    if (editingId) {
      updatedProducts = products.map(
        (product) =>
          product.id === editingId
            ? productData
            : product
      );

      setMessage("Product updated.");
    } else {
      updatedProducts = [
        ...products,
        productData,
      ];

      setMessage("Product added.");
    }

    setProducts(updatedProducts);
    saveProducts(updatedProducts);

    setForm(emptyForm);
    setEditingId(null);
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      categoryId: product.categoryId || "",
      subCategory: product.subCategory || "",
      description: product.description || "",
      moq: product.moq || 1,
      material: product.material || "",
      image: product.images?.[0] || "",
      variants: product.variants || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Delete this demo product?"
    );

    if (!confirmed) return;

    const updated = products.filter(
      (product) => product.id !== id
    );

    setProducts(updated);
    saveProducts(updated);

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div>

      <div className="admin-page-heading">
        <div>
          <h1>Products</h1>
          <p>
            Add, edit and manage B2B products.
          </p>
        </div>
      </div>

      <div className="admin-section-card">

        <div className="admin-section-header">
          <div>
            <h2>
              {editingId
                ? "Edit Product"
                : "Add Product"}
            </h2>
          </div>
        </div>

        <form
          className="admin-product-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <div className="admin-field">
              <label>Product Name</label>
              <input
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="admin-field">
              <label>Category</label>

              <select
                value={form.categoryId}
                onChange={(e) =>
                  updateField(
                    "categoryId",
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label>Sub Category</label>
              <input
                value={form.subCategory}
                onChange={(e) =>
                  updateField(
                    "subCategory",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="admin-field">
              <label>MOQ</label>
              <input
                type="number"
                min="1"
                value={form.moq}
                onChange={(e) =>
                  updateField(
                    "moq",
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="admin-field">
              <label>Material</label>
              <input
                value={form.material}
                onChange={(e) =>
                  updateField(
                    "material",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="admin-field">
              <label>Image Path / URL</label>
              <input
                value={form.image}
                onChange={(e) =>
                  updateField(
                    "image",
                    e.target.value
                  )
                }
                placeholder="/images/products/example.jpg"
              />
            </div>

          </div>

          <div className="admin-field">
            <label>Description</label>

            <textarea
              rows="4"
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <div className="variant-editor">

            <div className="variant-editor-header">
              <div>
                <h3>Variants</h3>
                <p>
                  Manage size, color and material options.
                </p>
              </div>

              <button
                type="button"
                className="admin-secondary-button"
                onClick={addVariant}
              >
                + Add Variant
              </button>
            </div>

            {form.variants.length === 0 ? (
              <div className="admin-empty small">
                No variants added.
              </div>
            ) : (
              form.variants.map(
                (variant, index) => (
                  <div
                    className="variant-editor-row"
                    key={variant.id || index}
                  >

                    <input
                      placeholder="Size"
                      value={variant.size || ""}
                      onChange={(e) =>
                        updateVariant(
                          index,
                          "size",
                          e.target.value
                        )
                      }
                    />

                    <input
                      placeholder="Color"
                      value={variant.color || ""}
                      onChange={(e) =>
                        updateVariant(
                          index,
                          "color",
                          e.target.value
                        )
                      }
                    />

                    <input
                      placeholder="Material"
                      value={variant.material || ""}
                      onChange={(e) =>
                        updateVariant(
                          index,
                          "material",
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="danger-text-button"
                      onClick={() =>
                        removeVariant(index)
                      }
                    >
                      Remove
                    </button>

                  </div>
                )
              )
            )}

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
                ? "Update Product"
                : "Add Product"}
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
          <div>
            <h2>Product Catalog</h2>
            <p>
              {products.length} products
            </p>
          </div>
        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>MOQ</th>
                <th>Variants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => {

                const category =
                  categories.find(
                    (item) =>
                      item.id ===
                      product.categoryId
                  );

                return (
                  <tr key={product.id}>

                    <td>
                      <strong>
                        {product.name}
                      </strong>
                    </td>

                    <td>
                      {category?.name || "-"}
                    </td>

                    <td>
                      {product.moq}
                    </td>

                    <td>
                      {product.variants?.length || 0}
                    </td>

                    <td>
                      <div className="table-actions">

                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            editProduct(product)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
