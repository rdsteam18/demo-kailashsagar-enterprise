import { useState } from "react";
import {
  getRFQs,
  saveRFQs,
} from "../../utils/storage";

const statuses = [
  "Pending",
  "Reviewed",
  "Quoted",
  "Completed",
  "Rejected",
];

export default function AdminRFQs() {
  const [rfqs, setRFQs] = useState(
    getRFQs()
  );

  const [selectedRFQ, setSelectedRFQ] =
    useState(null);

  const updateStatus = (id, status) => {
    const updated = rfqs.map((rfq) =>
      rfq.id === id
        ? {
            ...rfq,
            status,
          }
        : rfq
    );

    setRFQs(updated);
    saveRFQs(updated);

    if (selectedRFQ?.id === id) {
      setSelectedRFQ({
        ...selectedRFQ,
        status,
      });
    }
  };

  const sortedRFQs = [...rfqs].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  return (
    <div>

      <div className="admin-page-heading">
        <div>
          <h1>Quotation Requests</h1>
          <p>
            Manage customer RFQ requests.
          </p>
        </div>
      </div>

      {sortedRFQs.length === 0 ? (
        <div className="admin-section-card">
          <div className="admin-empty">
            No quotation requests have been submitted yet.
          </div>
        </div>
      ) : (
        <div className="admin-section-card">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>RFQ ID</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Mobile</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {sortedRFQs.map((rfq) => (

                  <tr key={rfq.id}>

                    <td>
                      <strong>
                        {rfq.id}
                      </strong>
                    </td>

                    <td>
                      {rfq.customer.companyName}
                    </td>

                    <td>
                      {rfq.customer.contactPerson}
                    </td>

                    <td>
                      {rfq.customer.mobile}
                    </td>

                    <td>
                      {rfq.products.length}
                    </td>

                    <td>

                      <select
                        className="status-select"
                        value={rfq.status}
                        onChange={(e) =>
                          updateStatus(
                            rfq.id,
                            e.target.value
                          )
                        }
                      >
                        {statuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          setSelectedRFQ(rfq)
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {selectedRFQ && (

        <div className="rfq-detail-overlay">

          <div className="rfq-detail-card">

            <div className="rfq-detail-header">

              <div>
                <span>Quotation Request</span>
                <h2>
                  {selectedRFQ.id}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setSelectedRFQ(null)
                }
              >
                ×
              </button>

            </div>

            <div className="rfq-customer-grid">

              <div>
                <span>Company</span>
                <strong>
                  {selectedRFQ.customer.companyName}
                </strong>
              </div>

              <div>
                <span>Contact Person</span>
                <strong>
                  {selectedRFQ.customer.contactPerson}
                </strong>
              </div>

              <div>
                <span>Mobile</span>
                <strong>
                  {selectedRFQ.customer.mobile}
                </strong>
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {selectedRFQ.customer.email ||
                    "-"}
                </strong>
              </div>

              <div>
                <span>GST Number</span>
                <strong>
                  {selectedRFQ.customer.gstNumber ||
                    "-"}
                </strong>
              </div>

              <div>
                <span>Address</span>
                <strong>
                  {selectedRFQ.customer.address ||
                    "-"}
                </strong>
              </div>

            </div>

            <div className="rfq-products">

              <h3>
                Requested Products
              </h3>

              {selectedRFQ.products.map(
                (product, index) => (

                  <div
                    className="rfq-product-row"
                    key={`${product.productId}-${index}`}
                  >

                    <div>
                      <strong>
                        {product.productName}
                      </strong>

                      {product.variant && (
                        <span>
                          {product.variant.size &&
                            `Size: ${product.variant.size} `}
                          {product.variant.color &&
                            `• Color: ${product.variant.color}`}
                        </span>
                      )}
                    </div>

                    <strong>
                      Qty: {product.quantity}
                    </strong>

                  </div>

                )
              )}

            </div>

            {selectedRFQ.message && (
              <div className="rfq-message-box">

                <span>Customer Message</span>

                <p>
                  {selectedRFQ.message}
                </p>

              </div>
            )}

            <div className="rfq-status-actions">

              <span>
                Update Status
              </span>

              <select
                value={selectedRFQ.status}
                onChange={(e) =>
                  updateStatus(
                    selectedRFQ.id,
                    e.target.value
                  )
                }
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
