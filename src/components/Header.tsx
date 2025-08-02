import React from "react"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"


  // Removed unused isCustomerArea variable
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              AC System
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-1 flex justify-center space-x-8">
            <Link 
              to="/"
              className="text-gray-800 hover:text-blue-600 font-semibold text-lg transition-colors duration-200"
            >
              Home
            </Link>
          </div>
          
          {/* Right: Navigation */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/customer/login"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Customer Login
            </Link>
            <Link 
              to="/admin/login"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Admin Login
            </Link>
            <Link 
              to="/book"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
