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

  const serviceOptions = [
    { value: 'cleaning', label: '🧽 AC Cleaning', description: 'Deep clean filters and coils' },
    { value: 'repair', label: '🔧 AC Repair', description: 'Fix cooling and electrical issues' },
    { value: 'installation', label: '⚡ AC Installation', description: 'Professional AC setup' },
    { value: 'maintenance', label: '🛠️ AC Maintenance', description: 'Regular checkup and tune-up' }
  ];

  const acTypeOptions = [
    { value: 'split', label: '❄️ Split AC', description: 'Wall-mounted indoor unit' },
    { value: 'central', label: '🏢 Central AC', description: 'Whole building cooling' },
    { value: 'window', label: '🪟 Window AC', description: 'Compact window unit' }
  ];

  return (
    <Layout>
      {/* Background with Gradient */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Book Your Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional AC service in just a few simple steps
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            
            {/* Progress Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {step === 1 && "Customer Information"}
                  {step === 2 && "Service Details"}
                  {step === 3 && "Schedule Appointment"}
                </h2>
                <div className="text-sm opacity-90">
                  Step {step} of 3
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 transform ${
                          step >= index 
                            ? 'bg-white text-blue-600 shadow-lg scale-110' 
                            : 'bg-blue-400/50 text-white/70 scale-100'
                        }`}
                      >
                        {step > index ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index
                        )}
                      </div>
                      <div className="text-xs mt-2 text-center opacity-90">
                        {index === 1 && "Info"}
                        {index === 2 && "Service"}
                        {index === 3 && "Schedule"}
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                        step > index ? 'bg-white' : 'bg-blue-400/30'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 hover:bg-white group-hover:shadow-md"
                            placeholder="Enter your full name"
                            required
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 hover:bg-white group-hover:shadow-md"
                            placeholder="your.email@example.com"
                            required
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 hover:bg-white group-hover:shadow-md"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Complete Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 hover:bg-white group-hover:shadow-md resize-none"
                        placeholder="Enter your complete service address..."
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Service Details */}
                {step === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Select Service Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                              formData.serviceType === option.value
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 bg-white/70 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="serviceType"
                              value={option.value}
                              checked={formData.serviceType === option.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex-1">
                              <div className="text-lg font-semibold text-gray-900 mb-1">
                                {option.label}
                              </div>
                              <div className="text-sm text-gray-600">
                                {option.description}
                              </div>
                            </div>
                            {formData.serviceType === option.value && (
                              <div className="absolute top-4 right-4">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Select AC Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {acTypeOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                              formData.acType === option.value
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 bg-white/70 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="acType"
                              value={option.value}
                              checked={formData.acType === option.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="text-lg font-semibold text-gray-900 mb-1">
                                {option.label}
                              </div>
                              <div className="text-sm text-gray-600">
                                {option.description}
                              </div>
                            </div>
                            {formData.acType === option.value && (
                              <div className="absolute top-4 right-4">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Preferred Time</h3>
                      <p className="text-gray-600">Select a convenient date and time for your service appointment</p>
                    </div>

                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Appointment Date & Time *
                      </label>
                      <div className="relative group">
                        <DatePicker
                          selected={formData.appointmentDate}
                          onChange={handleDateChange}
                          showTimeSelect
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 hover:bg-white group-hover:shadow-md text-center text-lg"
                          minDate={new Date()}
                          placeholderText="Click to select date and time"
                          timeIntervals={30}
                          minTime={new Date(0, 0, 0, 8, 0)}
                          maxTime={new Date(0, 0, 0, 18, 0)}
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Available Monday - Saturday, 8:00 AM - 6:00 PM
                      </p>
                    </div>

                    {/* Booking Summary */}
                    {formData.appointmentDate && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Customer:</span>
                            <span className="font-medium">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service:</span>
                            <span className="font-medium">{serviceOptions.find(s => s.value === formData.serviceType)?.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">AC Type:</span>
                            <span className="font-medium">{acTypeOptions.find(a => a.value === formData.acType)?.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date & Time:</span>
                            <span className="font-medium">{formData.appointmentDate.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="group flex items-center px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="group flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Continue
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="group flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Confirm Booking
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure & Encrypted
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fast Response
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                5-Star Service
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </Layout>
  );
};

export default BookingPage;