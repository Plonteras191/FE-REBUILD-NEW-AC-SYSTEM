import React from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Clock, List, Plus } from "lucide-react"
import Layout from "../../components/Layout"

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const userStr = localStorage.getItem("user")
  const user = userStr ? JSON.parse(userStr) : { name: "Guest" }
  const customerName = user.name

  // Redirect to login if not authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      navigate("/customer/login", { replace: true })
    }
  }, [navigate])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Hello, {customerName}!</h1>
            <p className="text-blue-100">Welcome to your AC Service Dashboard</p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Book New Appointment */}
            <div 
              onClick={() => navigate("/book")}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Book New Appointment</h3>
              <p className="text-gray-600">Schedule a new service for your AC system</p>
            </div>

            {/* View Appointments */}
            <div 
              onClick={() => navigate("/customer/appointments")}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <List className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View All Appointments</h3>
              <p className="text-gray-600">Check your upcoming and past services</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-gray-600">Next Appointment</p>
                  <p className="text-lg font-semibold">Aug 15, 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-gray-600">Total Services</p>
                  <p className="text-lg font-semibold">5 Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <List className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-gray-600">Active Bookings</p>
                  <p className="text-lg font-semibold">2 Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
