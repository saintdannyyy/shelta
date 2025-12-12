import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, DollarSign, CheckCircle } from "lucide-react";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  income_range_min?: number;
  is_verified: boolean;
}

export default function ProfileSection({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Full Name
              </label>
              <p className="text-lg font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                Email Address
                {user.is_verified && (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                )}
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Phone</label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Monthly Income
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">
                  {user.income_range_min
                    ? `GHS ${user.income_range_min}`
                    : "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
