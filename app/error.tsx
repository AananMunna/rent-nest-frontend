"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-xl items-center px-4 py-16">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-5 py-12 text-center">
          <div className="bg-destructive/10 text-destructive flex size-16 items-center justify-center rounded-full">
            <AlertTriangle className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground mt-2">
              We couldn&apos;t load this page right now. Please try again.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={reset}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="size-4" />
                Go home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}