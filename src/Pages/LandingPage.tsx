import type React from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"

const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-lg">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Trusted by 10,000+ customers
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 leading-tight">
                  Premium{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
                    AC Solutions
                  </span>
                  <br />
                  for Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                    Comfort
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                  Experience unmatched air conditioning services with certified experts, 24/7 support, and guaranteed satisfaction for your home and business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="group bg-gradient-primary text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-glow hover:shadow-glow-lg flex items-center justify-center"
                >
                  <span className="mr-2">🚀</span>
                  Book Service Now
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                
                <button className="group glass-effect text-gray-900 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="mr-2">📞</span>
                  Call: (555) 123-4567
                </button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { icon: "⚡", text: "24/7 Available", color: "text-green-600" },
                  { icon: "🛡️", text: "Licensed & Insured", color: "text-blue-600" },
                  { icon: "⏱️", text: "Same Day Service", color: "text-purple-600" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`font-semibold ${item.color}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative animate-slideInRight">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-2xl transform rotate-3 opacity-20"></div>
                <div className="absolute inset-0 w-full h-96 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl shadow-2xl transform -rotate-3">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white text-center space-y-4">
                      <div className="text-6xl">❄️</div>
                      <h3 className="text-2xl font-bold">Cool Comfort</h3>
                      <p className="text-lg opacity-90">Professional AC Services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <div className="space-y-4">
                <span className="text-blue-600 font-semibold text-lg">About AC System</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                  Your Trusted{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                    Cooling Partner
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  With over 15 years of experience in the HVAC industry, we've built our reputation on delivering exceptional air conditioning services that keep your spaces comfortable year-round.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "10K+", label: "Happy Customers" },
                  { number: "15+", label: "Years Experience" },
                  { number: "24/7", label: "Support Available" },
                  { number: "99%", label: "Satisfaction Rate" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="text-3xl font-black text-blue-600">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Certified and licensed technicians",
                  "State-of-the-art diagnostic equipment",
                  "Comprehensive warranty on all services",
                  "Eco-friendly and energy-efficient solutions",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white flex flex-col justify-center items-center shadow-xl">
                    <div className="text-4xl mb-2">🔧</div>
                    <div className="text-lg font-bold text-center">Expert Repair</div>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white flex flex-col justify-center items-center shadow-xl">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-sm font-bold text-center">Fast Service</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-32 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl p-6 text-white flex flex-col justify-center items-center shadow-xl">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-sm font-bold text-center">Quality Work</div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-blue-700 to-purple-600 rounded-2xl p-6 text-white flex flex-col justify-center items-center shadow-xl">
                    <div className="text-4xl mb-2">📞</div>
                    <div className="text-lg font-bold text-center">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <span className="text-blue-600 font-semibold text-lg">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
              Complete{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                AC Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emergency repairs to new installations, we provide comprehensive air conditioning services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔧",
                title: "AC Repair & Maintenance",
                description: "Quick diagnosis and repair of all AC issues with preventive maintenance plans",
                features: ["Emergency repairs", "Preventive maintenance", "Parts replacement", "Performance optimization"],
                color: "from-blue-600 to-cyan-600"
              },
              {
                icon: "🏠",
                title: "Installation & Replacement",
                description: "Professional installation of new AC systems and complete unit replacements",
                features: ["New system installation", "Unit replacement", "Ductwork installation", "Energy assessment"],
                color: "from-cyan-600 to-blue-600"
              },
              {
                icon: "❄️",
                title: "Emergency Services",
                description: "24/7 emergency AC services for urgent cooling needs and breakdowns",
                features: ["24/7 availability", "Same-day service", "Emergency repairs", "Holiday service"],
                color: "from-purple-600 to-blue-600"
              },
              {
                icon: "🌿",
                title: "Energy Efficiency",
                description: "Upgrade to energy-efficient systems and reduce your utility costs",
                features: ["Energy audits", "Efficiency upgrades", "Smart thermostats", "Cost analysis"],
                color: "from-green-600 to-cyan-600"
              },
              {
                icon: "🏢",
                title: "Commercial HVAC",
                description: "Specialized commercial air conditioning solutions for businesses",
                features: ["Commercial installation", "Industrial systems", "Maintenance contracts", "System monitoring"],
                color: "from-blue-700 to-purple-600"
              },
              {
                icon: "🔍",
                title: "Inspection & Testing",
                description: "Comprehensive AC system inspections and performance testing",
                features: ["System diagnostics", "Performance testing", "Safety inspections", "Compliance checks"],
                color: "from-indigo-600 to-blue-600"
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg group-hover:shadow-xl">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-blue-200 font-semibold text-lg">Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-black">
                  Ready for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                    Comfort?
                  </span>
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Don't let AC problems disrupt your comfort. Contact us today for fast, reliable service that gets your system running perfectly.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: "📞", title: "Call Us", info: "(555) 123-4567", desc: "Available 24/7 for emergencies" },
                  { icon: "✉️", title: "Email Us", info: "info@acsystem.com", desc: "Quick response guaranteed" },
                  { icon: "📍", title: "Visit Us", info: "123 Service Street, City", desc: "Monday - Friday: 8AM - 6PM" },
                  { icon: "💬", title: "Live Chat", info: "Chat with our experts", desc: "Instant support online" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 glass-effect rounded-2xl">
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{contact.title}</h3>
                      <p className="text-blue-100 font-semibold">{contact.info}</p>
                      <p className="text-blue-200 text-sm">{contact.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Get Free Quote</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                />
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm">
                  <option value="">Select Service</option>
                  <option value="repair">AC Repair</option>
                  <option value="installation">Installation</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="emergency">Emergency Service</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="Describe your AC issue or requirements"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Get Free Quote →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    AC System
                  </h3>
                  <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
                    Your trusted partner for all air conditioning needs. Professional service, guaranteed satisfaction, and 24/7 availability for your comfort and peace of mind.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  {[
                    { icon: "f", name: "Facebook" },
                    { icon: "t", name: "Twitter" },
                    { icon: "in", name: "LinkedIn" },
                    { icon: "ig", name: "Instagram" },
                  ].map((social, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      title={social.name}
                    >
                      <span className="font-bold">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { name: "About Us", href: "#about" },
                    { name: "Services", href: "#services" },
                    { name: "Contact", href: "#contact" },
                    { name: "Emergency Service", href: "#" },
                    { name: "Get Quote", href: "#" },
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Our Services</h4>
                <ul className="space-y-3">
                  {[
                    "AC Repair",
                    "Installation",
                    "Maintenance",
                    "Emergency Service",
                    "Commercial HVAC",
                  ].map((service, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2025 AC System. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
}

export default LandingPage
