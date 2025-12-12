import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Wrench, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MaintenanceTicket {
  id: string;
  category: string;
  priority: "low" | "normal" | "high" | "emergency";
  description: string;
  status: "open" | "assigned" | "in_progress" | "completed" | "closed";
  cost_estimate_ghs?: number;
  created_at: string;
}

export default function MaintenanceSection({ userId }: { userId: string }) {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const { data, error } = await supabase
          .from("maintenance_tickets")
          .select("*")
          .eq("tenant_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setTickets(data || []);
      } catch (error) {
        console.error("Error loading tickets:", error);
        toast({
          title: "Error",
          description: "Failed to load maintenance tickets",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    let subscription: ReturnType<typeof supabase.channel> | null = null;

    const setupSubscription = async () => {
      await loadTickets();

      subscription = supabase
        .channel("maintenance_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "maintenance_tickets",
            filter: `tenant_id=eq.${userId}`,
          },
          () => {
            loadTickets();
          },
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [userId, toast]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "in_progress":
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case "assigned":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {tickets.length === 0 ? (
        <Card>
          <CardContent className="pt-8 text-center">
            <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No maintenance requests</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Button className="bg-emerald-600 hover:bg-emerald-700 mb-4">
            <Wrench className="w-4 h-4 mr-2" />
            Request Maintenance
          </Button>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <h3 className="font-bold text-gray-900 capitalize mb-1">
                        {ticket.category} Issue
                      </h3>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Priority</p>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Est. Cost</p>
                      <p className="font-bold">
                        {ticket.cost_estimate_ghs
                          ? `GHS ${ticket.cost_estimate_ghs}`
                          : "TBD"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        <span className="text-sm font-medium capitalize">
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
