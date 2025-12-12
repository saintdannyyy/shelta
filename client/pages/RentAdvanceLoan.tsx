import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  User,
  Home,
  Briefcase,
  FileText,
  ChevronRight,
} from "lucide-react";

interface LoanApplication {
  id: string;
  amount: number;
  approvalStatus: "pending" | "approved" | "rejected" | "disbursed";
  applicationDate: string;
  approvalDate?: string;
  disbursalDate?: string;
  propertyAddress: string;
  monthlyRent: number;
  repaymentMonths: number;
  interestRate: number;
}

interface RepaymentSchedule {
  month: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

// Mock data
const mockApplications: LoanApplication[] = [
  {
    id: "LOAN-001",
    amount: 1500,
    approvalStatus: "disbursed",
    applicationDate: "2024-11-15",
    approvalDate: "2024-11-18",
    disbursalDate: "2024-11-20",
    propertyAddress: "123 Main Street, Osu",
    monthlyRent: 2000,
    repaymentMonths: 3,
    interestRate: 5,
  },
  {
    id: "LOAN-002",
    amount: 2000,
    approvalStatus: "pending",
    applicationDate: "2024-12-01",
    propertyAddress: "456 Palm Avenue, East Legon",
    monthlyRent: 2500,
    repaymentMonths: 4,
    interestRate: 5,
  },
];

const mockRepaymentSchedule: RepaymentSchedule[] = [
  {
    month: 1,
    dueDate: "2024-12-20",
    amount: 525,
    status: "paid",
  },
  {
    month: 2,
    dueDate: "2025-01-20",
    amount: 525,
    status: "pending",
  },
  {
    month: 3,
    dueDate: "2025-02-20",
    amount: 525,
    status: "pending",
  },
];

export default function RentAdvanceLoan() {
  const navItems = [
    {
      label: "Search Properties",
      path: "/dashboard/tenant/search",
      icon: null,
    },
    { label: "Book Services", path: "/dashboard/tenant/services", icon: null },
    {
      label: "Rent Advance",
      path: "/dashboard/tenant/rent-advance",
      icon: null,
    },
    { label: "My Bookmarks", path: "/dashboard/tenant/bookmarks", icon: null },
  ];

  const [activeTab, setActiveTab] = useState("calculator");
  const [loanAmount, setLoanAmount] = useState(1500);
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [repaymentMonths, setRepaymentMonths] = useState(3);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Loan calculator logic
  const interestRate = 5;
  const totalWithInterest = loanAmount + (loanAmount * interestRate) / 100;
  const monthlyPayment = totalWithInterest / repaymentMonths;
  const affordability = ((monthlyRent + monthlyPayment) / 4000) * 100; // Assuming 4000 is max budget

  const handleApplyLoan = () => {
    setShowApplicationForm(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700",
      approved: "bg-blue-50 text-blue-700",
      disbursed: "bg-emerald-50 text-emerald-700",
      rejected: "bg-red-50 text-red-700",
    };
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      approved: <CheckCircle className="w-3 h-3 mr-1" />,
      disbursed: <DollarSign className="w-3 h-3 mr-1" />,
      rejected: <AlertCircle className="w-3 h-3 mr-1" />,
    };
    return (
      <Badge className={styles[status]}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout role="tenant" navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Rent Advance Loan
          </h1>
          <p className="text-gray-600">
            Get immediate funds to cover rent gaps and secure your housing
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Total Disbursed</p>
                <p className="text-2xl font-bold text-slate-900">GHS 1,500</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Active Loans</p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockApplications.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Pending Approval</p>
                <p className="text-2xl font-bold text-slate-900">
                  {
                    mockApplications.filter(
                      (a) => a.approvalStatus === "pending",
                    ).length
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Next Payment</p>
                <p className="text-2xl font-bold text-slate-900">GHS 525</p>
                <p className="text-xs text-gray-500 mt-1">Jan 20, 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="repayment">Repayment Schedule</TabsTrigger>
          </TabsList>

          {/* Loan Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Loan</CardTitle>
                <CardDescription>
                  See how much you can borrow and what your monthly repayment
                  will be
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-3">
                        Loan Amount Needed
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={loanAmount}
                          onChange={(e) =>
                            setLoanAmount(Number(e.target.value))
                          }
                          className="w-full"
                        />
                        <div className="text-2xl font-bold text-emerald-600">
                          GHS {loanAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-3">
                        Monthly Rent
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={monthlyRent}
                          onChange={(e) =>
                            setMonthlyRent(Number(e.target.value))
                          }
                          className="w-full"
                        />
                        <div className="text-2xl font-bold text-slate-900">
                          GHS {monthlyRent.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-3">
                        Repayment Period (months)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[3, 4, 6, 12].map((months) => (
                          <button
                            key={months}
                            onClick={() => setRepaymentMonths(months)}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                              repaymentMonths === months
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-100 text-slate-900 hover:bg-gray-200"
                            }`}
                          >
                            {months}M
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Loan Amount
                        </p>
                        <p className="text-3xl font-bold text-emerald-600">
                          GHS {loanAmount.toLocaleString()}
                        </p>
                      </div>

                      <div className="h-px bg-gray-200"></div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Interest (5%)
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          GHS {(loanAmount * 0.05).toFixed(0)}
                        </p>
                      </div>

                      <div className="h-px bg-gray-200"></div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Total Repayable
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          GHS {totalWithInterest.toFixed(0)}
                        </p>
                      </div>

                      <div className="h-px bg-gray-200"></div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Monthly Payment ({repaymentMonths} months)
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          GHS {monthlyPayment.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    {/* Affordability Check */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-900 mb-3">
                        Affordability Check
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">
                            Total Monthly Payment
                          </span>
                          <span className="font-medium">
                            GHS {(monthlyRent + monthlyPayment).toFixed(0)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              affordability <= 75
                                ? "bg-emerald-500"
                                : affordability <= 90
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(affordability, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">
                          {affordability.toFixed(0)}% of recommended budget
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            affordability <= 75
                              ? "text-emerald-600"
                              : affordability <= 90
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {affordability <= 75
                            ? "✓ Affordable"
                            : affordability <= 90
                              ? "⚠ Stretching"
                              : "✗ Not Recommended"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
                  onClick={handleApplyLoan}
                >
                  Apply for Loan <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Loan Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Fast approval within 24 hours</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Flexible repayment terms (3-12 months)</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Competitive 5% interest rate</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Same-day disbursement available</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Valid ID & Proof of Residence</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Employment verification or bank statement</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Valid lease agreement</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Active mobile money or bank account</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            {mockApplications.length > 0 ? (
              mockApplications.map((app) => (
                <Card key={app.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Section */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Loan ID</p>
                          <p className="text-lg font-bold text-slate-900">
                            {app.id}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1">Property</p>
                          <p className="text-slate-900 flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-600" />
                            {app.propertyAddress}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              Monthly Rent
                            </p>
                            <p className="text-lg font-bold text-slate-900">
                              GHS {app.monthlyRent}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              Loan Amount
                            </p>
                            <p className="text-lg font-bold text-emerald-600">
                              GHS {app.amount}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Status</p>
                          {getStatusBadge(app.approvalStatus)}
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Applied</span>
                            <span className="font-medium">
                              {app.applicationDate}
                            </span>
                          </div>
                          {app.approvalDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Approved</span>
                              <span className="font-medium">
                                {app.approvalDate}
                              </span>
                            </div>
                          )}
                          {app.disbursalDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Disbursed</span>
                              <span className="font-medium text-emerald-600">
                                {app.disbursalDate}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No loan applications yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Repayment Schedule Tab */}
          <TabsContent value="repayment">
            <Card>
              <CardHeader>
                <CardTitle>Repayment Schedule</CardTitle>
                <CardDescription>
                  Payment schedule for Loan ID: LOAN-001
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRepaymentSchedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            schedule.status === "paid"
                              ? "bg-emerald-600"
                              : schedule.status === "overdue"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                          }`}
                        >
                          {schedule.month}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            Month {schedule.month} Payment
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {schedule.dueDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            GHS {schedule.amount}
                          </p>
                          <Badge
                            className={
                              schedule.status === "paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : schedule.status === "overdue"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-yellow-50 text-yellow-700"
                            }
                          >
                            {schedule.status.charAt(0).toUpperCase() +
                              schedule.status.slice(1)}
                          </Badge>
                        </div>

                        {schedule.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Pay Now
                          </Button>
                        )}
                        {schedule.status === "paid" && (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Paid</p>
                      <p className="text-xl font-bold text-emerald-600">
                        GHS 525
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Remaining</p>
                      <p className="text-xl font-bold text-yellow-600">
                        GHS 1,050
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Progress</p>
                      <p className="text-xl font-bold text-slate-900">33%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
