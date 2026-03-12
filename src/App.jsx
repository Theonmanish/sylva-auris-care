import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import CareGuide from "./pages/CareGuide";
import NotFound from "./pages/NotFound";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./admin/utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Care App */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/care/:code" element={<CareGuide />} />
        </Route>

        {/* Admin Routes — No MainLayout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
