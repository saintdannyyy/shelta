/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export type UserRole = "tenant" | "landlord" | "agent" | "provider" | "admin";

export interface User {
  id: string;
  role: UserRole;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  incomeRange?: {
    min: number;
    max: number;
  };
  isVerified: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  ownerId: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  qolScore: number;
  isVerified: boolean;
  status: "available" | "rented" | "maintenance" | "unlisted";
  photos: string[];
  createdAt: string;
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  tenantId: string;
  providerId?: string;
  category: string;
  priority: "low" | "normal" | "high" | "emergency";
  description: string;
  status: "open" | "assigned" | "in_progress" | "completed" | "closed";
  estimatedCost?: number;
  actualCost?: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  landlordId: string;
  propertyId: string;
  amount: number;
  method: "momo_mtn" | "momo_vodafone" | "momo_airteltigo" | "bank_transfer";
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: string;
}

export interface RentLedgerEntry {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  rentAmount: number;
  dueDate: string;
  paidDate?: string;
  status: "pending" | "paid" | "overdue" | "waived";
  receiptUrl?: string;
  createdAt: string;
}

export interface LoanApplication {
  id: string;
  tenantId: string;
  propertyId: string;
  landlordId: string;
  loanProvider: "nras" | "renmo" | "partner_bank";
  loanAmount: number;
  loanTermMonths: number;
  status: "pending" | "approved" | "rejected" | "funded" | "cancelled";
  submittedAt: string;
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  userId: string;
  skills: string[];
  certifications: string[];
  averageRating: number;
  jobsCompleted: number;
  greenBadges: string[];
  isAvailable: boolean;
  createdAt: string;
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DemoResponse {
  message: string;
}
