export type Role = "TENANT" | "LANDLORD" | "ADMIN";
export type ActiveStatus = "ACTIVE" | "BLOCKED";
export type PropertyStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "UNAVAILABLE"
  | "ARCHIVED";
export type RentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  avatarUrl?: string | null;
  address?: string | null;
  bio?: string | null;
  activeStatus: ActiveStatus;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city?: string | null;
  area?: string | null;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  status: PropertyStatus;
  landlordId: string;
  landlord?: User;
  categoryId: string;
  category?: Category;
  _count?: { rentalRequests: number; reviews: number };
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface RentalRequest {
  id: string;
  propertyId: string;
  property: Property;
  tenantId: string;
  tenant: User;
  landlordId: string;
  landlord: User;
  moveInDate: string;
  moveOutDate?: string | null;
  message?: string | null;
  status: RentalRequestStatus;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  completedAt?: string | null;
  payment?: Payment | null;
  review?: Review | null;
  createdAt: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  rentalRequest?: RentalRequest;
  tenantId: string;
  propertyId: string;
  amount: number;
  method: string;
  provider: "STRIPE";
  status: PaymentStatus;
  currency: string;
  gatewayUrl?: string | null;
  paidAt?: string | null;
  createdAt: string;
}

export interface Review {
  id: string;
  tenantId: string;
  tenant?: User;
  propertyId: string;
  rentalRequestId: string;
  rating: number;
  comment: string;
  isPublished: boolean;
  createdAt: string;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: ApiMeta;
}

export interface ApiErrorShape {
  success: false;
  statusCode: number;
  message: string;
}
