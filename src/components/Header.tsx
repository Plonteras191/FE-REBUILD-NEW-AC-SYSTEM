import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">❄️</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AC System
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 hover:scale-105 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 hover:scale-105 relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 hover:scale-105 relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 hover:scale-105 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>
          
          {/* Right: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link 
                to="/customer/login"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Customer
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                to="/admin/login"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Admin
              </Link>
            </div>
            
            <Link 
              to="/book"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-glow"
            >
              <span className="mr-2">🚀</span>
              Book Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 border border-gray-100 shadow-xl">
              <Link 
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 rounded-lg hover:bg-blue-50"
              >
                About Us
              </button>
              
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 rounded-lg hover:bg-blue-50"
              >
                Services
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 rounded-lg hover:bg-blue-50"
              >
                Contact
              </button>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link 
                  to="/customer/login"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Customer Login
                </Link>
                
                <Link 
                  to="/admin/login"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
                
                <Link 
                  to="/book"
                  className="block mt-3 mx-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-2">🚀</span>
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
