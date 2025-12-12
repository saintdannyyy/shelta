import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Search,
  Filter,
  Heart,
  MapIcon,
  TrendingUp,
  DollarSign,
  Home as HomeIcon,
  MessageSquare,
  Clock,
} from "lucide-react";

interface Property {
  id: string;
  address: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  qolScore: number;
  image: string;
  verified: boolean;
  isSaved: boolean;
}

export default function TenantDashboard() {
  const [income, setIncome] = useState(3000);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [qolMinScore, setQolMinScore] = useState(50);

  // Mock property data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      address: "Cantonments, Accra - 3BR Apartment",
      rent: 1200,
      bedrooms: 3,
      bathrooms: 2,
      qolScore: 88,
      image: "bg-gradient-to-br from-blue-100 to-blue-200",
      verified: true,
      isSaved: false,
    },
    {
      id: "2",
      address: "Osu, Accra - 2BR Flat",
      rent: 900,
      bedrooms: 2,
      bathrooms: 1,
      qolScore: 92,
      image: "bg-gradient-to-br from-green-100 to-green-200",
      verified: true,
      isSaved: false,
    },
    {
      id: "3",
      address: "Asylum Down, Accra - 1BR Studio",
      rent: 450,
      bedrooms: 1,
      bathrooms: 1,
      qolScore: 75,
      image: "bg-gradient-to-br from-purple-100 to-purple-200",
      verified: false,
      isSaved: false,
    },
    {
      id: "4",
      address: "East Legon, Accra - 4BR House",
      rent: 1800,
      bedrooms: 4,
      bathrooms: 3,
      qolScore: 85,
      image: "bg-gradient-to-br from-orange-100 to-orange-200",
      verified: true,
      isSaved: false,
    },
  ]);

  // Calculate affordability
  const maxAffordable = Math.round(income * 0.3);
  const affordabilityScore =
    ((maxAffordable - priceRange[0]) / maxAffordable) * 100;

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch = prop.address
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      prop.rent >= priceRange[0] && prop.rent <= priceRange[1];
    const matchesQol = prop.qolScore >= qolMinScore;
    const matchesAffordability = prop.rent <= maxAffordable;

    return matchesSearch && matchesPrice && matchesQol && matchesAffordability;
  });

  const toggleSaved = (id: string) => {
    setProperties((props) =>
      props.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p)),
    );
  };

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
        {/* Affordability Meter */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income (GHS)
              </label>
              <Input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Max Affordable Rent
              </div>
              <div className="text-3xl font-bold text-shelta-emerald">
                ₦ {maxAffordable.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">(30% of income)</p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Affordability Score
              </div>
              <div className="flex items-end gap-2">
                <div
                  className={`text-3xl font-bold ${
                    affordabilityScore > 70
                      ? "text-green-600"
                      : affordabilityScore > 40
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {Math.round(affordabilityScore)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-shelta-emerald h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.max(0, Math.min(100, affordabilityScore))}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by location or property..."
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
                  ? "bg-shelta-emerald hover:bg-shelta-emerald/90 gap-2"
                  : "gap-2"
              }
            >
              <Heart className="w-4 h-4" />
              Saved
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: ₦ {priceRange[0]} - ₦ {priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max={maxAffordable * 1.5}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
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
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-shelta-slate mb-6">
            Available Properties ({filteredProperties.length})
          </h2>

          {filteredProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
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
                      <div className="absolute top-3 left-3 bg-shelta-emerald text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ Verified
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-shelta-gold text-shelta-slate font-bold px-3 py-1 rounded-full text-sm">
                      QoL: {property.qolScore}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-shelta-slate mb-2 line-clamp-2">
                      {property.address}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <HomeIcon className="w-4 h-4" />
                        {property.bedrooms} Bed
                      </div>
                      <div className="flex items-center gap-1">
                        <MapIcon className="w-4 h-4" />
                        {property.bathrooms} Bath
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-shelta-emerald">
                          ₦ {property.rent}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            property.rent <= maxAffordable
                              ? "text-green-600 bg-green-50 px-2 py-1 rounded"
                              : "text-red-600 bg-red-50 px-2 py-1 rounded"
                          }`}
                        >
                          {property.rent <= maxAffordable
                            ? "✓ Affordable"
                            : "Over Budget"}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">per month</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className="bg-shelta-emerald hover:bg-shelta-emerald/90 gap-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <MapIcon className="w-4 h-4" />
                        View Map
                      </Button>
                    </div>

                    <Button className="w-full mt-2 bg-shelta-emerald hover:bg-shelta-emerald/90">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria to find more
                properties.
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-shelta-slate mb-6">
            Your Activity
          </h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-shelta-emerald">5</div>
              <p className="text-sm text-gray-600">Saved Properties</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-shelta-ocean">2</div>
              <p className="text-sm text-gray-600">Active Applications</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-shelta-gold">1</div>
              <p className="text-sm text-gray-600">Maintenance Request</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-sm text-gray-600">Overdue Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
