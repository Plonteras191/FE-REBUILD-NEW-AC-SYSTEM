import React from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
  role: "customer" | "admin"
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const isCustomerAuthenticated = localStorage.getItem("isAuthenticated") === "true"
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true"
  
  const isAuthenticated = role === "admin" ? isAdminAuthenticated : isCustomerAuthenticated
  const loginPath = role === "admin" ? "/admin/login" : "/customer/login"

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
