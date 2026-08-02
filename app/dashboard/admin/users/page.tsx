import { requireUser } from "@/actions/auth.actions";
import { getAllUsersAdmin } from "@/actions/admin.actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActiveStatusBadge } from "@/components/status-badge";
import { UserStatusToggle } from "@/components/user-status-toggle";
import { PaginationBar } from "@/components/pagination-bar";
import { Input } from "@/components/ui/input";
import { initials } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ page?: string; searchTerm?: string }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  await requireUser(["ADMIN"]);
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const limit = 10;

  const { data: users, meta } = await getAllUsersAdmin({
    page,
    limit,
    searchTerm: sp.searchTerm,
  });

  const totalPages = meta?.totalPages ?? Math.ceil((meta?.total ?? users.length) / limit) ?? 1;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">{meta?.total ?? users.length} total users</p>
        </div>
        <form action="/dashboard/admin/users" className="w-full max-w-xs">
          <Input name="searchTerm" defaultValue={sp.searchTerm} placeholder="Search by name or email..." />
        </form>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage src={u.avatarUrl ?? undefined} />
                      <AvatarFallback>{initials(u.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-muted-foreground text-xs">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {u.role.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActiveStatusBadge status={u.activeStatus} />
                </TableCell>
                <TableCell className="text-right">
                  {u.role !== "ADMIN" && <UserStatusToggle userId={u.id} status={u.activeStatus} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationBar page={page} totalPages={totalPages || 1} />
    </div>
  );
}
