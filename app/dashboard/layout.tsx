import { DashboardShell } from "@/components/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <DashboardShell />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
