import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <span className="eyebrow">
              B2B WHOLESALE
            </span>

            <h1>
              Wholesale Products
              <br />
              for Your Business
            </h1>

            <p>
              Explore our wholesale product catalog and
              submit your bulk requirements for quotation.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                View Products
              </Link>

              <Link to="/request-quotation" className="btn btn-secondary">
                Request Quotation
              </Link>
            </div>

          </div>

          <div className="hero-card">

            <div className="hero-card-top">
              <span>Wholesale Catalog</span>
              <span className="status-dot"></span>
            </div>

            <div className="hero-placeholder">
              <span>PRODUCT</span>
              <strong>CATALOG</strong>
            </div>

            <div className="hero-card-info">
              <div>
                <small>Product Type</small>
                <strong>Wholesale</strong>
              </div>

              <div>
                <small>Order Type</small>
                <strong>Bulk / B2B</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">

          <div className="section-heading">
            <span className="eyebrow">EXPLORE</span>

            <h2>Browse Categories</h2>

            <p>
              Explore products by category and find suitable
              options for your business requirements.
            </p>
          </div>

          <div className="empty-demo-grid">

            <Link
              to="/products?category=cat-garments"
              className="demo-placeholder-card"
            >
              <span>01</span>
              <strong>Garments</strong>
              <small>Explore Products →</small>
            </Link>

            <Link
              to="/products?category=cat-safety"
              className="demo-placeholder-card"
            >
              <span>02</span>
              <strong>Safety Products</strong>
              <small>Explore Products →</small>
            </Link>

            <Link
              to="/products?category=cat-industrial"
              className="demo-placeholder-card"
            >
              <span>03</span>
              <strong>Industrial Products</strong>
              <small>Explore Products →</small>
            </Link>

            <Link
              to="/products?category=cat-packaging"
              className="demo-placeholder-card"
            >
              <span>04</span>
              <strong>Packaging</strong>
              <small>Explore Products →</small>
            </Link>

          </div>

        </div>
      </section>

      <section className="section muted-section" id="products">
        <div className="container">

          <div className="section-heading">
            <span className="eyebrow">CATALOG</span>

            <h2>Featured Products</h2>

            <p>
              Popular products available for wholesale ordering.
            </p>
          </div>

          <div className="home-product-preview">

            <div className="home-product-grid">

              <div className="mini-product-card">
                <div className="mini-product-image">
                  PRODUCT
                </div>

                <span>Garments</span>
                <strong>Premium Cotton T-Shirt</strong>
                <small>MOQ: 50 Units</small>
              </div>

              <div className="mini-product-card">
                <div className="mini-product-image">
                  PRODUCT
                </div>

                <span>Safety Products</span>
                <strong>Industrial Safety Helmet</strong>
                <small>MOQ: 25 Units</small>
              </div>

              <div className="mini-product-card">
                <div className="mini-product-image">
                  PRODUCT
                </div>

                <span>Packaging</span>
                <strong>Corrugated Shipping Box</strong>
                <small>MOQ: 100 Units</small>
              </div>

            </div>

            <div className="home-product-action">

              <Link
                to="/products"
                className="btn btn-primary"
              >
                View Full Catalog
              </Link>

            </div>

          </div>

        </div>
      </section>

      <section className="section" id="quotation">
        <div className="container">

          <div className="quotation-cta">

            <div>
              <span className="eyebrow">
                BULK REQUIREMENT
              </span>

              <h2>Need Bulk Quantity?</h2>

              <p>
                Send your product requirements and business
                details to request a quotation.
              </p>
            </div>

            <Link to="/request-quotation" className="btn btn-primary">
              Request a Quotation
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}

export default Home;
