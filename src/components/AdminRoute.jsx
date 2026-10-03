import { Navigate, Outlet } from "react-router-dom";
import { getAdminSession } from "../utils/storage";

export default function AdminRoute() {
  const session = getAdminSession();

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
