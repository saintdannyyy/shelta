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
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Wrench,
  Zap,
  Droplet,
  Hammer,
  Brush,
  Leaf,
} from "lucide-react";

interface ServiceProvider {
  id: string;
  name: string;
  services: string[];
  specialization:
    | "plumbing"
    | "electrical"
    | "carpentry"
    | "painting"
    | "general"
    | "cleaning";
  rating: number;
  reviews: number;
  priceRange: { min: number; max: number };
  location: string;
  distance: number;
  responseTime: string;
  completedJobs: number;
  verified: boolean;
  greenServices: boolean;
  bio: string;
  availability: "available" | "busy" | "offline";
}

// Mock service providers
const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "John's Plumbing Solutions",
    services: ["Leak repair", "Tap replacement", "Pipe installation"],
    specialization: "plumbing",
    rating: 4.9,
    reviews: 48,
    priceRange: { min: 100, max: 500 },
    location: "Cantonments, Accra",
    distance: 2.3,
    responseTime: "30 mins",
    completedJobs: 156,
    verified: true,
    greenServices: true,
    bio: "Professional plumber with 8 years experience. Quick response, quality work.",
    availability: "available",
  },
  {
    id: "2",
    name: "Elite Electrical Services",
    services: ["Circuit repair", "Wiring", "Installation"],
    specialization: "electrical",
    rating: 4.7,
    reviews: 32,
    priceRange: { min: 150, max: 800 },
    location: "Osu, Accra",
    distance: 4.1,
    responseTime: "1 hour",
    completedJobs: 98,
    verified: true,
    greenServices: false,
    bio: "Licensed electrician. Safety first approach. Emergency available.",
    availability: "available",
  },
  {
    id: "3",
    name: "ProPaint Studio",
    services: ["Interior painting", "Exterior painting", "Wall finishing"],
    specialization: "painting",
    rating: 4.8,
    reviews: 41,
    priceRange: { min: 80, max: 400 },
    location: "East Legon, Accra",
    distance: 5.2,
    responseTime: "2 hours",
    completedJobs: 124,
    verified: true,
    greenServices: true,
    bio: "Eco-friendly paints. Detailed work. Residential specialist.",
    availability: "available",
  },
  {
    id: "4",
    name: "Carpenter's Workshop",
    services: ["Door repair", "Cabinet making", "Shelving installation"],
    specialization: "carpentry",
    rating: 4.6,
    reviews: 28,
    priceRange: { min: 200, max: 1200 },
    location: "Labone, Accra",
    distance: 3.8,
    responseTime: "1 hour",
    completedJobs: 72,
    verified: true,
    greenServices: true,
    bio: "Custom woodwork. Premium finishes. Quotes within 24 hours.",
    availability: "busy",
  },
  {
    id: "5",
    name: "Clean Pest Control",
    services: ["Termite treatment", "Pest inspection", "Prevention"],
    specialization: "general",
    rating: 4.5,
    reviews: 35,
    priceRange: { min: 150, max: 600 },
    location: "Accra",
    distance: 6.2,
    responseTime: "4 hours",
    completedJobs: 89,
    verified: true,
    greenServices: true,
    bio: "Safe, eco-friendly pest control. Licensed professionals.",
    availability: "available",
  },
  {
    id: "6",
    name: "QuickClean Services",
    services: ["Deep cleaning", "Regular cleaning", "Post-renovation"],
    specialization: "cleaning",
    rating: 4.4,
    reviews: 52,
    priceRange: { min: 50, max: 300 },
    location: "Accra Central",
    distance: 7.1,
    responseTime: "30 mins",
    completedJobs: 203,
    verified: false,
    greenServices: true,
    bio: "Reliable and thorough. Same-day availability often possible.",
    availability: "available",
  },
];

