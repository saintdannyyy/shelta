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
  Wrench,
  Briefcase,
  Star,
  DollarSign,
  Check,
  Clock,
  AlertCircle,
  Badge,
  TrendingUp,
} from "lucide-react";

export default function ProviderDashboard() {
  const navItems = [
    {
      label: "Available Jobs",
      path: "/dashboard/provider/jobs",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      label: "My Jobs",
      path: "/dashboard/provider/my-jobs",
      icon: <Check className="w-5 h-5" />,
    },
    {
      label: "Earnings",
      path: "/dashboard/provider/earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: "Profile & Skills",
      path: "/dashboard/provider/profile",
      icon: <Badge className="w-5 h-5" />,
    },
    {
      label: "Ratings",
      path: "/dashboard/provider/ratings",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout role="provider" navItems={navItems}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Service Marketplace
          </h1>
          <p className="text-gray-600">
            Grow your business, accept jobs, and manage your reputation
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  4.8
                </div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-xs text-gray-500 mt-2">32 reviews</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <p className="text-sm text-gray-600">Completed Jobs</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  GHS 2,400
                </div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-xs text-gray-500 mt-2">In progress</p>
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
                  <Briefcase className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Browse Jobs
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  5 new jobs available
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Green Services
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add eco-friendly services
                </p>
                <Button variant="outline" className="w-full">
                  Learn
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Performance
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  95% completion rate
                </p>
                <Button variant="outline" className="w-full">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Jobs currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Plumbing Repair - Cantonments
                  </p>
                  <p className="text-sm text-gray-600">
                    GHS 150 • Started 2 hours ago
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Electrical Installation - Osu
                  </p>
                  <p className="text-sm text-gray-600">
                    GHS 250 • Started 5 hours ago
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                      Awaiting Inspection
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Tile Repair - East Legon
                  </p>
                  <p className="text-sm text-gray-600">
                    GHS 120 • Started 8 hours ago
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Ready to Submit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Earnings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Earnings</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">
                    Plumbing - Leak Fix
                  </p>
                  <p className="text-sm text-gray-500">Completed on Dec 10</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+GHS 150</p>
                  <p className="text-xs text-gray-500">Paid</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Electrical Work</p>
                  <p className="text-sm text-gray-500">Completed on Dec 9</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+GHS 250</p>
                  <p className="text-xs text-gray-500">Paid</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Cleaning Service</p>
                  <p className="text-sm text-gray-500">Completed on Dec 8</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">+GHS 100</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
