import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  MapPin,
  Droplet,
  Zap,
  Share2,
  Heart,
  ChevronLeft,
  Home,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
  ImageOff,
} from "lucide-react";

interface Property {
  id: string;
  address: string;
  rent: number;
  beds: number;
  baths: number;
  area: number;
  landlord: string;
  landlordRating: number;
  landlordReviews: number;
  amenities: string[];
  tenure: string[];
  qolScore: number;
  verified: boolean;
  negotiable: boolean;
  description: string;
  images: string[];
}

// Mock property data - replace with Supabase query
const mockProperty: Property = {
  id: "1",
  address: "3 Bedroom Apartment, Osu, Accra",
  rent: 1200,
  beds: 3,
  baths: 2,
  area: 1200,
  landlord: "Kwesi Mensah",
  landlordRating: 4.8,
  landlordReviews: 32,
  amenities: ["Running Water", "Electricity", "Parking", "Garden"],
  tenure: ["Verified Landlord", "Rent Advance Negotiable"],
  qolScore: 78,
  verified: true,
  negotiable: true,
  description:
    "Beautiful 3-bedroom apartment in the heart of Osu. Modern finishes, secure compound with 24/7 security. Close to schools, hospitals, and shopping centers.",
  images: ["osu_apt_1", "osu_apt_2", "osu_apt_3"],
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property>(mockProperty);
  const [saved, setSaved] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [rentAdvanceAmount, setRentAdvanceAmount] = useState("");

  const maxAffordable = 1200; // Example tenant budget
  const isAffordable = property.rent <= maxAffordable;
  const affordabilityPercent = Math.round(
    (property.rent / maxAffordable) * 100,
  );

  const handleBookmark = () => {
    setSaved(!saved);
  };

  const handleRentAdvanceApplication = () => {
    // TODO: Implement rent advance loan application
    console.log("Rent advance application:", rentAdvanceAmount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-900 hover:text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBookmark}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Heart
                className={`w-5 h-5 ${
                  saved ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 aspect-video flex items-center justify-center">
                <ImageOff className="w-12 h-12 text-gray-400" />
                <p className="text-gray-500 ml-2">Gallery Placeholder</p>
              </div>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      {property.address}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Osu, Accra</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-emerald-600 mb-1">
                      GHS {property.rent}
                    </div>
                    <p className="text-gray-600 text-sm">/month</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Features */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.beds}</p>
                    <p className="text-xs text-gray-600">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.baths}</p>
                    <p className="text-xs text-gray-600">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-xs text-gray-600">Sq Ft</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.qolScore}</p>
                    <p className="text-xs text-gray-600">QoL Score</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity === "Running Water" && (
                          <>
                            <Droplet className="w-3 h-3 mr-1" />
                            {amenity}
                          </>
                        )}
                        {amenity === "Electricity" && (
                          <>
                            <Zap className="w-3 h-3 mr-1" />
                            {amenity}
                          </>
                        )}
                        {!["Running Water", "Electricity"].includes(amenity) &&
                          amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tenure Info */}
                <div>
                  <h3 className="font-semibold mb-3">Rental Terms</h3>
                  <div className="space-y-2">
                    {property.tenure.map((term) => (
                      <div
                        key={term}
                        className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">About This Property</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {property.landlord}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(property.landlordRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {property.landlordRating} ({property.landlordReviews}{" "}
                        reviews)
                      </span>
                    </div>
                    <Badge variant="outline">Verified Landlord</Badge>
                  </div>
                  <Button>Contact Landlord</Button>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Tour Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Virtual Tour</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex flex-col items-center justify-center">
                  <Home className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    3D virtual tour and video walkthrough coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Affordability Card */}
            <Card
              className={isAffordable ? "border-emerald-200" : "border-red-200"}
            >
              <CardHeader>
                <CardTitle className="text-lg">Affordability Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Your Budget Range
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    GHS 500 - GHS 1,500
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Rent Price</p>
                  <p className="text-2xl font-bold">GHS {property.rent}</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Affordability</span>
                    <span
                      className={`text-sm font-bold ${
                        isAffordable ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {affordabilityPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isAffordable ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(affordabilityPercent, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isAffordable
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {isAffordable ? (
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <p className="text-sm text-emerald-800">
                        Within your budget range
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800">
                        Exceeds your budget. Consider rent advance options.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rent Advance Application */}
            {!isAffordable && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg">Rent Advance Loan</CardTitle>
                  <CardDescription>
                    Make this property affordable
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Amount to Cover (GHS)
                    </p>
                    <div className="text-2xl font-bold text-orange-600">
                      {property.rent - maxAffordable}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Required to reach budget limit
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Advance Loan Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-600">
                        GHS
                      </span>
                      <input
                        type="number"
                        value={rentAdvanceAmount}
                        onChange={(e) => setRentAdvanceAmount(e.target.value)}
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleRentAdvanceApplication}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Apply for Rent Advance
                  </Button>

                  <p className="text-xs text-gray-600 text-center">
                    Typical approval: 2-3 business days
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
                Apply for This Property
              </Button>
              <Button variant="outline" className="w-full h-12">
                Chat with Landlord
              </Button>
              <Button variant="outline" className="w-full h-12">
                Schedule Viewing
              </Button>
            </div>

            {/* Property Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Property Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium">2 weeks ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">348</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
