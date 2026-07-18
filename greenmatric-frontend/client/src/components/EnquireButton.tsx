"use client";

import { Button } from "./ui";
import { useQuote } from "@/context/quote";

export function EnquireButton({
  product, capacity, children, variant = "primary", className = "",
}: {
  product?: string; capacity?: string; children?: React.ReactNode;
  variant?: "primary" | "outline"; className?: string;
}) {
  const { openQuote } = useQuote();
  return (
    <Button onClick={() => openQuote({ product, capacity })} variant={variant} className={className}>
      {children ?? "Enquire now"}
    </Button>
  );
}
