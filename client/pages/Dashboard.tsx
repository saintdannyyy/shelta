import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "tenant";

  const roleInfo = {
    tenant: {
      title: "Tenant Dashboard",
      description:
        "Find affordable housing, track maintenance requests, and manage rent payments.",
      emoji: "🔑",
    },
    landlord: {
      title: "Landlord Dashboard",
      description:
        "Manage properties, automate rent collection, and track maintenance.",
      emoji: "🏠",
    },
    provider: {
      title: "Service Provider Dashboard",
      description:
        "View maintenance jobs, track earnings, and build your portfolio.",
      emoji: "🔧",
    },
  };

  const currentRole = roleInfo[role as keyof typeof roleInfo] || roleInfo.tenant;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-shelta-slate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-shelta-emerald flex items-center justify-center text-white font-bold">
              🏠
            </div>
            <span className="text-xl font-bold text-shelta-slate">SHELTA</span>
          </div>
          <button className="text-gray-600 hover:text-shelta-slate">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="text-5xl mb-4">{currentRole.emoji}</div>
          <h1 className="text-4xl font-bold text-shelta-slate mb-4">
            {currentRole.title}
          </h1>
          <p className="text-gray-600 text-lg">{currentRole.description}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">
            This dashboard is being built. Check back soon for the full feature
            set!
          </p>
          <p className="text-sm text-gray-500">
            Role: <span className="font-medium text-shelta-slate capitalize">{role}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
