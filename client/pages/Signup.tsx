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

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Tenant
  spendingMin?: string;
  spendingMax?: string;
  // Landlord
  propertyCount?: string;
  // Provider
  services?: string;
  yearsExperience?: string;
}

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
          description: "Please fill in all required fields",
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

      // Validate tenant spending range
      if (finalRole === "tenant") {
        if (!formData.spendingMin || !formData.spendingMax) {
          toast({
            title: "Error",
            description: "Please enter your spending range",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        const min = parseInt(formData.spendingMin);
        const max = parseInt(formData.spendingMax);
        if (min > max) {
          toast({
            title: "Error",
            description: "Minimum amount cannot be greater than maximum",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
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
        finalRole === "tenant" ? parseInt(formData.spendingMin || "0") : null;
      const incomeMax =
        finalRole === "tenant" ? parseInt(formData.spendingMax || "0") : null;

      const userPayload: any = {
        id: authData.user.id,
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: finalRole,
        income_range_min: incomeMin,
        income_range_max: incomeMax,
        is_verified: false,
        is_active: true,
        password_hash: "handled_by_auth",
      };

      // Role-specific metadata
      if (finalRole === "landlord" && formData.propertyCount) {
        userPayload.property_count = parseInt(formData.propertyCount);
      }

      if (finalRole === "provider" && formData.services) {
        userPayload.services = formData.services;
        userPayload.years_experience = parseInt(
          formData.yearsExperience || "0",
        );
      }

      const { error: dbError } = await supabase
        .from("users")
        .insert([userPayload]);

      if (dbError) {
        console.error("DB Error:", dbError);
        throw dbError;
      }

      toast({
        title: "Success ✅",
        description: "Account created! Check your email to verify.",
      });

      // Navigate to appropriate dashboard
      navigate(`/dashboard/${finalRole}`);
    } catch (error) {
      console.error("Signup error:", error);

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

  const roleConfig: Record<
    UserRole,
    { title: string; description: string; icon: any }
  > = {
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
    agent: {
      title: "List Properties",
      description: "Help tenants find homes and earn commissions",
      icon: Home,
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
              if (key === "agent") return null; // Hide agent for now
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
  const config = roleConfig[(finalRole || "tenant") as UserRole];
  const Icon = config.icon;

  const renderRoleSpecificFields = () => {
    switch (finalRole) {
      case "tenant":
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="spendingMin" className="text-xs">
                Minimum Monthly Budget (GHS)
              </Label>
              <Input
                id="spendingMin"
                type="number"
                name="spendingMin"
                placeholder="500"
                value={formData.spendingMin || ""}
                onChange={handleInputChange}
                className="h-9"
              />
            </div>
            <div>
              <Label htmlFor="spendingMax" className="text-xs">
                Maximum Monthly Budget (GHS)
              </Label>
              <Input
                id="spendingMax"
                type="number"
                name="spendingMax"
                placeholder="2000"
                value={formData.spendingMax || ""}
                onChange={handleInputChange}
                className="h-9"
              />
            </div>
            <p className="text-xs text-gray-500">
              We'll show you properties within your budget range
            </p>
          </div>
        );

      case "landlord":
        return (
          <div>
            <Label htmlFor="propertyCount" className="text-xs">
              Number of Properties
            </Label>
            <Input
              id="propertyCount"
              type="number"
              name="propertyCount"
              placeholder="1"
              value={formData.propertyCount || ""}
              onChange={handleInputChange}
              className="h-9"
            />
            <p className="text-xs text-gray-500 mt-1">
              How many properties do you manage?
            </p>
          </div>
        );

      case "provider":
        return (
          <>
            <div>
              <Label htmlFor="services" className="text-xs">
                Services Offered
              </Label>
              <Input
                id="services"
                type="text"
                name="services"
                placeholder="Plumbing, Electrical, Cleaning..."
                value={formData.services || ""}
                onChange={handleInputChange}
                className="h-9"
              />
              <p className="text-xs text-gray-500 mt-1">
                Comma-separated list of services
              </p>
            </div>
            <div>
              <Label htmlFor="yearsExperience" className="text-xs">
                Years of Experience
              </Label>
              <Input
                id="yearsExperience"
                type="number"
                name="yearsExperience"
                placeholder="5"
                value={formData.yearsExperience || ""}
                onChange={handleInputChange}
                className="h-9"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

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

            {/* Role-specific fields */}
            {renderRoleSpecificFields()}

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
