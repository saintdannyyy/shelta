import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  MapPin,
  Star,
  DollarSign,
  AlertCircle,
  TrendingUp,
  MapIcon,
  Phone,
  MessageSquare,
  Download,
  Upload,
} from "lucide-react";

interface Job {
  id: string;
  property: string;
  tenant: string;
  category: string;
  priority: "low" | "normal" | "high" | "emergency";
  status: "available" | "accepted" | "in_progress" | "completed";
  distance: number;
  estimatedPay: number;
  createdAt: string;
  dueDate?: string;
}

export default function ProviderDashboard() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      property: "Cantonments, Accra - 3BR Apartment",
      tenant: "Kwesi Osei",
      category: "Plumbing",
      priority: "high",
      status: "available",
      distance: 2.3,
      estimatedPay: 150,
      createdAt: "2024-01-15T10:00:00",
      dueDate: "2024-01-15",
    },
    {
      id: "2",
      property: "Osu, Accra - 2BR Flat",
      tenant: "Ama Asare",
      category: "Electrical",
      priority: "normal",
      status: "available",
      distance: 4.1,
      estimatedPay: 200,
      createdAt: "2024-01-15T09:30:00",
    },
    {
      id: "3",
      property: "East Legon, Accra - 4BR House",
      tenant: "John Mensah",
      category: "Carpentry",
      priority: "normal",
      status: "accepted",
      distance: 5.2,
      estimatedPay: 300,
      createdAt: "2024-01-14T15:00:00",
      dueDate: "2024-01-16",
    },
    {
      id: "4",
      property: "Asylum Down - Studio",
      tenant: "Grace Owusu",
      category: "General Maintenance",
      priority: "low",
      status: "in_progress",
      distance: 1.5,
      estimatedPay: 80,
      createdAt: "2024-01-14T12:00:00",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState<
    "available" | "accepted" | "history"
  >("available");

  // Calculate stats
  const completedJobs = 47;
  const activeJobs = jobs.filter(
    (j) => j.status === "accepted" || j.status === "in_progress"
  ).length;
  const totalEarnings = 5230;
  const averageRating = 4.8;
  const greenBadges = ["Solar Maintenance", "Water Harvesting"];

  // Filter jobs by status
  const availableJobs = jobs.filter((j) => j.status === "available");
  const acceptedJobs = jobs.filter(
    (j) => j.status === "accepted" || j.status === "in_progress"
  );

  const handleAcceptJob = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: "accepted" } : job
      )
    );
  };

  const handleStartWork = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: "in_progress" } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-shelta-gold flex items-center justify-center text-white font-bold">
              🔧
            </div>
            <span className="text-xl font-bold text-shelta-slate">SHELTA</span>
          </div>
          <button className="text-gray-600 hover:text-shelta-slate">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-shelta-slate">
                Kwame's Maintenance Services
              </h1>
              <p className="text-gray-600 mt-1">
                Plumber | Electrician | Carpenter
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Update Profile
            </Button>
          </div>

          <div className="grid sm:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rating</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-3xl font-bold text-shelta-gold">
                  {averageRating}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating)
                          ? "fill-shelta-gold text-shelta-gold"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Completed Jobs
              </p>
              <p className="text-3xl font-bold text-shelta-emerald mt-2">
                {completedJobs}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {activeJobs}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ₦ {totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Green Badges */}
          {greenBadges.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Green Service Badges
              </p>
              <div className="flex gap-2">
                {greenBadges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200"
                  >
                    ♻️ {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 mb-8">
          <div className="flex gap-8 px-6">
            {(["available", "accepted", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 font-medium text-sm transition-colors border-b-2 ${
                  selectedTab === tab
                    ? "border-shelta-gold text-shelta-gold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Jobs
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedTab === "available" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">
                  {availableJobs.length} new jobs in your area!
                </p>
                <p className="text-sm text-blue-700">
                  Accept jobs quickly to get the best paying ones
                </p>
              </div>
            </div>

            {availableJobs.length > 0 ? (
              availableJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Job Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-shelta-slate">
                              {job.category}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs font-bold rounded ${
                                job.priority === "emergency"
                                  ? "bg-red-50 text-red-700"
                                  : job.priority === "high"
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {job.priority.charAt(0).toUpperCase() +
                                job.priority.slice(1)}{" "}
                              Priority
                            </span>
                          </div>
                          <p className="text-gray-600">{job.property}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Requested by {job.tenant}
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.distance} km away</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            Posted{" "}
                            {Math.floor(
                              (Date.now() -
                                new Date(job.createdAt).getTime()) /
                                (1000 * 60)
                            )}{" "}
                            min ago
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Pay */}
                    <div className="flex flex-col justify-between">
                      <div className="bg-shelta-gold/10 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 font-medium">
                          Estimated Pay
                        </p>
                        <p className="text-3xl font-bold text-shelta-gold mt-2">
                          ₦ {job.estimatedPay}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAcceptJob(job.id)}
                          className="w-full bg-shelta-gold hover:bg-shelta-gold/90 text-shelta-slate"
                        >
                          Accept Job
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Chat First
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  No available jobs
                </h3>
                <p className="text-gray-600">
                  Check back later or expand your service area for more opportunities.
                </p>
              </div>
            )}
          </div>
        )}

        {selectedTab === "accepted" && (
          <div className="space-y-6">
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg p-6 border-2 border-shelta-gold"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-shelta-slate">
                              {job.category}
                            </h3>
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 text-xs font-bold rounded">
                              {job.status === "in_progress"
                                ? "In Progress"
                                : "Accepted"}
                            </span>
                          </div>
                          <p className="text-gray-600">{job.property}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Contact: {job.tenant}
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapIcon className="w-4 h-4" />
                          <span className="text-sm">
                            Navigate ({job.distance} km)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Call Tenant</span>
                        </div>
                        {job.dueDate && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Due {job.dueDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 font-medium">
                          Payment (pending)
                        </p>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          ₦ {job.estimatedPay}
                        </p>
                      </div>
                      {job.status === "accepted" ? (
                        <Button
                          onClick={() => handleStartWork(job.id)}
                          className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90"
                        >
                          Start Work
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Completion Photos
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  No active jobs
                </h3>
                <p className="text-gray-600 mb-4">
                  Go to available jobs to find and accept new work.
                </p>
                <Button
                  onClick={() => setSelectedTab("available")}
                  className="bg-shelta-gold hover:bg-shelta-gold/90 text-shelta-slate"
                >
                  Browse Available Jobs
                </Button>
              </div>
            )}
          </div>
        )}

        {selectedTab === "history" && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-shelta-slate mb-4">
              Completed Jobs
            </h2>
            <div className="space-y-3">
              {[
                {
                  category: "Plumbing",
                  property: "Osu Apartment",
                  date: "2024-01-14",
                  amount: 150,
                  rating: 5,
                },
                {
                  category: "Electrical",
                  property: "Cantonments House",
                  date: "2024-01-12",
                  amount: 200,
                  rating: 5,
                },
                {
                  category: "Carpentry",
                  property: "East Legon Flat",
                  date: "2024-01-10",
                  amount: 300,
                  rating: 4,
                },
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-shelta-slate">
                      {job.category}
                    </p>
                    <p className="text-sm text-gray-600">{job.property}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 justify-end mb-1">
                      {[...Array(job.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-shelta-gold text-shelta-gold"
                        />
                      ))}
                    </div>
                    <p className="font-bold text-green-600">
                      ₦ {job.amount}
                    </p>
                    <p className="text-xs text-gray-500">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
