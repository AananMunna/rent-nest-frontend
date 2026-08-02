import { startCheckoutAction } from "@/actions/payment.actions";
import { SubmitButton } from "@/components/submit-button";
import { CreditCard } from "lucide-react";

export function PayNowButton({ rentalRequestId }: { rentalRequestId: string }) {
  const action = startCheckoutAction.bind(null, rentalRequestId);
  return (
    <form action={action}>
      <SubmitButton size="sm" pendingText="Redirecting...">
        <CreditCard className="size-4" />
        Pay now
      </SubmitButton>
    </form>
  );
}
