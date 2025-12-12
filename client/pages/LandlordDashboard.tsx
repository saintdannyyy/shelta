import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Home,
  Users,
  DollarSign,
  Wrench,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function LandlordDashboard() {
  const navItems = [
    {
      label: "My Properties",
      path: "/dashboard/landlord/properties",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Tenants",
      path: "/dashboard/landlord/tenants",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Rent Ledger",
      path: "/dashboard/landlord/rent-ledger",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: "Maintenance",
      path: "/dashboard/landlord/maintenance",
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      label: "Reports",
      path: "/dashboard/landlord/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout role="landlord" navItems={navItems}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Property Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage properties, track payments, and monitor maintenance requests
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  5
                </div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-xs text-gray-500 mt-2">4 occupied</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  GHS 5,200
                </div>
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  GHS 600
                </div>
                <p className="text-sm text-gray-600">Overdue Rents</p>
                <p className="text-xs text-gray-500 mt-2">2 tenants</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  80%
                </div>
                <p className="text-sm text-gray-600">Collection Rate</p>
                <p className="text-xs text-gray-500 mt-2">YTD</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Collect Rent
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Send payment reminders
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Action
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  View Ledger
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Download RCD reports
                </p>
                <Button variant="outline" className="w-full">
                  Ledger
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Maintenance
                </h3>
                <p className="text-sm text-gray-600 mb-4">2 pending requests</p>
                <Button variant="outline" className="w-full">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Rent Payment Received
                  </p>
                  <p className="text-sm text-gray-600">
                    Kwesi Osei - Cantonments • GHS 1,200
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    New Tenant Application
                  </p>
                  <p className="text-sm text-gray-600">
                    East Legon 4BR House • Pending Review
                  </p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Maintenance Request
                  </p>
                  <p className="text-sm text-gray-600">
                    Cantonments Apartment • Leaky tap
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>5 properties managed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Cantonments Apartment",
                  tenant: "Kwesi Osei",
                  rent: 1200,
                  status: "Paid",
                },
                {
                  name: "Osu 2BR Flat",
                  tenant: "Ama Asare",
                  rent: 900,
                  status: "Pending",
                },
                {
                  name: "East Legon 4BR House",
                  tenant: "Vacant",
                  rent: 2500,
                  status: "Available",
                },
              ].map((property, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {property.name}
                    </p>
                    <p className="text-sm text-gray-600">{property.tenant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      GHS {property.rent}
                    </p>
                    <p className="text-xs text-gray-500">{property.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
