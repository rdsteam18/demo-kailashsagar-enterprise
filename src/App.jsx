import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoWatermark from "./components/DemoWatermark";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Quotation from "./pages/Quotation";
import RequestQuotation from "./pages/RequestQuotation";
import RFQSuccess from "./pages/RFQSuccess";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminRFQs from "./pages/admin/AdminRFQs";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      <DemoWatermark />

      {!isAdmin && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/request-quotation" element={<RequestQuotation />} />
          <Route path="/request-quotation/success" element={<RFQSuccess />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="rfqs" element={<AdminRFQs />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
