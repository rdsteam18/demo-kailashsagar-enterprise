import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getQuotationCart,
  addRFQ,
  clearQuotationCart
} from "../utils/storage";

function RequestQuotation() {
  const navigate = useNavigate();

  const cart = getQuotationCart();

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    gstNumber: "",
    address: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.companyName.trim()) {
      newErrors.companyName =
        "Company name is required.";
    }

    if (!form.contactPerson.trim()) {
      newErrors.contactPerson =
        "Contact person is required.";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile =
        "Mobile number is required.";
    } else if (
      !/^[0-9+\-\s]{8,15}$/.test(
        form.mobile.trim()
      )
    ) {
      newErrors.mobile =
        "Enter a valid mobile number.";
    }

    return newErrors;
  }

  function generateRFQId() {
    const random = Math.floor(
      1000 + Math.random() * 9000
    );

    return `RFQ-${random}`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (cart.length === 0) {
      navigate("/products");
      return;
    }

    const rfq = {
      id: generateRFQId(),

      customer: {
        companyName: form.companyName.trim(),
        contactPerson: form.contactPerson.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        gstNumber: form.gstNumber.trim(),
        address: form.address.trim()
      },

      products: cart.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        variantId: item.variantId,
        variant: item.variant,
        quantity: item.quantity,
        moq: item.moq
      })),

      message: form.message.trim(),

      status: "Pending",

      createdAt: new Date().toISOString()
    };

    addRFQ(rfq);

    clearQuotationCart();

    navigate(
      `/request-quotation/success?rfq=${rfq.id}`
    );
  }

  if (cart.length === 0) {
    return (
      <section className="quotation-page">

        <div className="container">

          <div className="empty-quotation">

            <div className="empty-quotation-icon">
              RFQ
            </div>

            <h1>
              No Products Selected
            </h1>

            <p>
              Add at least one product to your quotation
              before submitting an RFQ.
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
    <section className="request-page">

      <div className="container">

        <div className="request-header">

          <span className="eyebrow">
            BUSINESS ENQUIRY
          </span>

          <h1>
            Request a Quotation
          </h1>

          <p>
            Enter your business details and submit your
            wholesale requirement.
          </p>

        </div>

        <div className="request-layout">

          <form
            className="rfq-form"
            onSubmit={handleSubmit}
          >

            <div className="form-section">

              <h2>
                Business Details
              </h2>

              <p>
                Please provide basic information about
                your business.
              </p>

              <div className="form-grid">

                <div className="form-field">

                  <label htmlFor="companyName">
                    Company Name *
                  </label>

                  <input
                    id="companyName"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />

                  {errors.companyName && (
                    <small className="field-error">
                      {errors.companyName}
                    </small>
                  )}

                </div>

                <div className="form-field">

                  <label htmlFor="contactPerson">
                    Contact Person *
                  </label>

                  <input
                    id="contactPerson"
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    placeholder="Enter contact person"
                  />

                  {errors.contactPerson && (
                    <small className="field-error">
                      {errors.contactPerson}
                    </small>
                  )}

                </div>

                <div className="form-field">

                  <label htmlFor="mobile">
                    Mobile Number *
                  </label>

                  <input
                    id="mobile"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />

                  {errors.mobile && (
                    <small className="field-error">
                      {errors.mobile}
                    </small>
                  )}

                </div>

                <div className="form-field">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />

                </div>

                <div className="form-field">

                  <label htmlFor="gstNumber">
                    GST Number
                  </label>

                  <input
                    id="gstNumber"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                    placeholder="Optional"
                  />

                </div>

                <div className="form-field">

                  <label htmlFor="address">
                    Business Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Business address"
                  />

                </div>

                <div className="form-field form-field-full">

                  <label htmlFor="message">
                    Message / Requirement
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement..."
                  />

                </div>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary submit-rfq-btn"
            >
              Submit Quotation Request
            </button>

          </form>

          <aside className="request-summary">

            <span className="eyebrow">
              SELECTED PRODUCTS
            </span>

            <h2>
              Your Requirement
            </h2>

            <div className="request-products">

              {cart.map((item) => (

                <div
                  className="request-product"
                  key={item.id}
                >

                  <div>
                    <strong>
                      {item.productName}
                    </strong>

                    {item.variant && (
                      <small>
                        {item.variant.size} ·{" "}
                        {item.variant.color}
                      </small>
                    )}
                  </div>

                  <span>
                    {item.quantity} Units
                  </span>

                </div>

              ))}

            </div>

            <div className="request-summary-note">
              <strong>
                Demo quotation
              </strong>

              <p>
                This request is stored only in your
                browser for demonstration purposes.
              </p>
            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}

export default RequestQuotation;
