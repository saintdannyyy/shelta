import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Application {
  id: string;
  property_id: string;
  status: "pending" | "approved" | "rejected" | "withdrawn";
  affordability_score: number;
  applied_at: string;
  move_in_date: string;
  lease_duration_months: number;
  properties?: {
    address: string;
    rent_amount_ghs: number;
  };
}

export default function ApplicationsSection({ userId }: { userId: string }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data, error } = await supabase
          .from("tenancy_applications")
          .select(
            `
            *,
            properties(address, rent_amount_ghs)
          `,
          )
          .eq("tenant_id", userId)
          .order("applied_at", { ascending: false });

        if (error) throw error;

        setApplications(data || []);
      } catch (error) {
        console.error("Error loading applications:", error);
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadApplications();

    // Real-time subscription
    const subscription = supabase
      .channel("applications_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tenancy_applications",
          filter: `tenant_id=eq.${userId}`,
        },
        (payload) => {
          loadApplications();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, toast]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {applications.length === 0 ? (
        <Card>
          <CardContent className="pt-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No applications yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Browse properties and apply to start your rental journey
            </p>
          </CardContent>
        </Card>
      ) : (
        applications.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Property Info */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {app.properties?.address || "Property"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rent: GHS {app.properties?.rent_amount_ghs}/month
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <Calendar className="w-4 h-4" />
                    Move-in: {new Date(app.move_in_date).toLocaleDateString()}
                  </div>
                </div>

                {/* Affordability & Lease */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    Affordability Score
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-600">
                      {app.affordability_score}
                    </span>
                    <span className="text-sm text-gray-600">/100</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Lease: {app.lease_duration_months} months
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusIcon(app.status)}
                    <Badge className={getStatusColor(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                  <Button variant="outline" className="text-sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
