import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Home,
  Droplet,
  MessageSquare,
  Zap,
  CheckCircle,
  BarChart3,
} from "lucide-react";

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  qolScore: number;
  image: string;
  verified: boolean;
  isSaved: boolean;
  landlordRating?: number;
  affordanceTag: "affordable" | "moderate" | "premium";
  hasWater: boolean;
  hasElectricity: boolean;
  tenureTag: "verified" | "negotiable" | "monthly";
}

export default function TenantPropertySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [qolMinScore, setQolMinScore] = useState(50);
  const [showFilters, setShowFilters] = useState(false);
  const [spendingMin] = useState(2000); // From user profile
  const [spendingMax] = useState(5000); // From user profile
  const [savedOnly, setSavedOnly] = useState(false);

  const maxAffordable = Math.round(spendingMax * 0.3); // 30% rule

  // Mock property data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      address: "Cantonments, Accra - 3BR Apartment",
      price: 1500,
      bedrooms: 3,
      bathrooms: 2,
      qolScore: 88,
      image: "bg-gradient-to-br from-blue-100 to-blue-200",
      verified: true,
      isSaved: false,
      landlordRating: 4.8,
      affordanceTag: "affordable",
      hasWater: true,
      hasElectricity: true,
      tenureTag: "verified",
    },
    {
      id: "2",
      address: "Osu, Accra - 2BR Flat",
      price: 2000,
      bedrooms: 2,
      bathrooms: 1,
      qolScore: 85,
      image: "bg-gradient-to-br from-green-100 to-green-200",
      verified: true,
      isSaved: false,
      landlordRating: 4.6,
      affordanceTag: "moderate",
      hasWater: true,
      hasElectricity: true,
      tenureTag: "negotiable",
    },
    {
      id: "3",
      address: "East Legon, Accra - 4BR House",
      price: 2500,
      bedrooms: 4,
      bathrooms: 3,
      qolScore: 92,
      image: "bg-gradient-to-br from-orange-100 to-orange-200",
      verified: true,
      isSaved: false,
      landlordRating: 4.9,
      affordanceTag: "moderate",
      hasWater: true,
      hasElectricity: true,
      tenureTag: "monthly",
    },
    {
      id: "4",
      address: "Achimota, Accra - 1BR Studio",
      price: 800,
      bedrooms: 1,
      bathrooms: 1,
      qolScore: 72,
      image: "bg-gradient-to-br from-purple-100 to-purple-200",
      verified: false,
      isSaved: false,
      landlordRating: 3.8,
      affordanceTag: "affordable",
      hasWater: true,
      hasElectricity: true,
      tenureTag: "verified",
    },
  ]);

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch = prop.address
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      prop.price >= priceRange[0] && prop.price <= priceRange[1];
    const matchesQol = prop.qolScore >= qolMinScore;
    const matchesAffordability = prop.price <= maxAffordable;
    const matchesSavedFilter = !savedOnly || prop.isSaved;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesQol &&
      matchesAffordability &&
      matchesSavedFilter
    );
  });

  const toggleSaved = (id: string) => {
    setProperties((props) =>
      props.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p)),
    );
  };

  const navItems = [
    {
      label: "Search Properties",
      path: "/dashboard/tenant/search",
      icon: <Search className="w-5 h-5" />,
    },
    {
      label: "My Bookmarks",
      path: "/dashboard/tenant/bookmarks",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      label: "Messages",
      path: "/dashboard/tenant/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: "Applications",
      path: "/dashboard/tenant/applications",
      icon: <Home className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout role="tenant" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Search Properties
          </h1>
          <p className="text-gray-600">
            Find affordable homes within your budget
          </p>
        </div>

        {/* Affordability Info */}
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Your Budget Range</p>
                <p className="text-2xl font-bold text-emerald-600">
                  GHS {spendingMin} - {spendingMax}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Max Affordable (30%)
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  GHS {maxAffordable}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Properties Found</p>
                <p className="text-2xl font-bold text-orange-600">
                  {filteredProperties.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg QoL Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    filteredProperties.reduce((sum, p) => sum + p.qolScore, 0) /
                      filteredProperties.length || 0,
                  )}
                  /100
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button
                variant={savedOnly ? "default" : "outline"}
                onClick={() => setSavedOnly(!savedOnly)}
                className={
                  savedOnly
                    ? "bg-emerald-600 hover:bg-emerald-700 gap-2"
                    : "gap-2"
                }
              >
                <Heart className="w-4 h-4" />
                Saved ({properties.filter((p) => p.isSaved).length})
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="pt-4 border-t space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Price Range: GHS {priceRange[0]} - GHS {priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          Number(e.target.value),
                          Math.max(Number(e.target.value), priceRange[1]),
                        ])
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          Math.min(priceRange[0], Number(e.target.value)),
                          Number(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Minimum QoL Score: {qolMinScore}/100
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={qolMinScore}
                    onChange={(e) => setQolMinScore(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Higher scores = better access to healthcare, education, and
                    services
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.map((property) => {
              const isAffordable = property.price <= maxAffordable;
              const affordanceBg =
                property.affordanceTag === "affordable"
                  ? "bg-green-50"
                  : property.affordanceTag === "moderate"
                    ? "bg-yellow-50"
                    : "bg-red-50";
              const affordanceColor =
                property.affordanceTag === "affordable"
                  ? "text-green-700"
                  : property.affordanceTag === "moderate"
                    ? "text-yellow-700"
                    : "text-red-700";

              return (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-48 ${property.image} relative`}>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleSaved(property.id)}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            property.isSaved
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    {property.verified && (
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-slate-900 bg-opacity-80 text-white font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      QoL: {property.qolScore}
                    </div>
                  </div>

                  <CardContent className="pt-4">
                    <h3 className="font-bold text-slate-900 mb-3 line-clamp-2">
                      {property.address}
                    </h3>

                    {/* Key Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        {property.bedrooms} Bed
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        {property.bathrooms} Bath
                      </div>
                      {property.landlordRating && (
                        <div className="flex items-center gap-1">
                          ⭐ {property.landlordRating}
                        </div>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {property.hasWater && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                          <Droplet className="w-3 h-3" />
                          Water
                        </span>
                      )}
                      {property.hasElectricity && (
                        <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Electricity
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded ${affordanceBg} ${affordanceColor}`}
                      >
                        {property.affordanceTag.charAt(0).toUpperCase() +
                          property.affordanceTag.slice(1)}
                      </span>
                    </div>

                    {/* Tenure Tag */}
                    <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      {property.tenureTag === "verified"
                        ? "✓ Verified Landlord"
                        : property.tenureTag === "negotiable"
                          ? "💰 Rent Advance Negotiable"
                          : "📅 Monthly Payment"}
                    </div>

                    {/* Price & Affordability */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          GHS {property.price}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            isAffordable
                              ? "text-green-600 bg-green-50 px-2 py-1 rounded"
                              : "text-red-600 bg-red-50 px-2 py-1 rounded"
                          }`}
                        >
                          {isAffordable ? "✓ Affordable" : "Over Budget"}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">per month</p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <MapPin className="w-4 h-4" />
                        Map
                      </Button>
                    </div>

                    <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more properties.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
