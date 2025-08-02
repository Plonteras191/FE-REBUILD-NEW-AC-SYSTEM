import React, { useState } from "react"
import { Calendar, AlertCircle } from "lucide-react"
import Layout from "../../components/Layout"

type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled"

interface Appointment {
  id: string
  date: string
  service: string
  acType: string
  status: AppointmentStatus
}

const AppointmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  // Sample data - replace with actual data
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2025-08-15",
      service: "Cleaning",
      acType: "Split",
      status: "Scheduled",
    },
    {
      id: "2",
      date: "2025-07-20",
      service: "Repair",
      acType: "Window",
      status: "Completed",
    },
  ]

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsRescheduleModalOpen(true)
  }

  const handleCancel = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsCancelModalOpen(true)
  }

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
    }
  }

  const filteredAppointments = appointments.filter((apt) =>
    activeTab === "upcoming" ? apt.status === "Scheduled" : apt.status !== "Scheduled"
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="mt-2 text-gray-600">View and manage your service appointments</p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`pb-4 px-1 ${
                    activeTab === "upcoming"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } font-medium`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`pb-4 px-1 ${
                    activeTab === "past"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } font-medium`}
                >
                  Past
                </button>
              </nav>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AC Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.acType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.status === "Scheduled" && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleReschedule(appointment)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(appointment)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              min={new Date().toISOString().split("T")[0]}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsRescheduleModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold">Cancel Appointment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                No, Keep It
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default AppointmentsPage
