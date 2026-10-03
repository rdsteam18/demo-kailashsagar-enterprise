import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <div className="container navbar-inner">

        <Link
          to="/"
          className="brand"
        >
          <span className="brand-mark">
            K
          </span>

          <span className="brand-text">
            <strong>
              Kailash Sagar
            </strong>

            <small>
              Enterprise
            </small>
          </span>
        </Link>

        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/categories">
            Categories
          </Link>

          <Link to="/quotation">
            Quotation
          </Link>

          <Link to="/request-quotation">
            Request Quotation
          </Link>

          <a href="#contact">
            Contact
          </a>

        </nav>

        <Link
          to="/request-quotation"
          className="nav-cta"
        >
          Request Quote
        </Link>

      </div>

    </header>
  );
}

export default Navbar;
