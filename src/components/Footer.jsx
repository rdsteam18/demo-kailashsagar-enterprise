import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">

        <div>
          <h3>Kailash Sagar Enterprise</h3>

          <p>
            B2B Wholesale Products
          </p>

          <p className="footer-demo">
            Demo Version — For Presentation Purpose Only
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/quotation">Quotation Cart</Link>
          <Link to="/request-quotation">Request Quotation</Link>
          <Link to="/admin/login" style={{ color: "#779683", marginTop: "12px", display: "inline-block" }}>
            Admin Demo →
          </Link>
        </div>

        <div>
          <h4>Business Enquiry</h4>

          <p>For wholesale and bulk requirements</p>
          <p>Contact details will be added in the final project.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>
            © 2026 Kailash Sagar Enterprise
          </span>

          <span>
            Demo by DJP TECH
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
