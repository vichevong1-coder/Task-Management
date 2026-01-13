"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional: "admin" or "user"
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, token, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth initialization to finish before deciding
    if (isInitializing) return;
    if (!token) {
      router.push("/login");
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      router.push("/dashboard");
    }
  }, [isInitializing, token, user, router, requiredRole]);


  if (isInitializing || !token || (requiredRole && user?.role !== requiredRole)) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;