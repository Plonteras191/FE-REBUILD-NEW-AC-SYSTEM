
import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Plus, Trash2, User, Mail, Phone, MapPin, Calendar, Settings, Zap } from "lucide-react"
import Layout from "../components/Layout"

interface Service {
  id: string
  type: "Cleaning" | "Repair" | "Installation" | "Maintenance"
  acType: "Central" | "Window" | "Split"
  date: string
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
    services: [{ id: "1", type: "Cleaning", acType: "Split", date: "" }],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
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

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { id: String(prev.services.length + 1), type: "Cleaning", acType: "Split", date: "" },
      ],
    }))
  }

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    toast.success("Booking submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <label className="text-sm font-medium text-gray-700">AC Type</label>
                        <select
                          value={service.acType}
                          onChange={(e) => handleServiceChange(index, "acType", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white"
                        >
                          <option value="Central">Central AC</option>
                          <option value="Window">Window AC</option>
                          <option value="Split">Split AC</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Service Date</label>
                        <input
                          type="date"
                          value={service.date}
                          onChange={(e) => handleServiceChange(index, "date", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                          required
                        />
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
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                Submit Booking Request
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
