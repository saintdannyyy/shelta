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
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Filter,
  Search,
  Star,
  Zap,
} from "lucide-react";

interface JobPosting {
  id: string;
  category:
    | "plumbing"
    | "electrical"
    | "carpentry"
    | "cleaning"
    | "painting"
    | "general";
  title: string;
  property: string;
  location: string;
  description: string;
  budget: number;
  priority: "low" | "normal" | "high" | "emergency";
  deadline?: string;
  requestedBy: string;
  landlordRating: number;
  postedDays: number;
  applications: number;
  status: "open" | "assigned" | "in_progress" | "completed";
}

// Mock job postings
const mockJobs: JobPosting[] = [
  {
    id: "1",
    category: "plumbing",
    title: "Fix Leaky Tap in Bathroom",
    property: "Cantonments Apartment",
    location: "Cantonments, Accra - 2.3km away",
    description:
      "Master bathroom tap is leaking. Needs quick repair. Water is wasting daily.",
    budget: 150,
    priority: "high",
    deadline: "2024-12-12",
    requestedBy: "Kwesi Osei",
    landlordRating: 4.8,
    postedDays: 1,
    applications: 3,
    status: "open",
  },
  {
    id: "2",
    category: "electrical",
    title: "Power Circuit Failure - EMERGENCY",
    property: "Osu 2BR Flat",
    location: "Osu, Accra - 4.1km away",
    description:
      "Living room circuit has tripped and won't reset. All outlets dead. Safety hazard.",
    budget: 250,
    priority: "emergency",
    requestedBy: "Ama Asare",
    landlordRating: 4.6,
    postedDays: 2,
    applications: 5,
    status: "open",
  },
  {
    id: "3",
    category: "painting",
    title: "Kitchen Wall Paint Touch-up",
    property: "Cantonments Apartment",
    location: "Cantonments, Accra - 2.3km away",
    description:
      "Kitchen walls need touch-up painting. 50 sq meters. Preference for eco-friendly paint.",
    budget: 200,
    priority: "normal",
    deadline: "2024-12-20",
    requestedBy: "Kwesi Osei",
    landlordRating: 4.8,
    postedDays: 3,
    applications: 2,
    status: "open",
  },
  {
    id: "4",
    category: "cleaning",
    title: "Deep Clean After Renovation",
    property: "East Legon House",
    location: "East Legon, Accra - 5.2km away",
    description:
      "Property just renovated. Needs thorough deep cleaning. 4 bedrooms, 3 bathrooms.",
    budget: 300,
    priority: "high",
    deadline: "2024-12-14",
    requestedBy: "Yaw Mensah",
    landlordRating: 4.9,
    postedDays: 1,
    applications: 4,
    status: "open",
  },
  {
    id: "5",
    category: "carpentry",
    title: "Door Frame Replacement",
    property: "Osu 2BR Flat",
    location: "Osu, Accra - 4.1km away",
    description:
      "Main entrance door frame is damaged. Needs replacement with quality wood.",
    budget: 400,
    priority: "normal",
    deadline: "2024-12-18",
    requestedBy: "Ama Asare",
    landlordRating: 4.6,
    postedDays: 5,
    applications: 1,
    status: "open",
  },
];

export default function JobBoard() {
  const navItems = [
    { label: "Available Jobs", path: "/dashboard/provider/jobs", icon: null },
    { label: "My Jobs", path: "/dashboard/provider/my-jobs", icon: null },
    { label: "Earnings", path: "/dashboard/provider/earnings", icon: null },
    {
      label: "Profile & Skills",
      path: "/dashboard/provider/profile",
      icon: null,
    },
    { label: "Ratings", path: "/dashboard/provider/ratings", icon: null },
  ];

  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDistance, setFilterDistance] = useState<number>(10);
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.property.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || job.category === filterCategory;

    const distance = parseFloat(job.location.split(" - ")[1]);
    const matchesDistance = distance <= filterDistance;

    const matchesPriority =
      filterPriority === "all" || job.priority === filterPriority;

    return (
      matchesSearch && matchesCategory && matchesDistance && matchesPriority
    );
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      plumbing: "🔧",
      electrical: "⚡",
      carpentry: "🪵",
      cleaning: "🧹",
      painting: "🎨",
      general: "🔨",
    };
    return icons[category] || "🔨";
  };

  const handleApplyJob = (jobId: string) => {
    console.log("Applied for job:", jobId);
    // TODO: Implement job application logic
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

  return (
    <DashboardLayout role="provider" navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Available Jobs
          </h1>
          <p className="text-gray-600">
            Browse and apply for maintenance jobs in your area
          </p>
        </div>

        {/* Filter & Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="painting">Painting</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Distance: {filterDistance}km
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="emergency">Emergency</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredJobs.length}
                </div>
                <p className="text-sm text-gray-600">Jobs Matched</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {
                    filteredJobs.filter((j) => j.priority === "emergency")
                      .length
                  }
                </div>
                <p className="text-sm text-gray-600">Urgent</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  GHS{" "}
                  {filteredJobs
                    .reduce((sum, j) => sum + j.budget, 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Budget</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  Avg GHS{" "}
                  {filteredJobs.length > 0
                    ? Math.round(
                        filteredJobs.reduce((sum, j) => sum + j.budget, 0) /
                          filteredJobs.length,
                      )
                    : 0}
                </div>
                <p className="text-sm text-gray-600">Average Budget</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Job Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-3xl">
                          {getCategoryIcon(job.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="text-lg font-bold text-slate-900">
                              {job.title}
                            </h3>
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority.charAt(0).toUpperCase() +
                                job.priority.slice(1)}
                            </Badge>
                            {job.priority === "emergency" && (
                              <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{job.property}</p>
                          <p className="text-sm text-gray-600 mb-3">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Posted {job.postedDays}d ago
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.applications} applied
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requestor & Budget */}
                    <div className="space-y-4">
                      {/* Requestor Info */}
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          Requested By
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-700">
                              {job.requestedBy.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {job.requestedBy}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(job.landlordRating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-600 ml-1">
                                {job.landlordRating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Budget</p>
                        <p className="text-3xl font-bold text-emerald-600">
                          GHS {job.budget}
                        </p>
                        {job.deadline && (
                          <p className="text-xs text-gray-600 mt-2">
                            Due: {new Date(job.deadline).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleApplyJob(job.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Apply for Job
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Chat First
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  No jobs found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                    setFilterDistance(10);
                    setFilterPriority("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Green Services Bonus */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Green Service Bonus
            </CardTitle>
            <CardDescription>
              Get 10% extra payment for using eco-friendly practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                ✓ Use eco-friendly materials and products
              </p>
              <p className="text-sm text-gray-700">
                ✓ Minimize waste and energy consumption
              </p>
              <p className="text-sm text-gray-700">
                ✓ Document green practices with photos/videos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
