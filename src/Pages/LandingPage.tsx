import type React from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"

const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-32 lg:py-40">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 hover:bg-blue-200 transition-colors duration-300">
                  ⭐ Trusted by 10,000+ customers
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                  Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    Comfort
                  </span>
                  ,
                  <br />
                  Our Priority
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience premium air conditioning services with certified technicians, 24/7 support, and guaranteed
                  satisfaction for your home and business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/book"
                  className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                >
                  Book Service Now
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <button className="group bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-full text-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <span className="mr-2">📞</span>
                  Call Now: (555) 123-4567
                </button>
              </div>

              <div className="flex justify-center items-center space-x-8 pt-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available 24/7
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Licensed & Insured
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Same Day Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Complete AC Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From installation to maintenance, we've got all your cooling needs covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🔧", title: "Repair", desc: "Quick fixes for any AC issue" },
              { icon: "⚙️", title: "Maintenance", desc: "Keep your system running smooth" },
              { icon: "🏠", title: "Installation", desc: "New system setup & replacement" },
              { icon: "❄️", title: "Emergency", desc: "24/7 urgent service calls" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your AC running perfectly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-blue-400 transform -translate-y-1/2"></div>

            {[
              {
                step: "01",
                title: "Book Service",
                desc: "Schedule your appointment online or call us. Choose your preferred time slot.",
                icon: "📅",
              },
              {
                step: "02",
                title: "Expert Visit",
                desc: "Our certified technicians arrive on time with all necessary tools and parts.",
                icon: "👨‍🔧",
              },
              {
                step: "03",
                title: "Service Complete",
                desc: "We fix the issue, test everything, and ensure your complete satisfaction.",
                icon: "✅",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="text-4xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-blue-100">Real reviews from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                text: "Excellent service! They fixed my AC in no time and the technician was very professional.",
                location: "Downtown",
              },
              {
                name: "Mike Chen",
                rating: 5,
                text: "Quick response time and fair pricing. My office AC is running better than ever!",
                location: "Business District",
              },
              {
                name: "Lisa Rodriguez",
                rating: 5,
                text: "24/7 service saved the day during a heatwave. Highly recommend their emergency service!",
                location: "Suburbs",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-gray-500 text-sm">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't let AC problems disrupt your comfort. Book your service today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="group bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Book Service Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <button className="group bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full text-lg border-2 border-white/30 hover:border-white transition-all duration-300">
              <span className="mr-2">💬</span>
              Get Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">AC System</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner for all air conditioning needs. Professional service, guaranteed satisfaction,
                available 24/7.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  f
                </button>
                <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  t
                </button>
                <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  in
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    AC Repair
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Installation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Maintenance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Emergency Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (555) 123-4567</li>
                <li>✉️ info@acsystem.com</li>
                <li>📍 123 Service St, City</li>
                <li>🕒 24/7 Available</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AC System. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </Layout>
  )
}

export default LandingPage
