import React from "react"
import { useNavigate } from "react-router-dom"
import { Users, Calendar, CheckCircle, Clock } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()

  // Example data - replace with actual data from your API
  const stats = {
    totalBookings: 25,
    pendingBookings: 8,
    acceptedBookings: 15,
    completedBookings: 2,
  }

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true"
    if (!isAuthenticated) {
      navigate("/admin/login", { replace: true })
    }
  }, [navigate])

  const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )

  return (
    <AuthLayout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Monitor and manage all AC service bookings</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={<Users className="w-6 h-6 text-blue-600" />}
              color="bg-blue-50"
            />
            <StatCard
              title="Pending Bookings"
              value={stats.pendingBookings}
              icon={<Clock className="w-6 h-6 text-yellow-600" />}
              color="bg-yellow-50"
            />
            <StatCard
              title="Accepted Bookings"
              value={stats.acceptedBookings}
              icon={<Calendar className="w-6 h-6 text-green-600" />}
              color="bg-green-50"
            />
            <StatCard
              title="Completed Services"
              value={stats.completedBookings}
              icon={<CheckCircle className="w-6 h-6 text-purple-600" />}
              color="bg-purple-50"
            />
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              </div>
              <div className="p-6">
                {/* Add your recent activity content here */}
                <p className="text-gray-600">Recent bookings and updates will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminDashboard
