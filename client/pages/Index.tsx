import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Key,
  Wrench,
  Check,
  MapPin,
  Zap,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  Image,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-shelta-slate-light sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/sheltatrans.png"
              alt="Shelta Logo"
              className="w-50 h-50 object-contain"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-shelta-emerald hover:bg-shelta-emerald/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-shelta-slate mb-6 leading-tight">
                Your Housing Solution in Accra
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                SHELTA transforms housing through verified landlords, affordable
                rent, digitized payments, and reliable tradespeople—all in one
                secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup?role=tenant">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-shelta-emerald hover:bg-shelta-emerald/90 gap-2"
                  >
                    Find Housing <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/signup?role=landlord">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-shelta-emerald text-shelta-emerald hover:bg-shelta-emerald-light"
                  >
                    List Property
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 bg-gradient-to-br from-shelta-emerald-light to-shelta-ocean-light rounded-lg flex items-center justify-center">
                <img
                  className="object-cover rounded-lg"
                  src="/2bdr.jpg"
                  alt="2-bedroom apartment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Roles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-shelta-slate mb-4">
              Built for Everyone
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for a home, managing properties, or
              providing services, SHELTA has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tenant Card */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-shelta-emerald-light flex items-center justify-center mb-6">
                <Key className="w-6 h-6 text-shelta-emerald" />
              </div>
              <h3 className="text-xl font-bold text-shelta-slate mb-4">
                For Tenants
              </h3>
              <p className="text-gray-600 mb-6">
                Find affordable housing with verified landlords, check quality
                of life scores, and apply for rent advance loans.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Affordability filters based on income
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Quality of Life scores
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Maintenance request tracking
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Digital rent receipts
                </li>
              </ul>
              <Link to="/signup?role=tenant">
                <Button className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90">
                  Start Searching
                </Button>
              </Link>
            </div>

            {/* Landlord Card */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow md:border-shelta-emerald md:border-2">
              <div className="w-12 h-12 rounded-lg bg-shelta-ocean-light flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-shelta-ocean" />
              </div>
              <h3 className="text-xl font-bold text-shelta-slate mb-4">
                For Landlords & Agents
              </h3>
              <p className="text-gray-600 mb-6">
                Manage properties, automate rent collection, track maintenance,
                and maintain a digital ledger—RCD compliant.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Automated rent collection
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Digital ledger & RCD export
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Maintenance job routing
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Tenant application management
                </li>
              </ul>
              <Link to="/signup?role=landlord">
                <Button className="w-full bg-shelta-emerald hover:bg-shelta-emerald/90">
                  List Your Property
                </Button>
              </Link>
            </div>

            {/* Service Provider Card */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-shelta-gold/20 flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6 text-shelta-gold" />
              </div>
              <h3 className="text-xl font-bold text-shelta-slate mb-4">
                For Service Providers
              </h3>
              <p className="text-gray-600 mb-6">
                Get verified, receive maintenance jobs, build your portfolio,
                and grow your business with secure payments.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Real-time job dispatch
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Automatic invoicing
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Secure payment transfers
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-shelta-emerald flex-shrink-0 mt-0.5" />
                  Green Service badges
                </li>
              </ul>
              <Link to="/signup?role=provider">
                <Button className="w-full border-shelta-gold text-shelta-gold hover:bg-shelta-gold/10 border-2 bg-white">
                  Join as Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-shelta-slate mb-4">
              Platform Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for modern housing management, right on your
              phone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-shelta-emerald-light">
                  <MapPin className="h-6 w-6 text-shelta-emerald" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  QoL Scoring
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Rate neighborhoods by proximity to schools, health facilities,
                  public transit, and markets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-shelta-ocean-light">
                  <Zap className="h-6 w-6 text-shelta-ocean" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  Instant Notifications
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Get real-time alerts for rent payments, maintenance updates,
                  and new job listings.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
                  <Shield className="h-6 w-6 text-shelta-slate" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  Secure & Verified
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  All users verified, all transactions secure. Your data is
                  protected.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-shelta-emerald-light">
                  <TrendingUp className="h-6 w-6 text-shelta-emerald" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  Payment Automation
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  MoMo and bank integrations for seamless rent collection and
                  payouts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
                  <Users className="h-6 w-6 text-shelta-slate" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  Maintenance Routing
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Automatic job assignment to nearest verified service
                  providers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
                  <Home className="h-6 w-6 text-shelta-slate" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-shelta-slate">
                  Offline Capable
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Access critical features even without internet. PWA powered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-shelta-slate text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-shelta-gold mb-2">
                10k+
              </div>
              <p className="text-gray-200">Properties Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-shelta-gold mb-2">
                25k+
              </div>
              <p className="text-gray-200">Happy Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-shelta-gold mb-2">
                500+
              </div>
              <p className="text-gray-200">Verified Providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-shelta-emerald-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-shelta-slate mb-4">
            Ready to Transform Your Housing?
          </h2>
          <p className="text-gray-700 mb-8">
            Join thousands of Ghanaians finding secure, affordable housing on
            SHELTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-shelta-emerald hover:bg-shelta-emerald/90 gap-2"
              >
                Get Started Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-shelta-emerald text-shelta-emerald hover:bg-white"
              >
                Already Have an Account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-shelta-slate text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-shelta-emerald flex items-center justify-center text-white font-bold">
                  🏠
                </div>
                <span className="font-bold text-white">SHELTA</span>
              </div>
              <p className="text-sm">
                Secure Housing, Easy Living, Tenants' Assistant.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">For Tenants</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Find Housing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Rent Advance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Request Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">For Landlords</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    List Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Manage Rent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    View Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 SHELTA. Building secure housing in Accra, Ghana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
