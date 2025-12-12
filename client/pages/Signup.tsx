import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Key, Home, Wrench } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type UserRole = "tenant" | "landlord" | "provider" | "agent";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    monthlyIncome: "",
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Pre-fill role from query params
  const prefilledRole = (searchParams.get("role") as UserRole) || null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalRole = prefilledRole || selectedRole;

      // Validate role is selected
      if (!finalRole) {
        toast({
          title: "Error",
          description: "Please select a role",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Validate inputs
      if (
        !formData.email ||
        !formData.password ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.phone
      ) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        toast({
          title: "Error",
          description: "Password must be at least 8 characters",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // 1. Create auth user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create user");
      }

      // 2. Insert user data into users table
      const incomeMin =
        finalRole === "tenant" ? parseInt(formData.monthlyIncome) || 0 : null;

      const { error: dbError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email: formData.email,
          phone: formData.phone,
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: finalRole, // ✅ Explicitly set role here
          income_range_min: incomeMin,
          income_range_max: incomeMin,
          is_verified: false,
          is_active: true,
          password_hash: "handled_by_auth",
        },
      ]);

      if (dbError) {
        console.error("DB Error:", dbError);
        throw dbError;
      }

      toast({
        title: "Success ✅",
        description: "Account created! Check your email to verify.",
      });

      // Navigate to appropriate dashboard
      navigate(`/${finalRole}-dashboard`);
    } catch (error) {
      console.error("Signup error:", error);

      // Delete auth user if DB insert fails
      if (error instanceof Error && error.message.includes("violates")) {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          await supabase.auth.admin.deleteUser(data.user.id);
        }
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roleConfig = {
    tenant: {
      title: "Find Your Perfect Home",
      description: "Access affordable housing with verified landlords",
      icon: Key,
    },
    landlord: {
      title: "Manage Your Properties",
      description: "List properties and automate rent collection",
      icon: Home,
    },
    provider: {
      title: "Grow Your Business",
      description: "Get maintenance jobs and build your portfolio",
      icon: Wrench,
    },
  };

  // Step 1: Role Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Role
            </h1>
            <p className="text-gray-700">
              Tell us what you're looking for to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(roleConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleRoleSelect(key as UserRole)}
                  className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-all border-2 border-transparent hover:border-emerald-600"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center bg-emerald-100">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {config.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {config.description}
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Continue
                  </Button>
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Account Details
  const finalRole = prefilledRole || selectedRole;
  const config = roleConfig[(finalRole || "tenant") as keyof typeof roleConfig];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <button
            onClick={() => setStep(1)}
            className="text-emerald-600 text-sm font-medium mb-4 hover:underline text-left"
          >
            ← Back to roles
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100">
              <Icon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{config.title}</CardTitle>
              <CardDescription className="text-xs">
                {config.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-xs">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="h-9"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="h-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-9"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+233 50 123 4567"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="h-9"
              />
            </div>

            {finalRole === "tenant" && (
              <div>
                <Label htmlFor="monthlyIncome" className="text-xs">
                  Monthly Income (GHS)
                </Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  name="monthlyIncome"
                  placeholder="3000"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="h-9"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Helps us show you affordable properties
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="h-9"
              />
              <p className="text-xs text-gray-500 mt-1">Min 8 characters</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-xs">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="h-9"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-10"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
