import React from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

interface AuthLayoutProps {
  children: React.ReactNode
  role: "customer" | "admin"
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, role }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    navigate("/customer/login", { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onLogout={handleLogout} />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
