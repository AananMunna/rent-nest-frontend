import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Home className="size-5 text-primary" />
            RentNest
          </Link>
          <p className="text-muted-foreground text-sm">
            Find & list rental properties with ease.
          </p>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} RentNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
