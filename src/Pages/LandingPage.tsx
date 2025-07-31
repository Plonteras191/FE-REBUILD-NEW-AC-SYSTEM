import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const LandingPage: React.FC = () => {
  return (
    <Layout>

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 md:py-32">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-6">
              Your Comfort, Our Priority
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 text-center mb-8">
              Experience top-notch air conditioning services for your home and business
            </p>
            <div className="flex justify-center">
              <Link 
                to="/book"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl font-bold mb-4">01</div>
              <h3 className="text-xl font-semibold mb-2">Book Service</h3>
              <p className="text-gray-600">
                Schedule your AC service appointment with just a few clicks
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl font-bold mb-4">02</div>
              <h3 className="text-xl font-semibold mb-2">Expert Visit</h3>
              <p className="text-gray-600">
                Our certified technicians will visit at your scheduled time
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl font-bold mb-4">03</div>
              <h3 className="text-xl font-semibold mb-2">Service Completion</h3>
              <p className="text-gray-600">
                Get your AC system running efficiently with our professional service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 AC System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;