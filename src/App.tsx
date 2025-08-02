import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import LandingPage from "./Pages/LandingPage"
import NotFound from "./Pages/NotFound"
import BookingPage from "./Pages/BookingPage"
import LoginPage from "./Pages/customer/LoginPage"
import DashboardPage from "./Pages/customer/DashboardPage"
import AppointmentsPage from "./Pages/customer/AppointmentsPage"
import AdminLoginPage from "./Pages/admin/LoginPage"
import AdminDashboard from "./Pages/admin/DashboardPage"
import AdminAppointments from "./Pages/admin/AppointmentsPage"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/customer/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Customer Routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/appointments"
          element={
            <ProtectedRoute role="customer">
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <AdminAppointments />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}
export default App
