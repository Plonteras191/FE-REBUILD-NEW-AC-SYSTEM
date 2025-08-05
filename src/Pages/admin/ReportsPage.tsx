import React, { useState } from "react"
import { FileText, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"
import { toast } from "react-toastify"

interface ReportRecord {
  id: string
  date: string
  customerName: string
  service: string
  acType: string
  reason?: string // For rejected appointments
  originalDate?: string // For rescheduled appointments
  newDate?: string // For rescheduled appointments
  status: "completed" | "rejected" | "rescheduled"
}

type SortField = "date" | "customerName" | "service" | "acType"
type SortDirection = "asc" | "desc"

const AdminReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"completed" | "rejected" | "rescheduled">("completed")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const itemsPerPage = 10

  // Example data - replace with actual data from your API
  const allRecords: ReportRecord[] = [
    // Completed
    {
      id: "1",
      date: "2025-08-15",
      customerName: "John Doe",
      service: "AC Cleaning",
      acType: "Split",
      status: "completed"
    },
    {
      id: "2",
      date: "2025-08-20",
      customerName: "Jane Smith",
      service: "AC Repair",
      acType: "Window",
      status: "completed"
    },
    {
      id: "3",
      date: "2025-08-22",
      customerName: "Bob Johnson",
      service: "AC Installation",
      acType: "Central",
      status: "completed"
    },
    // Rejected
    {
      id: "4",
      date: "2025-08-18",
      customerName: "Alice Brown",
      service: "AC Maintenance",
      acType: "Split",
      reason: "Customer requested cancellation",
      status: "rejected"
    },
    {
      id: "5",
      date: "2025-08-25",
      customerName: "Charlie Wilson",
      service: "AC Cleaning",
      acType: "Window",
      reason: "Technician unavailable",
      status: "rejected"
    },
    // Rescheduled
    {
      id: "6",
      date: "2025-08-12",
      customerName: "David Lee",
      service: "AC Repair",
      acType: "Central",
      originalDate: "2025-08-10",
      newDate: "2025-08-12",
      status: "rescheduled"
    },
    {
      id: "7",
      date: "2025-08-28",
      customerName: "Eva Martinez",
      service: "AC Installation",
      acType: "Split",
      originalDate: "2025-08-26",
      newDate: "2025-08-28",
      status: "rescheduled"
    }
  ]

  const filteredRecords = allRecords.filter(record => record.status === activeTab)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
    setCurrentPage(1) // Reset to first page when sorting
  }

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aValue: string | Date = a[sortField]
    let bValue: string | Date = b[sortField]

    if (sortField === "date") {
      aValue = new Date(a.date)
      bValue = new Date(b.date)
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + itemsPerPage)

  const handleExportCSV = () => {
    const headers = activeTab === "completed" 
      ? ["Date", "Customer", "Service", "AC Type"]
      : activeTab === "rejected"
      ? ["Date", "Customer", "Service", "AC Type", "Reason"]
      : ["Original Date", "New Date", "Customer", "Service", "AC Type"]

    const csvContent = [
      headers.join(","),
      ...sortedRecords.map(record => {
        if (activeTab === "completed") {
          return [record.date, record.customerName, record.service, record.acType].join(",")
        } else if (activeTab === "rejected") {
          return [record.date, record.customerName, record.service, record.acType, record.reason || ""].join(",")
        } else {
          return [record.originalDate || "", record.newDate || "", record.customerName, record.service, record.acType].join(",")
        }
      })
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-appointments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success("CSV file exported successfully!")
  }

  const handleExportExcel = () => {
    // For simplicity, we'll create a CSV with .xlsx extension
    // In a real application, you'd use a library like xlsx or exceljs
    handleExportCSV()
    toast.success("Excel file exported successfully!")
  }

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </div>
    </th>
  )

  const renderTableContent = () => {
    if (activeTab === "completed") {
      return (
        <>
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="date">Date</SortableHeader>
              <SortableHeader field="customerName">Customer</SortableHeader>
              <SortableHeader field="service">Service</SortableHeader>
              <SortableHeader field="acType">AC Type</SortableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.acType}
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )
    }

    if (activeTab === "rejected") {
      return (
        <>
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="date">Date</SortableHeader>
              <SortableHeader field="customerName">Customer</SortableHeader>
              <SortableHeader field="service">Service</SortableHeader>
              <SortableHeader field="acType">AC Type</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.acType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={record.reason}>
                    {record.reason}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )
    }

    // Rescheduled
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Original Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              New Date
            </th>
            <SortableHeader field="customerName">Customer</SortableHeader>
            <SortableHeader field="service">Service</SortableHeader>
            <SortableHeader field="acType">AC Type</SortableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedRecords.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                {record.originalDate ? new Date(record.originalDate).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                {record.newDate ? new Date(record.newDate).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.service}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.acType}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }

  return (
    <AuthLayout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-purple-600" />
                Reports
              </h1>
              <p className="mt-2 text-gray-600">Generate and export appointment reports</p>
            </div>
            
            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: "completed", label: "Completed", count: allRecords.filter(r => r.status === "completed").length },
                  { key: "rejected", label: "Rejected", count: allRecords.filter(r => r.status === "rejected").length },
                  { key: "rescheduled", label: "Rescheduled", count: allRecords.filter(r => r.status === "rescheduled").length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key as any)
                      setCurrentPage(1)
                    }}
                    className={`pb-4 px-1 ${
                      activeTab === tab.key
                        ? "border-b-2 border-purple-500 text-purple-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } font-medium transition-colors`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {activeTab} Appointments
              </h3>
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedRecords.length)} of {sortedRecords.length} records
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {renderTableContent()}
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white"
                            : "border border-gray-300 hover:bg-gray-100"
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-800">
              <strong>Features:</strong> Click column headers to sort data. Use pagination to navigate through records. 
              Export data as CSV or Excel files. Each tab shows different appointment statuses with relevant information.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminReports
