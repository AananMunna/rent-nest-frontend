import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { confirmPaymentAction, getPaymentById } from "@/actions/payment.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ success?: string; canceled?: string; paymentId?: string }>;
}

export default async function PaymentResultPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const isSuccess = sp.success === "true";
  const isCanceled = sp.canceled === "true";

  let amount: number | null = null;
  let currency = "USD";

  if (sp.paymentId) {
    try {
      // Confirm on our side so the rental/payment status reflects reality,
      // then read back the record to show the amount.
      if (isSuccess) {
        await confirmPaymentAction(sp.paymentId, "COMPLETED");
      } else if (isCanceled) {
        await confirmPaymentAction(sp.paymentId, "FAILED");
      }
      const payment = await getPaymentById(sp.paymentId);
      amount = payment.amount;
      currency = payment.currency;
    } catch {
      // ignore — we still show a generic result below
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-16">
      <Card className="w-full text-center">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          {isSuccess ? (
            <>
              <CheckCircle2 className="size-14 text-emerald-500" />
              <div>
                <h1 className="text-xl font-bold">Payment successful</h1>
                <p className="text-muted-foreground mt-1">
                  {amount
                    ? `${formatCurrency(amount, currency)} has been paid.`
                    : "Your payment has been processed."}
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="text-destructive size-14" />
              <div>
                <h1 className="text-xl font-bold">Payment canceled</h1>
                <p className="text-muted-foreground mt-1">
                  Your payment was not completed. You can try again anytime.
                </p>
              </div>
            </>
          )}
          <Button asChild className="mt-2 w-full">
            <Link href="/dashboard/tenant">Go to my rentals</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
