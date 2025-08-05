import React, { useState, useEffect } from "react"
import { DollarSign, Save, Edit2 } from "lucide-react"
import AuthLayout from "../../Auth/AuthLayout"
import { toast } from "react-toastify"

interface RevenueRecord {
  id: string
  date: string
  customerName: string
  service: string
  gross: number
  discount: number
  net: number
}

const AdminRevenue: React.FC = () => {
  const [records, setRecords] = useState<RevenueRecord[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempDiscount, setTempDiscount] = useState<number>(0)

  // Example data - replace with actual data from your API
  useEffect(() => {
    const sampleRecords: RevenueRecord[] = [
      {
        id: "1",
        date: "2025-08-15",
        customerName: "John Doe",
        service: "AC Cleaning",
        gross: 2500.00,
        discount: 200.00,
        net: 2300.00
      },
      {
        id: "2",
        date: "2025-08-20",
        customerName: "Jane Smith",
        service: "AC Repair",
        gross: 4500.00,
        discount: 450.00,
        net: 4050.00
      },
      {
        id: "3",
        date: "2025-08-22",
        customerName: "Bob Johnson",
        service: "AC Installation",
        gross: 15000.00,
        discount: 1000.00,
        net: 14000.00
      },
      {
        id: "4",
        date: "2025-08-25",
        customerName: "Alice Brown",
        service: "AC Maintenance",
        gross: 2000.00,
        discount: 0.00,
        net: 2000.00
      }
    ]
    setRecords(sampleRecords)
  }, [])

  const handleEditDiscount = (record: RevenueRecord) => {
    setEditingId(record.id)
    setTempDiscount(record.discount)
  }

  const handleSaveDiscount = (recordId: string) => {
    setRecords(prevRecords => 
      prevRecords.map(record => {
        if (record.id === recordId) {
          const newNet = record.gross - tempDiscount
          return {
            ...record,
            discount: tempDiscount,
            net: newNet
          }
        }
        return record
      })
    )
    setEditingId(null)
    toast.success("Discount updated successfully!")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTempDiscount(0)
  }

  const handleSaveToHistory = () => {
    // TODO: Implement actual API call to save to history
    toast.success("Revenue data saved to history!")
  }

  const calculateTotals = () => {
    const totalGross = records.reduce((sum, record) => sum + record.gross, 0)
    const totalDiscount = records.reduce((sum, record) => sum + record.discount, 0)
    const totalNet = records.reduce((sum, record) => sum + record.net, 0)
    
    return { totalGross, totalDiscount, totalNet }
  }

  const { totalGross, totalDiscount, totalNet } = calculateTotals()

  return (
    <AuthLayout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                Revenue Management
              </h1>
              <p className="mt-2 text-gray-600">Track completed bookings and manage discounts</p>
            </div>
            
            <button
              onClick={handleSaveToHistory}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save to History
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Gross</p>
                  <p className="text-3xl font-bold text-gray-900">₱{totalGross.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Discount</p>
                  <p className="text-3xl font-bold text-red-600">₱{totalDiscount.toFixed(2)}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Net</p>
                  <p className="text-3xl font-bold text-green-600">₱{totalNet.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Completed Bookings</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gross
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₱{record.gross.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingId === record.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={tempDiscount}
                              onChange={(e) => setTempDiscount(Number(e.target.value))}
                              className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                              max={record.gross}
                              step="0.01"
                            />
                            <button
                              onClick={() => handleSaveDiscount(record.id)}
                              className="text-green-600 hover:text-green-800 font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="text-red-600 font-medium">
                            ₱{record.discount.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        ₱{record.net.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingId !== record.id && (
                          <button
                            onClick={() => handleEditDiscount(record)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                
                {/* Totals Row */}
                <tfoot className="bg-gray-50">
                  <tr className="font-bold">
                    <td colSpan={3} className="px-6 py-4 text-right text-sm text-gray-900">
                      TOTALS:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{totalGross.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      ₱{totalDiscount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      ₱{totalNet.toFixed(2)}
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-800">
              <strong>Note:</strong> This page shows only completed bookings. Click "Edit" next to any discount amount to modify it. 
              The net amount will be automatically recalculated in real-time. Use "Save to History" to archive the current revenue data.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminRevenue
