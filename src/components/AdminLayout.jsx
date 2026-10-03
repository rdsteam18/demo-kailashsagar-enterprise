import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminSession } from "../utils/storage";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-logo">KSE</div>

          <div>
            <strong>Kailash Sagar</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/admin/rfqs"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Quotation Requests
          </NavLink>

        </nav>

        <div className="admin-sidebar-bottom">

          <Link to="/" className="admin-view-site">
            View Website
          </Link>

          <button
            type="button"
            className="admin-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <span className="admin-demo-label">
              DEMO ADMIN PANEL
            </span>
          </div>

          <div className="admin-user">
            <span className="admin-user-dot"></span>
            Admin
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
