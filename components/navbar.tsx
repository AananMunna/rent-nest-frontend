import Link from "next/link";
import { Home } from "lucide-react";
import { AuthNav } from "@/components/auth-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Home className="size-5 text-primary" />
          Rent<span className="text-primary">Nest</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
            Browse Properties
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
