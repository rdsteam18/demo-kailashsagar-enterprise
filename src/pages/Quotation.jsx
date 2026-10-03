import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getQuotationCart,
  saveQuotationCart,
  clearQuotationCart
} from "../utils/storage";

function Quotation() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getQuotationCart());
  }, []);

  function updateQuantity(itemId, change) {
    const updatedCart = cart.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      const minimum = item.moq || 1;

      const newQuantity = Math.max(
        minimum,
        item.quantity + change
      );

      return {
        ...item,
        quantity: newQuantity
      };
    });

    setCart(updatedCart);
    saveQuotationCart(updatedCart);
  }

  function removeItem(itemId) {
    const updatedCart = cart.filter(
      (item) => item.id !== itemId
    );

    setCart(updatedCart);
    saveQuotationCart(updatedCart);
  }

  function clearCart() {
    clearQuotationCart();
    setCart([]);
  }

  if (cart.length === 0) {
    return (
      <section className="quotation-page">
        <div className="container">

          <div className="empty-quotation">

            <div className="empty-quotation-icon">
              RFQ
            </div>

            <span className="eyebrow">
              QUOTATION
            </span>

            <h1>
              Your Quotation is Empty
            </h1>

            <p>
              Browse our products and add the items you
              need for your business quotation.
            </p>

            <Link
              to="/products"
              className="btn btn-primary"
            >
              Browse Products
            </Link>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="quotation-page">

      <div className="container">

        <div className="catalog-header">

          <div>
            <span className="eyebrow">
              B2B RFQ
            </span>

            <h1>
              Your Quotation
            </h1>

            <p>
              Review your selected products before
              submitting a quotation request.
            </p>
          </div>

          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Clear Quotation
          </button>

        </div>

        <div className="quotation-layout">

          <div className="quotation-items">

            {cart.map((item) => (

              <article
                className="quotation-item"
                key={item.id}
              >

                <div className="quotation-item-image">

                  <img
                    src={
                      item.image ||
                      "/images/products/default.jpg"
                    }
                    alt={item.productName}
                    onError={(event) => {
                      event.currentTarget.src =
                        "/images/products/default.jpg";
                    }}
                  />

                </div>

                <div className="quotation-item-content">

                  <span className="product-category">
                    B2B Product
                  </span>

                  <h3>
                    {item.productName}
                  </h3>

                  {item.variant && (
                    <div className="quotation-variant">

                      <span>
                        Size:{" "}
                        <strong>
                          {item.variant.size}
                        </strong>
                      </span>

                      <span>
                        Color:{" "}
                        <strong>
                          {item.variant.color}
                        </strong>
                      </span>

                      <span>
                        Material:{" "}
                        <strong>
                          {item.variant.material}
                        </strong>
                      </span>

                    </div>
                  )}

                  <div className="quotation-item-bottom">

                    <div>

                      <small>
                        MOQ: {item.moq} Units
                      </small>

                      <div className="quotation-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, -1)
                          }
                        >
                          −
                        </button>

                        <strong>
                          {item.quantity}
                        </strong>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, 1)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

          <aside className="quotation-summary">

            <span className="eyebrow">
              REQUEST SUMMARY
            </span>

            <h2>
              Quotation Request
            </h2>

            <div className="summary-row">
              <span>
                Products
              </span>

              <strong>
                {cart.length}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Total Units
              </span>

              <strong>
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </strong>
            </div>

            <div className="summary-divider"></div>

            <p>
              Product prices are not shown in this demo.
              The business team will provide the quotation
              based on the requested quantity and variants.
            </p>

            <Link
              to="/request-quotation"
              className="btn btn-primary quotation-submit-btn"
            >
              Request a Quotation
            </Link>

            <Link
              to="/products"
              className="continue-shopping"
            >
              ← Continue Browsing
            </Link>

          </aside>

        </div>

      </div>

    </section>
  );
}

export default Quotation;
