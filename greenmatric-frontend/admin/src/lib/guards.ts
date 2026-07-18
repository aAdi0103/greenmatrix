"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth";

// Belt-and-suspenders for admin-only pages (nav already hides them; rules enforce server-side).
export function useRequireAdmin() {
  const { role, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && role !== "admin") router.replace("/");
  }, [role, loading, router]);
  return { role, ready: !loading };
}
