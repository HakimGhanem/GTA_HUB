"use client";

import { useEffect } from "react";
import { activatePro } from "@/lib/isPro";

export function SetProCookie({
  sessionId,
  email,
  paid,
}: {
  sessionId?: string;
  email?: string;
  paid: boolean;
}) {
  useEffect(() => {
    if (paid && sessionId) activatePro(sessionId, email);
  }, [paid, sessionId, email]);

  return null;
}
