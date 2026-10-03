import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getDemoCategories,
  getDemoProducts
} from "../utils/demoData";

import {
  getQuotationCart,
  saveQuotationCart
} from "../utils/storage";

function ProductDetails() {
  const { slug } = useParams();

  const products = getDemoProducts();
  const categories = getDemoCategories();

  const product = products.find(
    (item) => item.slug === slug
  );

  const category = categories.find(
    (item) => item.id === product?.categoryId
  );

  const [selectedVariantId, setSelectedVariantId] =
    useState(product?.variants?.[0]?.id || "");

  const [quantity, setQuantity] = useState(
    product?.moq || 1
  );

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [message, setMessage] = useState("");

  const selectedVariant = useMemo(() => {
    return product?.variants?.find(
      (variant) =>
        variant.id === selectedVariantId
    );
  }, [product, selectedVariantId]);

  if (!product) {
    return (
      <section className="product-not-found">
        <div className="container">
          <h1>Product Not Found</h1>

          <p>
            The requested demo product could not be found.
          </p>

          <Link
            to="/products"
            className="btn btn-primary"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [
          "/images/products/default.jpg"
        ];

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) => {
      const next = current - 1;

      return Math.max(product.moq, next);
    });
  }

  function handleQuantityChange(event) {
    const value = Number(event.target.value);

    if (!Number.isFinite(value)) {
      setQuantity(product.moq);
      return;
    }

    setQuantity(
      Math.max(product.moq, value)
    );
  }

  function handleAddToQuotation() {
    const cart = getQuotationCart();

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.variantId === selectedVariant?.id
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];

      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity:
          updatedCart[existingIndex].quantity +
          quantity
      };

      saveQuotationCart(updatedCart);
    } else {
      const quotationItem = {
        id: `quote-item-${Date.now()}`,

        productId: product.id,
        productName: product.name,

        variantId: selectedVariant?.id || null,

        variant: selectedVariant || null,

        quantity,

        moq: product.moq,

        image: images[0]
      };

      saveQuotationCart([
        quotationItem,
        ...cart
      ]);
    }

    setMessage(
      "Product added to your quotation."
    );
  }

  return (
    <section className="product-details-page">

      <div className="container">

        <div className="breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/products">
            Products
          </Link>

          <span>/</span>

          <span>{product.name}</span>

        </div>

        <div className="product-details-layout">

          {/* =====================
              IMAGE SECTION
          ====================== */}

          <div className="product-gallery">

            <div className="main-product-image">

              <img
                src={images[selectedImage]}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/products/default.jpg";
                }}
              />

            </div>

            {images.length > 1 && (

              <div className="product-thumbnails">

                {images.map((image, index) => (

                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={
                      selectedImage === index
                        ? "product-thumbnail active"
                        : "product-thumbnail"
                    }
                    onClick={() =>
                      setSelectedImage(index)
                    }
                  >

                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onError={(event) => {
                        event.currentTarget.src =
                          "/images/products/default.jpg";
                      }}
                    />

                  </button>

                ))}

              </div>

            )}

          </div>

          {/* =====================
              PRODUCT INFORMATION
          ====================== */}

          <div className="product-details-content">

            <span className="product-category">
              {category?.name || "Wholesale"}
            </span>

            <h1>
              {product.name}
            </h1>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-moq-box">

              <span>
                Minimum Order Quantity
              </span>

              <strong>
                {product.moq} Units
              </strong>

            </div>

            {/* VARIANTS */}

            {product.variants?.length > 0 && (

              <div className="variant-section">

                <div className="variant-heading">
                  <h3>
                    Product Variant
                  </h3>

                  {selectedVariant && (
                    <span>
                      Selected
                    </span>
                  )}
                </div>

                <div className="variant-grid">

                  {product.variants.map(
                    (variant) => (

                      <button
                        type="button"
                        key={variant.id}
                        className={
                          selectedVariantId ===
                          variant.id
                            ? "variant-card active"
                            : "variant-card"
                        }
                        onClick={() =>
                          setSelectedVariantId(
                            variant.id
                          )
                        }
                      >

                        <strong>
                          {variant.size}
                        </strong>

                        <span>
                          {variant.color}
                        </span>

                        <small>
                          {variant.material}
                        </small>

                      </button>

                    )
                  )}

                </div>

              </div>
            )}

            {/* ATTRIBUTES */}

            <div className="product-attributes">

              <div>
                <span>
                  Material
                </span>

                <strong>
                  {selectedVariant?.material ||
                    product.material ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Size
                </span>

                <strong>
                  {selectedVariant?.size ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Color
                </span>

                <strong>
                  {selectedVariant?.color ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Category
                </span>

                <strong>
                  {category?.name || "—"}
                </strong>
              </div>

            </div>

            {/* QUANTITY */}

            <div className="quantity-section">

              <label>
                Quantity
              </label>

              <div className="quantity-control">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={handleQuantityChange}
                />

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

              <small>
                Minimum quantity: {product.moq} units
              </small>

            </div>

            {/* ACTION */}

            <button
              type="button"
              className="btn btn-primary add-quotation-btn"
              onClick={handleAddToQuotation}
            >
              Add to Quotation
            </button>

            {message && (

              <div className="quotation-added-message">
                ✓ {message}

                <Link to="/quotation">
                  View Quotation
                </Link>
              </div>

            )}

            <div className="demo-note">
              <strong>
                Demo Note
              </strong>

              <span>
                This is a demonstration quotation system.
                No payment or order will be processed.
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;
