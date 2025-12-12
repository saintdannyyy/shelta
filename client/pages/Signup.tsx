import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Home, Key, Wrench, ArrowRight } from "lucide-react";

type UserRole = "tenant" | "landlord" | "provider" | "";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pre-fill role from query params
  const prefilledRole = (searchParams.get("role") as UserRole) || "";

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // TODO: Implement signup with Supabase
    navigate("/dashboard");
  };

  const roleConfig = {
    tenant: {
      title: "Find Your Perfect Home",
      description: "Access affordable housing with verified landlords",
      icon: Key,
      color: "shelta-emerald",
    },
    landlord: {
      title: "Manage Your Properties",
      description: "List properties and automate rent collection",
      icon: Home,
      color: "shelta-ocean",
    },
    provider: {
      title: "Grow Your Business",
      description: "Get maintenance jobs and build your portfolio",
      icon: Wrench,
      color: "shelta-gold",
    },
  };

  // Step 1: Role Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shelta-emerald-light to-shelta-ocean-light flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center gap-2 justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-shelta-emerald flex items-center justify-center text-white font-bold text-xl">
                🏠
              </div>
              <span className="text-2xl font-bold text-shelta-slate">
                SHELTA
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-shelta-slate mb-4">
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
                  className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-shelta-emerald"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center bg-${config.color}-light`}
                  >
                    <Icon
                      className={`w-8 h-8 text-${config.color}`}
                      style={{
                        color:
                          config.color === "shelta-emerald"
                            ? "rgb(0, 77, 122)"
                            : config.color === "shelta-ocean"
                              ? "rgb(59, 130, 246)"
                              : "rgb(245, 158, 11)",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-shelta-slate mb-2">
                    {config.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {config.description}
                  </p>
                  <Button className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90">
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
                className="text-shelta-emerald font-medium hover:underline"
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
  const selectedRole = prefilledRole || role;
  const config = roleConfig[selectedRole as keyof typeof roleConfig] || roleConfig.tenant;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-shelta-emerald-light to-shelta-ocean-light flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setStep(1)}
            className="text-shelta-emerald text-sm font-medium mb-6 hover:underline"
          >
            ← Back to roles
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  config.color === "shelta-emerald"
                    ? "rgb(230, 245, 255)"
                    : config.color === "shelta-ocean"
                      ? "rgb(191, 219, 254)"
                      : "rgb(254, 243, 199)",
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{
                  color:
                    config.color === "shelta-emerald"
                      ? "rgb(0, 77, 122)"
                      : config.color === "shelta-ocean"
                        ? "rgb(59, 130, 246)"
                        : "rgb(245, 158, 11)",
                }}
              />
            </div>
            <div>
              <h2 className="font-bold text-shelta-slate">{config.title}</h2>
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-shelta-slate mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-shelta-slate mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="+233 50 123 4567"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            {selectedRole === "tenant" && (
              <div>
                <label className="block text-sm font-medium text-shelta-slate mb-2">
                  Monthly Income (GHS)
                </label>
                <Input
                  type="number"
                  placeholder="3000"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps us show you affordable properties
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" className="w-4 h-4 mt-1" required />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-shelta-emerald hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-shelta-emerald hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90 h-10 gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-shelta-emerald font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
