import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  User,
  ChevronRight,
  DollarSign,
  FileText,
  CalendarDays,
} from "lucide-react"

interface SidebarProps {
  role: "customer" | "admin"
  onLogout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout }) => {
  const location = useLocation()
  const userStr = localStorage.getItem("user")
  const user = userStr ? JSON.parse(userStr) : null

  const customerLinks = [
    {
      title: "Dashboard",
      path: "/customer/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "My Appointments",
      path: "/customer/appointments",
      icon: <Calendar className="w-5 h-5" />,
    },
  ]

  const adminLinks = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Appointments",
      path: "/admin/appointments",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Calendar",
      path: "/admin/calendar",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    {
      title: "Revenue",
      path: "/admin/revenue",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  const links = role === "customer" ? customerLinks : adminLinks

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AC System
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name || "Guest"}</div>
            <div className="text-sm text-gray-500 capitalize">{role}</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150
                  ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span>{link.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
