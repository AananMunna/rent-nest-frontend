import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-xl items-center px-4 py-16">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-5 py-12 text-center">
          <div className="bg-accent text-accent-foreground flex size-16 items-center justify-center rounded-full">
            <Search className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Page not found</h1>
            <p className="text-muted-foreground mt-2">
              The page you&apos;re looking for does not exist or may have been moved.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                Go home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/properties">Browse properties</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}