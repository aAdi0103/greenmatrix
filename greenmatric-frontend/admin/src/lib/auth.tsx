"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";
import type { Role } from "./types";

type SessionUser = { uid: string; email: string | null };
type AuthState = {
  user: SessionUser | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      apply(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => apply(session));
    return () => sub.subscription.unsubscribe();

    function apply(session: import("@supabase/supabase-js").Session | null) {
      if (session?.user) {
        setUser({ uid: session.user.id, email: session.user.email ?? null });
        setRole((session.user.app_metadata?.role as Role) ?? null);
      } else {
        setUser(null);
        setRole(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const logout = async () => { await supabase.auth.signOut(); };
  const getToken = async () => (await supabase.auth.getSession()).data.session?.access_token ?? null;

  return <Ctx.Provider value={{ user, role, loading, login, logout, getToken }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
