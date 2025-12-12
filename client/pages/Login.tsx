import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

type UserRole = "tenant" | "landlord" | "provider" | "agent";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Supabase
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to sign in");
      }

      // Fetch user role from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (userError) {
        throw userError;
      }

      if (!userData || !userData.role) {
        throw new Error("User role not found");
      }

      toast({
        title: "Success ✅",
        description: "Logged in successfully!",
      });

      // Navigate to role-specific dashboard
      navigate(`/dashboard/${userData.role as UserRole}`);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shelta-emerald-light to-shelta-ocean-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-12 h-12 rounded-full bg-shelta-emerald flex items-center justify-center text-white font-bold text-xl">
              🏠
            </div>
            <span className="text-2xl font-bold text-shelta-slate">SHELTA</span>
          </div>

          <h1 className="text-2xl font-bold text-shelta-slate mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Sign in to your SHELTA account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-shelta-slate mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  disabled={loading}
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-shelta-emerald hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90 h-10"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-shelta-emerald font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
