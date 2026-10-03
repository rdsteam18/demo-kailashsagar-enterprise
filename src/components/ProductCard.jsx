import { Link } from "react-router-dom";

function ProductCard({ product, categoryName }) {
  const image =
    product.images?.[0] ||
    "/images/products/default.jpg";

  return (
    <article className="product-card">

      <Link
        to={`/products/${product.slug}`}
        className="product-image-wrap"
      >
        <img
          src={image}
          alt={product.name}
          className="product-image"
          onError={(event) => {
            event.currentTarget.src =
              "/images/products/default.jpg";
          }}
        />
      </Link>

      <div className="product-card-body">

        <span className="product-category">
          {categoryName || "Wholesale"}
        </span>

        <Link
          to={`/products/${product.slug}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-meta">
          <span>MOQ</span>
          <strong>{product.moq} Units</strong>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="product-view-btn"
        >
          View Details
        </Link>

      </div>

    </article>
  );
}

export default ProductCard;
