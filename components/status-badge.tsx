import { Badge } from "@/components/ui/badge";
import { RentalRequestStatus, PaymentStatus, PropertyStatus, ActiveStatus } from "@/types";

const rentalMap: Record<RentalRequestStatus, { label: string; variant: "warning" | "info" | "destructive" | "success" | "secondary" }> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "info" },
  REJECTED: { label: "Rejected", variant: "destructive" },
  ACTIVE: { label: "Active", variant: "success" },
  COMPLETED: { label: "Completed", variant: "secondary" },
  CANCELED: { label: "Canceled", variant: "secondary" },
};

const paymentMap: Record<PaymentStatus, { label: string; variant: "warning" | "success" | "destructive" | "secondary" }> = {
  PENDING: { label: "Pending", variant: "warning" },
  COMPLETED: { label: "Paid", variant: "success" },
  FAILED: { label: "Failed", variant: "destructive" },
  REFUNDED: { label: "Refunded", variant: "secondary" },
};

const propertyMap: Record<PropertyStatus, { label: string; variant: "success" | "warning" | "secondary" | "destructive" }> = {
  AVAILABLE: { label: "Available", variant: "success" },
  RESERVED: { label: "Reserved", variant: "warning" },
  UNAVAILABLE: { label: "Unavailable", variant: "secondary" },
  ARCHIVED: { label: "Archived", variant: "destructive" },
};

const activeStatusMap: Record<ActiveStatus, { label: string; variant: "success" | "destructive" }> = {
  ACTIVE: { label: "Active", variant: "success" },
  BLOCKED: { label: "Blocked", variant: "destructive" },
};

export function RentalStatusBadge({ status }: { status: RentalRequestStatus }) {
  const cfg = rentalMap[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const cfg = paymentMap[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const cfg = propertyMap[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export function ActiveStatusBadge({ status }: { status: ActiveStatus }) {
  const cfg = activeStatusMap[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
