import { Link } from "react-router-dom";
import {
  getDemoCategories,
  getDemoProducts
} from "../utils/demoData";

function Categories() {
  const categories = getDemoCategories();
  const products = getDemoProducts();

  function getProductCount(categoryId) {
    return products.filter(
      (product) => product.categoryId === categoryId
    ).length;
  }

  return (
    <section className="categories-page">

      <div className="container">

        <div className="catalog-header">

          <div>
            <span className="eyebrow">
              CATEGORIES
            </span>

            <h1>Browse Categories</h1>

            <p>
              Explore our wholesale products by category.
            </p>
          </div>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (

            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="category-card"
            >

              <div className="category-card-number">
                {String(
                  categories.indexOf(category) + 1
                ).padStart(2, "0")}
              </div>

              <div>

                <h3>{category.name}</h3>

                <p>
                  {category.description}
                </p>

                <span>
                  {getProductCount(category.id)} Products →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;
