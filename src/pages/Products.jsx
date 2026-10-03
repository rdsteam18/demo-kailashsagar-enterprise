import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  getDemoCategories,
  getDemoProducts
} from "../utils/demoData";

function Products() {
  const products = getDemoProducts();
  const categories = getDemoCategories();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.subCategory.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        product.categoryId === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  function getCategoryName(categoryId) {
    const found = categories.find(
      (item) => item.id === categoryId
    );

    return found?.name || "Wholesale";
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setSearchParams({});
  }

  return (
    <section className="catalog-page">

      <div className="container">

        <div className="catalog-header">

          <div>
            <span className="eyebrow">
              B2B CATALOG
            </span>

            <h1>Wholesale Products</h1>

            <p>
              Browse products available for bulk and
              business requirements.
            </p>
          </div>

          <span className="catalog-count">
            {filteredProducts.length} Products
          </span>

        </div>

        <div className="catalog-controls">

          <div className="search-box">

            <span>⌕</span>

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <div className="filter-group">

            <label htmlFor="category-filter">
              Category
            </label>

            <select
              id="category-filter"
              value={category}
              onChange={(event) => {
                const val = event.target.value;
                setCategory(val);
                if (val === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: val });
                }
              }}
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

          </div>

          {(search || category !== "all") && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

        {filteredProducts.length > 0 ? (

          <div className="products-grid">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={getCategoryName(
                  product.categoryId
                )}
              />
            ))}

          </div>

        ) : (

          <div className="empty-products">

            <div className="empty-icon">
              ?
            </div>

            <h3>No products found</h3>

            <p>
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default Products;