export default function TenantServices() {
  const navItems = [
    {
      label: "Search Properties",
      path: "/dashboard/tenant/search",
      icon: null,
    },
    { label: "My Bookmarks", path: "/dashboard/tenant/bookmarks", icon: null },
    { label: "Book Services", path: "/dashboard/tenant/services", icon: null },
    { label: "Messages", path: "/dashboard/tenant/messages", icon: null },
  ];

  const [providers, setProviders] = useState<ServiceProvider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState<string>("all");
  const [filterDistance, setFilterDistance] = useState<number>(15);
  const [sortBy, setSortBy] = useState<"rating" | "price" | "distance">(
    "rating",
  );

  // Filter and sort providers
  let filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesService =
      filterService === "all" || provider.specialization === filterService;

    const matchesDistance = provider.distance <= filterDistance;

    return matchesSearch && matchesService && matchesDistance;
  });

  // Sort
  if (sortBy === "rating") {
    filteredProviders.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price") {
    filteredProviders.sort((a, b) => a.priceRange.min - b.priceRange.min);
  } else if (sortBy === "distance") {
    filteredProviders.sort((a, b) => a.distance - b.distance);
  }

  const getSpecializationIcon = (spec: string) => {
    const icons: Record<string, React.ReactNode> = {
      plumbing: <Droplet className="w-5 h-5" />,
      electrical: <Zap className="w-5 h-5" />,
      carpentry: <Hammer className="w-5 h-5" />,
      painting: <Brush className="w-5 h-5" />,
      general: <Wrench className="w-5 h-5" />,
      cleaning: <Leaf className="w-5 h-5" />,
    };
    return icons[spec] || <Wrench className="w-5 h-5" />;
  };

  const getAvailabilityColor = (availability: string) => {
    const colors: Record<string, string> = {
      available: "bg-emerald-50 text-emerald-700",
      busy: "bg-yellow-50 text-yellow-700",
      offline: "bg-gray-50 text-gray-700",
    };
    return colors[availability] || "bg-gray-50 text-gray-700";
  };

  return (
    <DashboardLayout role="tenant" navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Book Services
          </h1>
          <p className="text-gray-600">
            Find and hire verified service providers for your home
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredProviders.length}
                </div>
                <p className="text-sm text-gray-600">Providers Available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {providers.filter((p) => p.verified).length}
                </div>
                <p className="text-sm text-gray-600">Verified</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {providers.filter((p) => p.greenServices).length}
                </div>
                <p className="text-sm text-gray-600">Green Services</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  4.7★
                </div>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
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
                    placeholder="Provider or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Service
                </label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Services</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="general">General</option>
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
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "rating" | "price" | "distance")
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price">Lowest Price</option>
                  <option value="distance">Nearest</option>
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

        {/* Provider Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <Card
                key={provider.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Provider Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                          {getSpecializationIcon(provider.specialization)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="text-lg font-bold text-slate-900">
                              {provider.name}
                            </h3>
                            {provider.verified && (
                              <Badge className="bg-emerald-50 text-emerald-700">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {provider.greenServices && (
                              <Badge className="bg-green-50 text-green-700">
                                ♻️ Green Services
                              </Badge>
                            )}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(provider.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="font-bold text-slate-900">
                              {provider.rating}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({provider.reviews} reviews)
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {provider.bio}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((service) => (
                              <Badge key={service} variant="secondary">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Pricing */}
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          Completed Jobs
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          {provider.completedJobs}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          Response Time
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <p className="text-sm font-medium">
                            {provider.responseTime}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Distance</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <p className="text-sm font-medium">
                            {provider.distance}km away
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          Price Range
                        </p>
                        <p className="text-xl font-bold text-emerald-600">
                          GHS {provider.priceRange.min} -{" "}
                          {provider.priceRange.max}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <Badge
                          className={getAvailabilityColor(
                            provider.availability,
                          )}
                        >
                          {provider.availability.charAt(0).toUpperCase() +
                            provider.availability.slice(1)}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10">
                          Book Service
                        </Button>
                        <Button variant="outline" className="w-full gap-2 h-10">
                          <MessageSquare className="w-4 h-4" />
                          Chat
                        </Button>
                        <Button variant="outline" className="w-full h-10">
                          View Reviews
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
                <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  No providers found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterService("all");
                    setFilterDistance(15);
                    setSortBy("rating");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
          <CardHeader>
            <CardTitle>Tips for Booking Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Check reviews and ratings before booking</li>
              <li>✓ Verify provider credentials and certifications</li>
              <li>✓ Chat with provider first to discuss requirements</li>
              <li>✓ Get written quotes before confirming booking</li>
              <li>✓ Use secure payment methods for transactions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
