import React, { useState } from "react"
import { AlertCircle, Users } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"
import { toast } from "react-toastify"

interface Technician {
  id: string
  name: string
}

interface Appointment {
  id: string
  customerName: string
  date: string
  service: string
  acType: string
  status: "pending" | "accepted" | "completed" | "rejected"
  technicians: Technician[]
}

const AdminAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "accepted">("pending")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [newDate, setNewDate] = useState("")
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([])

  // Example data - replace with actual data from your API
  const appointments: Appointment[] = [
    {
      id: "1",
      customerName: "John Doe",
      date: "2025-08-15",
      service: "Cleaning",
      acType: "Split",
      status: "pending",
      technicians: []
    },
    {
      id: "2",
      customerName: "Jane Smith",
      date: "2025-08-20",
      service: "Repair",
      acType: "Window",
      status: "accepted",
      technicians: [{ id: "1", name: "Tech 1" }]
    }
  ]

  // Example technicians - replace with actual data
  const availableTechnicians: Technician[] = [
    { id: "1", name: "Tech 1" },
    { id: "2", name: "Tech 2" },
    { id: "3", name: "Tech 3" }
  ]

  const handleAccept = (appointment: Appointment) => {
    // TODO: Implement actual API call
    console.log(`Processing appointment ${appointment.id} for ${appointment.customerName}`)
    toast.success("Appointment accepted successfully!")
  }

  const handleReject = () => {
    if (!selectedAppointment || !rejectReason) return
    // TODO: Implement actual API call
    toast.success("Appointment rejected successfully!")
    setIsRejectModalOpen(false)
    setRejectReason("")
  }

  const handleReschedule = () => {
    if (!selectedAppointment || !newDate) return
    // TODO: Implement actual API call
    toast.success("Appointment rescheduled successfully!")
    setIsRescheduleModalOpen(false)
    setNewDate("")
  }

  const handleComplete = (appointment: Appointment) => {
    // TODO: Implement actual API call
    console.log(`Marking appointment ${appointment.id} as completed`)
    toast.success("Service marked as completed!")
  }

  const handleAssignTechnicians = () => {
    if (!selectedAppointment || !selectedTechnicians.length) return
    // TODO: Implement actual API call
    toast.success("Technicians assigned successfully!")
    setIsTechnicianModalOpen(false)
    setSelectedTechnicians([])
  }

  const filteredAppointments = appointments.filter(
    (apt) => activeTab === "pending" ? apt.status === "pending" : apt.status === "accepted"
  )

  return (
    <AuthLayout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
            <p className="mt-2 text-gray-600">Manage and track all customer appointments</p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`pb-4 px-1 ${
                    activeTab === "pending"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } font-medium`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("accepted")}
                  className={`pb-4 px-1 ${
                    activeTab === "accepted"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } font-medium`}
                >
                  Accepted
                </button>
              </nav>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    AC Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Technicians
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.acType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {appointment.technicians.length ? (
                          <span>{appointment.technicians.map(t => t.name).join(", ")}</span>
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsTechnicianModalOpen(true)
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appointment.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        {activeTab === "pending" ? (
                          <>
                            <button
                              onClick={() => handleAccept(appointment)}
                              className="text-green-600 hover:text-green-800"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setIsRejectModalOpen(true)
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleComplete(appointment)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsRescheduleModalOpen(true)
                          }}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Reschedule
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {isRejectModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold">Reject Appointment</h3>
            </div>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="w-full px-4 py-2 border rounded-lg mb-4"
              rows={4}
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsRejectModalOpen(false)
                  setRejectReason("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              min={new Date().toISOString().split("T")[0]}
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsRescheduleModalOpen(false)
                  setNewDate("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Technicians Modal */}
      {isTechnicianModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Assign Technicians</h3>
            <div className="space-y-2 mb-4">
              {availableTechnicians.map((tech) => (
                <label key={tech.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTechnicians.includes(tech.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTechnicians([...selectedTechnicians, tech.id])
                      } else {
                        setSelectedTechnicians(selectedTechnicians.filter(id => id !== tech.id))
                      }
                    }}
                    className="rounded text-blue-600"
                  />
                  <span>{tech.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsTechnicianModalOpen(false)
                  setSelectedTechnicians([])
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTechnicians}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

export default AdminAppointments
