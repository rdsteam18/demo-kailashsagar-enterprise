import { Link } from "react-router-dom";
import {
  getStoredProducts,
  getStoredCategories,
  getRFQs,
  clearAllDemoStorage,
} from "../../utils/storage";

export default function AdminDashboard() {
  const products = getStoredProducts();
  const categories = getStoredCategories();
  const rfqs = getRFQs();

  const resetDemo = () => {
    const confirmed = window.confirm(
      "Reset all demo data?"
    );

    if (!confirmed) return;

    clearAllDemoStorage();
    window.location.reload();
  };

  const pendingRFQs = rfqs.filter(
    (rfq) => rfq.status === "Pending"
  );

  const recentRFQs = [...rfqs]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div>

      <div className="admin-page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>
            Manage your B2B catalog and quotation requests.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={resetDemo}
        >
          Reset Demo Data
        </button>
      </div>

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <span>Products</span>
          <strong>{products.length}</strong>
          <Link to="/admin/products">
            Manage Products
          </Link>
        </div>

        <div className="admin-stat-card">
          <span>Categories</span>
          <strong>{categories.length}</strong>
          <Link to="/admin/categories">
            Manage Categories
          </Link>
        </div>

        <div className="admin-stat-card">
          <span>Total RFQs</span>
          <strong>{rfqs.length}</strong>
          <Link to="/admin/rfqs">
            View Requests
          </Link>
        </div>

        <div className="admin-stat-card">
          <span>Pending RFQs</span>
          <strong>{pendingRFQs.length}</strong>
          <Link to="/admin/rfqs">
            Review Pending
          </Link>
        </div>

      </div>

      <div className="admin-section-card">

        <div className="admin-section-header">
          <div>
            <h2>Recent Quotation Requests</h2>
            <p>Latest customer RFQs from this demo.</p>
          </div>

          <Link to="/admin/rfqs">
            View All
          </Link>
        </div>

        {recentRFQs.length === 0 ? (
          <div className="admin-empty">
            No quotation requests yet.
          </div>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>RFQ ID</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentRFQs.map((rfq) => (
                  <tr key={rfq.id}>
                    <td>{rfq.id}</td>

                    <td>
                      {rfq.customer.companyName}
                    </td>

                    <td>
                      {rfq.customer.contactPerson}
                    </td>

                    <td>
                      {rfq.products.length}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${rfq.status.toLowerCase()}`}
                      >
                        {rfq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}
