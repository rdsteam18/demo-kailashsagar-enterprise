import { Link, useSearchParams } from "react-router-dom";

function RFQSuccess() {
  const [searchParams] = useSearchParams();

  const rfqId =
    searchParams.get("rfq") || "RFQ-DEMO";

  return (
    <section className="rfq-success-page">

      <div className="container">

        <div className="rfq-success-card">

          <div className="success-icon">
            ✓
          </div>

          <span className="eyebrow">
            REQUEST RECEIVED
          </span>

          <h1>
            Quotation Request Submitted
          </h1>

          <p>
            Your wholesale requirement has been
            recorded successfully.
          </p>

          <div className="rfq-id-box">

            <span>
              Demo RFQ ID
            </span>

            <strong>
              {rfqId}
            </strong>

          </div>

          <small className="success-note">
            This is a demonstration. No real email,
            SMS, WhatsApp message or order has been created.
          </small>

          <div className="success-actions">

            <Link
              to="/products"
              className="btn btn-secondary"
            >
              Browse Products
            </Link>

            <Link
              to="/"
              className="btn btn-primary"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RFQSuccess;
