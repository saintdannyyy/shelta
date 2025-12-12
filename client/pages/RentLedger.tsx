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
import {
  Download,
  Filter,
  Search,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";

interface RentRecord {
  id: string;
  tenant: string;
  property: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  month: string;
  year: number;
}

// Mock data - replace with Supabase query
const mockRentLedger: RentRecord[] = [
  {
    id: "1",
    tenant: "Kwesi Osei",
    property: "Cantonments Apartment",
    amount: 1200,
    dueDate: "2024-12-05",
    paidDate: "2024-12-04",
    status: "paid",
    month: "December",
    year: 2024,
  },
  {
    id: "2",
    tenant: "Ama Asare",
    property: "Osu 2BR Flat",
    amount: 900,
    dueDate: "2024-12-05",
    status: "pending",
    month: "December",
    year: 2024,
  },
  {
    id: "3",
    tenant: "Yaw Mensah",
    property: "East Legon House",
    amount: 2500,
    dueDate: "2024-12-01",
    status: "overdue",
    month: "December",
    year: 2024,
  },
  {
    id: "4",
    tenant: "Kwesi Osei",
    property: "Cantonments Apartment",
    amount: 1200,
    dueDate: "2024-11-05",
    paidDate: "2024-11-03",
    status: "paid",
    month: "November",
    year: 2024,
  },
  {
    id: "5",
    tenant: "Ama Asare",
    property: "Osu 2BR Flat",
    amount: 900,
    dueDate: "2024-11-05",
    paidDate: "2024-11-06",
    status: "paid",
    month: "November",
    year: 2024,
  },
];

export default function RentLedger() {
  const navItems = [
    {
      label: "My Properties",
      path: "/dashboard/landlord/properties",
      icon: null,
    },
    { label: "Tenants", path: "/dashboard/landlord/tenants", icon: null },
    {
      label: "Rent Ledger",
      path: "/dashboard/landlord/rent-ledger",
      icon: null,
    },
    {
      label: "Maintenance",
      path: "/dashboard/landlord/maintenance",
      icon: null,
    },
    { label: "Reports", path: "/dashboard/landlord/reports", icon: null },
  ];

  const [records, setRecords] = useState<RentRecord[]>(mockRentLedger);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [filterMonth, setFilterMonth] = useState<string>("all");

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.property.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;

    const matchesMonth =
      filterMonth === "all" || `${record.month}-${record.year}` === filterMonth;

    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Calculate stats
  const stats = {
    totalDue: records.reduce((sum, r) => sum + r.amount, 0),
    totalPaid: records
      .filter((r) => r.status === "paid")
      .reduce((sum, r) => sum + r.amount, 0),
    totalPending: records
      .filter((r) => r.status === "pending")
      .reduce((sum, r) => sum + r.amount, 0),
    totalOverdue: records
      .filter((r) => r.status === "overdue")
      .reduce((sum, r) => sum + r.amount, 0),
    collectionRate: Math.round(
      (records.filter((r) => r.status === "paid").length / records.length) *
        100,
    ),
  };

  const handleExportRCD = () => {
    // Generate RCD format export
    const rcdContent = generateRCDExport(records);
    downloadRCDFile(rcdContent);
  };

  const generateRCDExport = (data: RentRecord[]): string => {
    let rcd = "RENTAL COLLECTION DATA (RCD) EXPORT\n";
    rcd += "=====================================\n\n";
    rcd += `Export Date: ${new Date().toLocaleDateString()}\n`;
    rcd += `Total Records: ${data.length}\n\n`;

    rcd += "SUMMARY\n";
    rcd += `Total Expected: GHS ${stats.totalDue.toLocaleString()}\n`;
    rcd += `Total Collected: GHS ${stats.totalPaid.toLocaleString()}\n`;
    rcd += `Pending: GHS ${stats.totalPending.toLocaleString()}\n`;
    rcd += `Overdue: GHS ${stats.totalOverdue.toLocaleString()}\n`;
    rcd += `Collection Rate: ${stats.collectionRate}%\n\n`;

    rcd += "DETAILED RECORDS\n";
    rcd += "=".repeat(100) + "\n";
    rcd += `${"Tenant".padEnd(20)} | ${"Property".padEnd(25)} | ${"Amount".padEnd(12)} | ${"Status".padEnd(10)} | ${"Due Date".padEnd(12)} | ${"Paid Date".padEnd(12)}\n`;
    rcd += "-".repeat(100) + "\n";

    data.forEach((record) => {
      rcd += `${record.tenant.padEnd(20)} | ${record.property.padEnd(25)} | GHS ${record.amount
        .toString()
        .padEnd(
          7,
        )} | ${record.status.padEnd(10)} | ${record.dueDate.padEnd(12)} | ${
        record.paidDate || "N/A"
      }\n`;
    });

    return rcd;
  };

  const downloadRCDFile = (content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `RCD_Export_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <DashboardLayout role="landlord" navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Rent Collection Ledger
          </h1>
          <p className="text-gray-600">
            Track rental payments and generate RCD reports
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  GHS {stats.totalDue.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Expected</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  GHS {stats.totalPaid.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Collected</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  GHS {stats.totalPending.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  GHS {stats.totalOverdue.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {stats.collectionRate}%
                </div>
                <p className="text-sm text-gray-600">Collection Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tenant or property..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as "all" | "paid" | "pending" | "overdue",
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Month</label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Months</option>
                  <option value="December-2024">December 2024</option>
                  <option value="November-2024">November 2024</option>
                  <option value="October-2024">October 2024</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleExportRCD}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export RCD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ledger Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>
              {filteredRecords.length} of {records.length} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-bold text-slate-900">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-slate-900">
                      Property
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-bold text-slate-900">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-slate-900">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-slate-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {record.tenant}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {record.property}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-600">
                          GHS {record.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {record.status === "paid" && (
                              <>
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                                  Paid
                                </span>
                              </>
                            )}
                            {record.status === "pending" && (
                              <>
                                <Clock className="w-4 h-4 text-yellow-600" />
                                <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                                  Pending
                                </span>
                              </>
                            )}
                            {record.status === "overdue" && (
                              <>
                                <AlertCircle className="w-4 h-4 text-red-600" />
                                <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded">
                                  Overdue
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <p className="text-gray-500">No records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>
              Payment collection trends by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "December 2024", collected: 3000, expected: 5400 },
                { month: "November 2024", collected: 5100, expected: 5400 },
                { month: "October 2024", collected: 5400, expected: 5400 },
              ].map((item) => (
                <div key={item.month} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.month}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {Math.round((item.collected / item.expected) * 100)}%
                        collected
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">
                        GHS {item.collected.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        of GHS {item.expected.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{
                        width: `${(item.collected / item.expected) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
