"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ActionState } from "@/actions/auth.actions";

/** Fires a toast whenever the given action state changes to a message. */
export function useActionToast(state: ActionState) {
  const last = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!state.message || state.message === last.current) return;
    last.current = state.message;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);
}
