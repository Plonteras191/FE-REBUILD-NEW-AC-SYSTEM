import React, { useState, useEffect } from "react"
import { Users } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"
import { toast } from "react-toastify"
import api from "../../Api/api"

interface Technician {
  id: string
  name: string
}

interface ServiceData {
  type: string
  date: string
  ac_types: string[]
}

interface Appointment {
  id: string
  name: string
  phone: string
  email: string
  complete_address: string
  status: string
  status_id: number
  technicians: string[]
  services: string // JSON string of ServiceData[]
  created_at: string
}

const AdminAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "accepted">("pending")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false)
  const [newDate, setNewDate] = useState("")
  const [selectedTechnicianNames, setSelectedTechnicianNames] = useState<string[]>([])
  const [newTechnicianName, setNewTechnicianName] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [availableTechnicians, setAvailableTechnicians] = useState<Technician[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch appointments and technicians on component mount
  useEffect(() => {
    fetchAppointments()
    fetchTechnicians()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await api.get('/appointments')
      setAppointments(response.data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const fetchTechnicians = async () => {
    try {
      const response = await api.get('/appointments/technicians')
      setAvailableTechnicians(response.data)
    } catch (error) {
      console.error('Error fetching technicians:', error)
      toast.error('Failed to fetch technicians')
    }
  }

  // Parse services from JSON string
  const parseServices = (servicesJson: string): ServiceData[] => {
    try {
      return JSON.parse(servicesJson)
    } catch {
      return []
    }
  }

  const handleAccept = async (appointment: Appointment) => {
    try {
      const response = await api.post(`/appointments/${appointment.id}/accept`, {
        technician_names: appointment.technicians
      })
      if (response.data.message) {
        toast.success(response.data.message)
        await fetchAppointments() // Refresh appointments
      }
    } catch (error: any) {
      console.error('Error accepting appointment:', error)
      const errorMessage = error.response?.data?.error || 'Failed to accept appointment'
      toast.error(errorMessage)
    }
  }

  const handleCancel = async (appointment: Appointment) => {
    try {
      const response = await api.delete(`/appointments/${appointment.id}`)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAppointments() // Refresh appointments
      }
    } catch (error: any) {
      console.error('Error cancelling appointment:', error)
      const errorMessage = error.response?.data?.message || 'Failed to cancel appointment'
      toast.error(errorMessage)
    }
  }

  const handleReschedule = async () => {
    if (!selectedAppointment || !newDate) return
    
    try {
      const services = parseServices(selectedAppointment.services)
      if (services.length === 0) {
        toast.error('No services found to reschedule')
        return
      }

      // For simplicity, reschedule the first service or allow user to select
      const serviceToReschedule = services[0]
      
      const response = await api.post(`/appointments/${selectedAppointment.id}/reschedule`, {
        service_name: serviceToReschedule.type,
        new_date: newDate
      })
      
      if (response.data) {
        toast.success('Appointment rescheduled successfully!')
        await fetchAppointments() // Refresh appointments
        setIsRescheduleModalOpen(false)
        setNewDate("")
      }
    } catch (error: any) {
      console.error('Error rescheduling appointment:', error)
      const errorMessage = error.response?.data?.error || 'Failed to reschedule appointment'
      toast.error(errorMessage)
    }
  }

  const handleComplete = async (appointment: Appointment) => {
    try {
      const response = await api.post(`/appointments/${appointment.id}/complete`)
      if (response.data) {
        toast.success('Service marked as completed!')
        await fetchAppointments() // Refresh appointments
      }
    } catch (error: any) {
      console.error('Error completing appointment:', error)
      const errorMessage = error.response?.data?.error || 'Failed to complete appointment'
      toast.error(errorMessage)
    }
  }

  const handleAssignTechnicians = async () => {
    if (!selectedAppointment || !selectedTechnicianNames.length) return
    
    try {
      const response = await api.post(`/appointments/${selectedAppointment.id}/assign-technicians`, {
        technician_names: selectedTechnicianNames
      })
      
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAppointments() // Refresh appointments
        await fetchTechnicians() // Refresh technicians list to include any new ones
        setIsTechnicianModalOpen(false)
        setSelectedTechnicianNames([])
        setNewTechnicianName("")
      }
    } catch (error: any) {
      console.error('Error assigning technicians:', error)
      const errorMessage = error.response?.data?.error || 'Failed to assign technicians'
      toast.error(errorMessage)
    }
  }

  const handleAddNewTechnician = () => {
    const trimmedName = newTechnicianName.trim()
    if (!trimmedName) {
      toast.error('Please enter a technician name')
      return
    }

    // Check if technician name already exists
    const existsInAvailable = availableTechnicians.some(tech => 
      tech.name.toLowerCase() === trimmedName.toLowerCase()
    )
    const existsInSelected = selectedTechnicianNames.some(name => 
      name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (existsInAvailable || existsInSelected) {
      toast.error('Technician name already exists')
      return
    }

    // Add to selected technicians
    setSelectedTechnicianNames([...selectedTechnicianNames, trimmedName])
    setNewTechnicianName("")
    toast.success(`Added "${trimmedName}" to selection`)
  }

  const handleRemoveTechnician = (technicianName: string) => {
    setSelectedTechnicianNames(selectedTechnicianNames.filter(name => name !== technicianName))
  }

  const filteredAppointments = appointments.filter(
    (apt) => activeTab === "pending" ? apt.status === "pending" : apt.status === "accepted"
  )

  // Helper function to display services info
  const getServicesDisplay = (appointment: Appointment) => {
    const services = parseServices(appointment.services)
    if (services.length === 0) return 'No services'
    
    return services.map(service => 
      `${service.type} (${new Date(service.date).toLocaleDateString()})`
    ).join(', ')
  }

  // Helper function to display AC types
  const getAcTypesDisplay = (appointment: Appointment) => {
    const services = parseServices(appointment.services)
    if (services.length === 0) return 'N/A'
    
    const allAcTypes = services.flatMap(service => service.ac_types)
    const uniqueAcTypes = [...new Set(allAcTypes)]
    return uniqueAcTypes.join(', ')
  }

  if (loading) {
    return (
      <AuthLayout role="admin">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">Loading appointments...</div>
          </div>
        </div>
      </AuthLayout>
    )
  }

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
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Services & Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    AC Types
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
                      <div>
                        <div className="font-medium">{appointment.name}</div>
                        <div className="text-sm text-gray-500">{appointment.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.phone}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {getServicesDisplay(appointment)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getAcTypesDisplay(appointment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {appointment.technicians.length ? (
                          <span>{appointment.technicians.join(", ")}</span>
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setSelectedTechnicianNames(appointment.technicians)
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
                              onClick={() => handleCancel(appointment)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Cancel
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

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services to reschedule:
              </label>
              <div className="text-sm text-gray-600">
                {getServicesDisplay(selectedAppointment)}
              </div>
            </div>
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
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Assign Technicians</h3>
            
            {/* Existing Technicians */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Technicians:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableTechnicians.map((tech) => (
                  <label key={tech.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTechnicianNames.includes(tech.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTechnicianNames([...selectedTechnicianNames, tech.name])
                        } else {
                          setSelectedTechnicianNames(selectedTechnicianNames.filter(name => name !== tech.name))
                        }
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>{tech.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add New Technician */}
            <div className="mb-4 border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Technician:</h4>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTechnicianName}
                  onChange={(e) => setNewTechnicianName(e.target.value)}
                  placeholder="Enter technician name"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddNewTechnician()
                    }
                  }}
                />
                <button
                  onClick={handleAddNewTechnician}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Selected Technicians */}
            {selectedTechnicianNames.length > 0 && (
              <div className="mb-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Technicians:</h4>
                <div className="space-y-1">
                  {selectedTechnicianNames.map((name, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded">
                      <span className="text-sm">{name}</span>
                      <button
                        onClick={() => handleRemoveTechnician(name)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsTechnicianModalOpen(false)
                  setSelectedTechnicianNames([])
                  setNewTechnicianName("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTechnicians}
                disabled={selectedTechnicianNames.length === 0}
                className={`px-4 py-2 rounded-lg ${
                  selectedTechnicianNames.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Assign ({selectedTechnicianNames.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

export default AdminAppointments
