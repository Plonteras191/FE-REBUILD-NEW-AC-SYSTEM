import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../components/Layout";

interface FormData {
  // Customer Info
  name: string;
  email: string;
  phone: string;
  address: string;
  // Service Details
  serviceType: 'cleaning' | 'repair' | 'installation' | 'maintenance';
  acType: 'central' | 'window' | 'split';
  // Schedule
  appointmentDate: Date | null;
}

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'cleaning',
    acType: 'split',
    appointmentDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      appointmentDate: date
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
          toast.error('Please fill in all customer information fields');
          return false;
        }
        if (!formData.email.includes('@')) {
          toast.error('Please enter a valid email address');
          return false;
        }
        return true;
      case 2:
        if (!formData.serviceType || !formData.acType) {
          toast.error('Please select both service type and AC type');
          return false;
        }
        return true;
      case 3:
        if (!formData.appointmentDate) {
          toast.error('Please select an appointment date and time');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      try {
        // Add your API call here to submit the form data
        // await submitBooking(formData);
        toast.success('Booking submitted successfully!');
        // Reset form or redirect
      } catch (error) {
        toast.error('Failed to submit booking. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900">Book Your AC Service</h2>
            <div className="mt-4 flex justify-center space-x-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Complete Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Type</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="cleaning">Cleaning</option>
                    <option value="repair">Repair</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">AC Type</label>
                  <select
                    name="acType"
                    value={formData.acType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="central">Central AC</option>
                    <option value="window">Window AC</option>
                    <option value="split">Split AC</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Schedule Appointment</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Date & Time</label>
                  <DatePicker
                    selected={formData.appointmentDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    minDate={new Date()}
                    placeholderText="Click to select date and time"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Submit Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
      </div>
    </Layout>
  );
};

export default BookingPage;
