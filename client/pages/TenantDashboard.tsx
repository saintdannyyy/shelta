import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, MapPin, Heart, MessageSquare, Search } from "lucide-react";

export default function TenantDashboard() {
  const navItems = [
    { label: "Search Properties", path: "/dashboard/tenant/search", icon: <Search className="w-5 h-5" /> },
    { label: "My Bookmarks", path: "/dashboard/tenant/bookmarks", icon: <Heart className="w-5 h-5" /> },
    { label: "Messages", path: "/dashboard/tenant/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Applications", path: "/dashboard/tenant/applications", icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout role="tenant" navItems={navItems}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome to SHELTA
          </h1>
          <p className="text-gray-600">
            Find your perfect, affordable home in Accra
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Search Properties
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find listings within your budget
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Browse
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  My Bookmarks
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  0 properties saved
                </p>
                <Button variant="outline" className="w-full">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Messages
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  0 unread messages
                </p>
                <Button variant="outline" className="w-full">
                  Check
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Applications
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  0 active applications
                </p>
                <Button variant="outline" className="w-full">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Listings Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Properties</CardTitle>
            <CardDescription>
              Affordable listings near you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-lg h-48 flex items-center justify-center text-gray-500"
                >
                  <p>Property #{i} - Coming Soon</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
