import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Filter,
  Plus,
  MessageSquare,
  Eye,
} from "lucide-react";

interface MaintenanceTicket {
  id: string;
  property: string;
  tenant: string;
  category: "plumbing" | "electrical" | "general" | "structural" | "pest";
  priority: "low" | "normal" | "high" | "emergency";
  description: string;
  status: "open" | "assigned" | "in_progress" | "completed" | "closed";
  createdDate: string;
  assignedProvider?: string;
  estimatedCost?: number;
  completionDate?: string;
}

// Mock data - replace with Supabase query
const mockTickets: MaintenanceTicket[] = [
  {
    id: "1",
    property: "Cantonments Apartment",
    tenant: "Kwesi Osei",
    category: "plumbing",
    priority: "high",
    description: "Leaky tap in master bathroom causing water wastage",
    status: "in_progress",
    createdDate: "2024-12-08",
    assignedProvider: "John's Plumbing",
    estimatedCost: 150,
  },
  {
    id: "2",
    property: "Osu 2BR Flat",
    tenant: "Ama Asare",
    category: "electrical",
    priority: "emergency",
    description: "Power outage in living room circuit - safety hazard",
    status: "assigned",
    createdDate: "2024-12-09",
    assignedProvider: "Elite Electrical Services",
    estimatedCost: 250,
  },
  {
    id: "3",
    property: "East Legon House",
    tenant: "Yaw Mensah",
    category: "general",
    priority: "normal",
    description: "Door lock needs replacement on main entrance",
    status: "open",
    createdDate: "2024-12-07",
  },
  {
    id: "4",
    property: "Cantonments Apartment",
    tenant: "Kwesi Osei",
    category: "general",
    priority: "low",
    description: "Paint touch-up needed on kitchen walls",
    status: "completed",
    createdDate: "2024-11-28",
    assignedProvider: "Pro Painting Solutions",
    estimatedCost: 80,
    completionDate: "2024-12-05",
  },
  {
    id: "5",
    property: "Osu 2BR Flat",
    tenant: "Ama Asare",
    category: "pest",
    priority: "normal",
    description: "Termite treatment required in kitchen area",
    status: "in_progress",
    createdDate: "2024-12-03",
    assignedProvider: "Clean Pest Control",
    estimatedCost: 200,
  },
];

export default function MaintenanceTickets() {
  const navItems = [
    {
      label: "My Properties",
      path: "/dashboard/landlord/properties",
      icon: null,
    },
    { label: "Tenants", path: "/dashboard/landlord/tenants", icon: null },
    {
      label: "Rent Ledger",
      path: "/dashboard/landlord/rent-ledger",
      icon: null,
    },
    {
      label: "Maintenance",
      path: "/dashboard/landlord/maintenance",
      icon: null,
    },
    { label: "Reports", path: "/dashboard/landlord/reports", icon: null },
  ];

  const [tickets, setTickets] = useState<MaintenanceTicket[]>(mockTickets);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  // Calculate stats
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    emergency: tickets.filter((t) => t.priority === "emergency").length,
    totalEstimatedCost: tickets
      .filter((t) => t.estimatedCost)
      .reduce((sum, t) => sum + (t.estimatedCost || 0), 0),
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plumbing":
        return "🔧";
      case "electrical":
        return "⚡";
      case "structural":
        return "🏗️";
      case "pest":
        return "🐛";
      default:
        return "🔨";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      plumbing: "bg-blue-50 text-blue-700",
      electrical: "bg-yellow-50 text-yellow-700",
      general: "bg-gray-50 text-gray-700",
      structural: "bg-orange-50 text-orange-700",
      pest: "bg-red-50 text-red-700",
    };
    return colors[category] || "bg-gray-50 text-gray-700";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-50 text-green-700",
      normal: "bg-blue-50 text-blue-700",
      high: "bg-orange-50 text-orange-700",
      emergency: "bg-red-50 text-red-700",
    };
    return colors[priority] || "bg-gray-50 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "assigned":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
        return <Wrench className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="landlord" navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Maintenance Tickets
            </h1>
            <p className="text-gray-600">
              Track and manage maintenance requests across all properties
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Plus className="w-4 h-4" />
            New Ticket
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stats.total}
                </div>
                <p className="text-sm text-gray-600">Total Tickets</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {stats.open}
                </div>
                <p className="text-sm text-gray-600">Open</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.inProgress}
                </div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 ${
                    stats.emergency > 0 ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {stats.emergency}
                </div>
                <p className="text-sm text-gray-600">Emergency</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  GHS {stats.totalEstimatedCost}
                </div>
                <p className="text-sm text-gray-600">Est. Cost</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="emergency">Emergency</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-2xl">
                          {getCategoryIcon(ticket.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-slate-900">
                              {ticket.property}
                            </h3>
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                ticket.priority,
                              )}`}
                            >
                              {ticket.priority.charAt(0).toUpperCase() +
                                ticket.priority.slice(1)}{" "}
                              Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {ticket.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {ticket.tenant}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(
                                ticket.createdDate,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Category</p>
                        <Badge className={getCategoryColor(ticket.category)}>
                          {ticket.category.charAt(0).toUpperCase() +
                            ticket.category.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          <div className="text-gray-600">
                            {getStatusIcon(ticket.status)}
                          </div>
                          <Badge
                            variant={
                              ticket.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {ticket.status
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </Badge>
                        </div>
                      </div>
                      {ticket.assignedProvider && (
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Provider</p>
                          <p className="text-sm font-medium text-slate-900">
                            {ticket.assignedProvider}
                          </p>
                        </div>
                      )}
                      {ticket.estimatedCost && (
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Est. Cost
                          </p>
                          <p className="text-sm font-bold text-emerald-600">
                            GHS {ticket.estimatedCost}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 text-left"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 text-left"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message Provider
                      </Button>
                      {ticket.status !== "completed" && (
                        <Button variant="outline" className="w-full text-left">
                          {ticket.status === "open"
                            ? "Assign Provider"
                            : "Update Status"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No maintenance tickets found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Maintenance Tasks</CardTitle>
            <CardDescription>Scheduled for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "Tomorrow",
                  task: "Electrical inspection - Osu 2BR",
                  provider: "Elite Electrical",
                },
                {
                  date: "Dec 12",
                  task: "Plumbing repair - Cantonments",
                  provider: "John's Plumbing",
                },
                {
                  date: "Dec 14",
                  task: "Pest control treatment - Osu 2BR",
                  provider: "Clean Pest Control",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.task}</p>
                    <p className="text-sm text-gray-600">{item.provider}</p>
                  </div>
                  <Badge variant="secondary">{item.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
