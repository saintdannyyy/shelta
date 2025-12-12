import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication with Supabase
    navigate("/dashboard");
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
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-shelta-emerald hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90 h-10"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-shelta-emerald font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
