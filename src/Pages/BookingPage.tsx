
import type React from "react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Plus, Trash2, User, Mail, Phone, MapPin, Calendar, Settings, Zap } from "lucide-react"
import Layout from "../components/Layout"
import { bookingAPI, type BookingFormData as APIBookingFormData } from "../Api/api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format, parse, isValid } from "date-fns"

interface ACTypeInput {
  id: string
  type: "Central" | "Window" | "Split"
}

interface Service {
  id: string
  type: "Cleaning" | "Repair" | "Installation" | "Maintenance"
  date: string
  acTypes: ACTypeInput[]
}

interface BookingFormData {
  name: string
  email: string
  phone: string
  address: string
  services: Service[]
}

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    services: [{ 
      id: "1", 
      type: "Cleaning", 
      date: "", 
      acTypes: [{ id: "1", type: "Split" }]
    }],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [isLoadingDates, setIsLoadingDates] = useState(true)

  // Fetch available dates on component mount
  useEffect(() => {
    fetchAvailableDates()
  }, [])

  const fetchAvailableDates = async () => {
    try {
      setIsLoadingDates(true)
      const currentDate = new Date()
      const endDate = new Date()
      endDate.setFullYear(currentDate.getFullYear() + 1) // Get dates for next year
      
      const dates = await bookingAPI.getAvailableDates(
        currentDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      )
      
      setAvailableDates(dates)
    } catch (error) {
      console.error('Error fetching available dates:', error)
      toast.error('Failed to load available dates')
    } finally {
      setIsLoadingDates(false)
    }
  }

  // Check if a specific date is available
  const isDateAvailable = (date: string): boolean => {
    if (!date) return true
    return availableDates.includes(date)
  }

  // Check if a Date object is disabled (for react-datepicker)
  const isDateDisabled = (date: Date): boolean => {
    const dateString = format(date, 'yyyy-MM-dd')
    return !availableDates.includes(dateString)
  }

  // Convert Date object to string for our form data
  const formatDateForForm = (date: Date | null): string => {
    if (!date) return ""
    return format(date, 'yyyy-MM-dd')
  }

  // Convert string date to Date object for react-datepicker
  const parseFormDate = (dateString: string): Date | null => {
    if (!dateString) return null
    try {
      const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date())
      return isValid(parsedDate) ? parsedDate : null
    } catch {
      return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (index: number, field: keyof Service, value: string | ACTypeInput[]) => {
    // If changing date, validate availability
    if (field === 'date' && typeof value === 'string' && value) {
      if (!isDateAvailable(value)) {
        toast.error('Selected date is not available. Please choose another date.')
        return
      }
    }

    setFormData((prev) => {
      const newServices = [...prev.services]
      newServices[index] = {
        ...newServices[index],
        [field]: value,
      }
      return {
        ...prev,
        services: newServices,
      }
    })
  }

  const handleACTypeChange = (serviceIndex: number, acTypeIndex: number, field: keyof ACTypeInput, value: string) => {
    setFormData((prev) => {
      const newServices = [...prev.services]
      const newACTypes = [...newServices[serviceIndex].acTypes]
      newACTypes[acTypeIndex] = {
        ...newACTypes[acTypeIndex],
        [field]: value,
      }
      newServices[serviceIndex] = {
        ...newServices[serviceIndex],
        acTypes: newACTypes,
      }
      return {
        ...prev,
        services: newServices,
      }
    })
  }

  const addACType = (serviceIndex: number) => {
    setFormData((prev) => {
      const newServices = [...prev.services]
      const newACTypes = [...newServices[serviceIndex].acTypes]
      newACTypes.push({
        id: String(newACTypes.length + 1),
        type: "Split",
      })
      newServices[serviceIndex] = {
        ...newServices[serviceIndex],
        acTypes: newACTypes,
      }
      return {
        ...prev,
        services: newServices,
      }
    })
  }

  const removeACType = (serviceIndex: number, acTypeIndex: number) => {
    setFormData((prev) => {
      const newServices = [...prev.services]
      const newACTypes = newServices[serviceIndex].acTypes.filter((_, i) => i !== acTypeIndex)
      newServices[serviceIndex] = {
        ...newServices[serviceIndex],
        acTypes: newACTypes,
      }
      return {
        ...prev,
        services: newServices,
      }
    })
  }

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { 
          id: String(prev.services.length + 1), 
          type: "Cleaning", 
          date: "", 
          acTypes: [{ id: "1", type: "Split" }]
        },
      ],
    }))
  }

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that all services have at least one AC type
    for (const service of formData.services) {
      if (service.acTypes.length === 0) {
        toast.error("Each service must have at least one AC type")
        return
      }
    }

    // Validate that all selected dates are still available
    const selectedDates = formData.services.map(service => service.date).filter(date => date)
    for (const date of selectedDates) {
      if (!isDateAvailable(date)) {
        toast.error(`Date ${new Date(date).toLocaleDateString()} is no longer available. Please select another date.`)
        return
      }
    }

    // Double-check availability with the server before submitting
    if (selectedDates.length > 0) {
      try {
        const availabilityCheck = await bookingAPI.checkDateAvailability(selectedDates)
        
        for (const date of selectedDates) {
          if (!availabilityCheck.dates[date]?.available) {
            toast.error(`Date ${new Date(date).toLocaleDateString()} is no longer available. Please refresh and select another date.`)
            // Refresh available dates
            await fetchAvailableDates()
            return
          }
        }
      } catch (error) {
        console.error('Error checking date availability:', error)
        toast.error('Unable to verify date availability. Please try again.')
        return
      }
    }

    setIsSubmitting(true)
    
    try {
      // Transform data to match Laravel API format
      const apiFormData: APIBookingFormData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        completeAddress: formData.address,
        services: formData.services.map(service => ({
          type: service.type,
          date: service.date,
          acTypes: service.acTypes.map(acType => ({
            type: acType.type,
          })),
        })),
      }

      console.log("Submitting booking:", apiFormData)
      
      const response = await bookingAPI.createBooking(apiFormData)
      
      if (response.success) {
        toast.success(`Booking created successfully! Booking ID: ${response.bookingId}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          services: [{ 
            id: "1", 
            type: "Cleaning", 
            date: "", 
            acTypes: [{ id: "1", type: "Split" }]
          }],
        })
        
        // Refresh available dates since booking was successful
        await fetchAvailableDates()
      } else {
        toast.error(response.message || "Failed to create booking")
      }
    } catch (error: any) {
      console.error("Booking submission error:", error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.message) {
        toast.error(error.message)
      } else {
        toast.error("Failed to submit booking. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "Cleaning":
        return <Zap className="w-4 h-4" />
      case "Repair":
        return <Settings className="w-4 h-4" />
      case "Installation":
        return <Plus className="w-4 h-4" />
      case "Maintenance":
        return <Settings className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        {/* Custom styles for React DatePicker */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .react-datepicker {
              border: 1px solid #e5e7eb !important;
              border-radius: 0.75rem !important;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
            }
            .react-datepicker__header {
              background-color: #3b82f6 !important;
              border-bottom: none !important;
              border-radius: 0.75rem 0.75rem 0 0 !important;
            }
            .react-datepicker__current-month {
              color: white !important;
              font-weight: 600 !important;
            }
            .react-datepicker__day-name {
              color: white !important;
            }
            .react-datepicker__navigation {
              top: 12px !important;
            }
            .react-datepicker__navigation--previous {
              border-right-color: white !important;
            }
            .react-datepicker__navigation--next {
              border-left-color: white !important;
            }
            .react-datepicker__day:hover {
              background-color: #3b82f6 !important;
              color: white !important;
            }
            .react-datepicker__day--selected {
              background-color: #1d4ed8 !important;
              color: white !important;
            }
            .react-datepicker__day--disabled {
              color: #d1d5db !important;
              background-color: #f9fafb !important;
              cursor: not-allowed !important;
            }
            .react-datepicker__day--disabled:hover {
              background-color: #f9fafb !important;
              color: #d1d5db !important;
            }
            .react-datepicker__triangle {
              border-bottom-color: #3b82f6 !important;
            }
          `
        }} />
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your AC service with our professional team. Fill out the form below and we'll get back to you
              shortly.
            </p>
            
            {/* Date Availability Info */}
            {isLoadingDates ? (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-700 text-sm">Loading available dates...</p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm">
                  📅 {availableDates.length > 0 
                    ? `${availableDates.length} dates available for booking` 
                    : 'No available dates found. Please try again later.'
                  } (Maximum 2 bookings per day)
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                  <User className="w-6 h-6" />
                  Customer Information
                </h2>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Service Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                      placeholder="Enter service address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                  <Settings className="w-6 h-6" />
                  Service Details
                </h2>
              </div>

              <div className="p-8 space-y-6">
                {formData.services.map((service, index) => (
                  <div
                    key={service.id}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:bg-blue-50 hover:border-blue-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        {getServiceIcon(service.type)}
                        Service #{index + 1}
                      </h3>
                      {formData.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Service Type</label>
                        <select
                          value={service.type}
                          onChange={(e) => handleServiceChange(index, "type", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white"
                        >
                          <option value="Cleaning">Cleaning</option>
                          <option value="Repair">Repair</option>
                          <option value="Installation">Installation</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Service Date
                          {isLoadingDates && (
                            <span className="text-xs text-blue-600 ml-2">(Loading available dates...)</span>
                          )}
                        </label>
                        
                        {/* React DatePicker */}
                        <DatePicker
                          selected={parseFormDate(service.date)}
                          onChange={(date) => {
                            const dateString = formatDateForForm(date)
                            handleServiceChange(index, "date", dateString)
                          }}
                          filterDate={(date) => !isDateDisabled(date)}
                          minDate={new Date()}
                          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                          placeholderText="Select a service date"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 ${
                            service.date && !isDateAvailable(service.date) 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-200'
                          }`}
                          disabled={isLoadingDates}
                          dateFormat="yyyy-MM-dd"
                          required
                          autoComplete="off"
                          popperClassName="react-datepicker-popper"
                          calendarClassName="react-datepicker-calendar"
                        />
                        
                        {service.date && !isDateAvailable(service.date) && (
                          <p className="text-xs text-red-600 mt-1">
                            ❌ This date is not available (fully booked). Please select another date.
                          </p>
                        )}
                        
                        {service.date && isDateAvailable(service.date) && (
                          <p className="text-xs text-green-600 mt-1">
                            ✅ This date is available for booking.
                          </p>
                        )}
                        
                        {!isLoadingDates && availableDates.length === 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            No available dates found. Please try again later.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* AC Types Section */}
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">AC Units</h4>
                        <button
                          type="button"
                          onClick={() => addACType(index)}
                          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200 flex items-center gap-2 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add AC Unit
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {service.acTypes.map((acType, acTypeIndex) => (
                          <div key={acType.id} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">AC Type</label>
                                <select
                                  value={acType.type}
                                  onChange={(e) => handleACTypeChange(index, acTypeIndex, "type", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                  <option value="Central">Central AC</option>
                                  <option value="Window">Window AC</option>
                                  <option value="Split">Split AC</option>
                                </select>
                              </div>
                              
                              <div className="flex justify-end">
                                {service.acTypes.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeACType(index, acTypeIndex)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addService}
                  className="w-full py-4 px-6 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Service
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-300 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="text-center mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-700 font-medium">
              📞 Need immediate assistance? Call us at{" "}
              <a href="tel:+1234567890" className="underline hover:text-blue-800 transition-colors">
                (123) 456-7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookingPage
