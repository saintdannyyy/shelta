import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Home,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  Download,
  MoreVertical,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Property {
  id: string;
  address: string;
  tenants: number;
  monthlyIncome: number;
  occupancy: number;
  status: "available" | "rented" | "maintenance";
}

interface RentRecord {
  id: string;
  tenant: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paymentDate?: string;
}

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "properties" | "ledger" | "tenants">("overview");

  // Mock data
  const properties: Property[] = [
    {
      id: "1",
      address: "Cantonments, Accra - 3BR Apartment",
      tenants: 1,
      monthlyIncome: 1200,
      occupancy: 100,
      status: "rented",
    },
    {
      id: "2",
      address: "Osu, Accra - 2BR Flat",
      tenants: 2,
      monthlyIncome: 900,
      occupancy: 100,
      status: "rented",
    },
    {
      id: "3",
      address: "East Legon, Accra - 4BR House",
      tenants: 0,
      monthlyIncome: 0,
      occupancy: 0,
      status: "available",
    },
  ];

  const rentLedger: RentRecord[] = [
    {
      id: "1",
      tenant: "Kwesi Osei",
      amount: 1200,
      dueDate: "2024-01-05",
      status: "paid",
      paymentDate: "2024-01-04",
    },
    {
      id: "2",
      tenant: "Ama Asare",
      amount: 900,
      dueDate: "2024-01-10",
      status: "paid",
      paymentDate: "2024-01-10",
    },
    {
      id: "3",
      tenant: "Kwesi Osei",
      amount: 1200,
      dueDate: "2024-02-05",
      status: "pending",
    },
    {
      id: "4",
      tenant: "Ama Asare",
      amount: 900,
      dueDate: "2024-02-10",
      status: "overdue",
    },
  ];

  const totalMonthlyIncome = properties.reduce(
    (sum, p) => sum + p.monthlyIncome,
    0
  );
  const occupiedProperties = properties.filter((p) => p.status === "rented").length;
  const paidRents = rentLedger.filter((r) => r.status === "paid").length;
  const overdueRents = rentLedger.filter((r) => r.status === "overdue").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-shelta-emerald flex items-center justify-center text-white font-bold">
              🏠
            </div>
            <span className="text-xl font-bold text-shelta-slate">SHELTA</span>
          </div>
          <button className="text-gray-600 hover:text-shelta-slate">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-shelta-slate">
              Property Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your rental properties and track payments</p>
          </div>
          <Button className="gap-2 bg-shelta-emerald hover:bg-shelta-emerald/90">
            <Plus className="w-4 h-4" />
            Add Property
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold text-shelta-slate mt-2">
                  {properties.length}
                </p>
              </div>
              <div className="p-3 bg-shelta-emerald-light rounded-lg">
                <Home className="w-6 h-6 text-shelta-emerald" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Occupied</p>
                <p className="text-3xl font-bold text-shelta-emerald mt-2">
                  {occupiedProperties}/{properties.length}
                </p>
              </div>
              <div className="p-3 bg-shelta-ocean-light rounded-lg">
                <Users className="w-6 h-6 text-shelta-ocean" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monthly Income</p>
                <p className="text-3xl font-bold text-shelta-gold mt-2">
                  ₦ {totalMonthlyIncome.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-shelta-gold" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Overdue Rents</p>
                <p
                  className={`text-3xl font-bold mt-2 ${
                    overdueRents > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {overdueRents}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  overdueRents > 0 ? "bg-red-50" : "bg-green-50"
                }`}
              >
                <AlertCircle
                  className={`w-6 h-6 ${
                    overdueRents > 0 ? "text-red-600" : "text-green-600"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 mb-8">
          <div className="flex gap-8 px-6">
            {(["overview", "properties", "ledger", "tenants"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-shelta-emerald text-shelta-emerald"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() +
                    tab.slice(1).replace(/([A-Z])/g, " $1")}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-shelta-slate mb-4">
                Collection Performance
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 font-medium">Paid</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {paidRents}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₦ {rentLedger
                      .filter((r) => r.status === "paid")
                      .reduce((sum, r) => sum + r.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-gray-700 font-medium">Pending</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {rentLedger.filter((r) => r.status === "pending").length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₦ {rentLedger
                      .filter((r) => r.status === "pending")
                      .reduce((sum, r) => sum + r.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700 font-medium">Overdue</span>
                  </div>
                  <p className="text-3xl font-bold text-red-600">
                    {overdueRents}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₦ {rentLedger
                      .filter((r) => r.status === "overdue")
                      .reduce((sum, r) => sum + r.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-shelta-slate mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-shelta-slate">
                      Ama Asare - Osu Apartment
                    </p>
                    <p className="text-sm text-gray-500">Rent payment received</p>
                  </div>
                  <span className="text-xs text-green-600 font-bold">
                    2 hrs ago
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-shelta-slate">
                      New tenant application
                    </p>
                    <p className="text-sm text-gray-500">
                      East Legon 4BR House
                    </p>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">
                    5 hrs ago
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-shelta-slate">
                      Maintenance request
                    </p>
                    <p className="text-sm text-gray-500">Cantonments - Leaky tap</p>
                  </div>
                  <span className="text-xs text-orange-600 font-bold">
                    1 day ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-shelta-slate">
                      {property.address}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>
                        {property.tenants > 0
                          ? `${property.tenants} tenant`
                          : "No tenants"}
                      </span>
                      <span>•</span>
                      <span
                        className={`font-medium ${
                          property.occupancy === 100
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {property.occupancy}% occupied
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Income</p>
                    <p className="text-2xl font-bold text-shelta-emerald">
                      ₦ {property.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                        property.status === "rented"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {property.status.charAt(0).toUpperCase() +
                        property.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    <Users className="w-4 h-4" />
                    Manage Tenants
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "ledger" && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export as RCD Format
              </Button>
              <Button
                variant="outline"
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Filter by Date
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-shelta-slate">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-shelta-slate">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-shelta-slate">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-shelta-slate">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-shelta-slate">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rentLedger.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-shelta-slate">
                        {record.tenant}
                      </td>
                      <td className="px-6 py-4 font-bold text-shelta-emerald">
                        ₦ {record.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(record.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            record.status === "paid"
                              ? "bg-green-50 text-green-700"
                              : record.status === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "tenants" && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-shelta-slate mb-6">
              Current Tenants
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Kwesi Osei",
                  property: "Cantonments, Accra - 3BR Apartment",
                  rent: 1200,
                  moveIn: "2023-06-15",
                  status: "active",
                },
                {
                  name: "Ama Asare",
                  property: "Osu, Accra - 2BR Flat",
                  rent: 900,
                  moveIn: "2023-08-20",
                  status: "active",
                },
              ].map((tenant) => (
                <div
                  key={tenant.name}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-shelta-slate">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-gray-600">{tenant.property}</p>
                    </div>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      Active
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-600 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="font-bold text-shelta-emerald">
                        ₦ {tenant.rent}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Move-in Date</p>
                      <p className="font-bold text-shelta-slate">
                        {new Date(tenant.moveIn).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Tenant Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
