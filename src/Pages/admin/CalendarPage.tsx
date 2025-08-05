import React, { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"
import { toast } from "react-toastify"

interface CalendarEvent {
  id: string
  date: string
  customerName: string
  service: string
  acType: string
  time: string
  status: "pending" | "accepted" | "completed"
}

const AdminCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [unavailableDates, setUnavailableDates] = useState<string[]>([])

  // Example events - replace with actual data from your API
  const events: CalendarEvent[] = [
    {
      id: "1",
      date: "2025-08-15",
      customerName: "John Doe",
      service: "Cleaning",
      acType: "Split",
      time: "10:00 AM",
      status: "accepted"
    },
    {
      id: "2",
      date: "2025-08-20",
      customerName: "Jane Smith",
      service: "Repair",
      acType: "Window",
      time: "2:00 PM",
      status: "pending"
    },
    {
      id: "3",
      date: "2025-08-25",
      customerName: "Bob Johnson",
      service: "Installation",
      acType: "Central",
      time: "9:00 AM",
      status: "completed"
    }
  ]

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Cleaning": return "bg-blue-500"
      case "Repair": return "bg-red-500"
      case "Installation": return "bg-green-500"
      case "Maintenance": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const getAcTypeColor = (acType: string) => {
    switch (acType) {
      case "Split": return "border-l-blue-400"
      case "Window": return "border-l-green-400"
      case "Central": return "border-l-purple-400"
      default: return "border-l-gray-400"
    }
  }

  const toggleDayAvailability = (dateString: string) => {
    if (unavailableDates.includes(dateString)) {
      setUnavailableDates(unavailableDates.filter(date => date !== dateString))
      toast.success("Day marked as available")
    } else {
      setUnavailableDates([...unavailableDates, dateString])
      toast.success("Day marked as unavailable")
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getEventsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateString)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const isDateUnavailable = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return unavailableDates.includes(dateString)
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <AuthLayout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
                Calendar
              </h1>
              <p className="mt-2 text-gray-600">Manage appointments and availability</p>
            </div>
            
            {/* Month Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                {formatMonth(currentDate)}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Color Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Cleaning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Repair</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-l-4 border-l-blue-400 bg-gray-100"></div>
                  <span className="text-sm">Split AC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-l-4 border-l-green-400 bg-gray-100"></div>
                  <span className="text-sm">Window AC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-l-4 border-l-purple-400 bg-gray-100"></div>
                  <span className="text-sm">Central AC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 bg-gray-50">
              {weekDays.map((day) => (
                <div key={day} className="p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="h-32 border-r border-b border-gray-200 last:border-r-0"></div>
                }

                const dayEvents = getEventsForDate(day)
                const isUnavailable = isDateUnavailable(day)

                return (
                  <div
                    key={day}
                    onClick={() => {
                      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      toggleDayAvailability(dateString)
                    }}
                    className={`h-32 border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer transition-colors ${
                      isUnavailable ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-medium ${isUnavailable ? 'text-red-600' : 'text-gray-900'}`}>
                        {day}
                      </span>
                      {isUnavailable && (
                        <span className="text-xs text-red-600 font-medium">Unavailable</span>
                      )}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white ${getServiceColor(event.service)} ${getAcTypeColor(event.acType)} border-l-4`}
                          title={`${event.customerName} - ${event.service} (${event.acType}) at ${event.time}`}
                        >
                          <div className="truncate">{event.customerName}</div>
                          <div className="truncate">{event.time}</div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Click on any day to toggle its availability. Unavailable days will be marked in red and customers won't be able to book appointments on those days.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminCalendar
