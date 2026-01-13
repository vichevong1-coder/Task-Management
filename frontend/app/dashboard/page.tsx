"use client";

import { useAuth } from "@/src/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Dashboard } from "@/components/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.username || "User";

  return (
    <ProtectedRoute>
      <Dashboard tasks={[]} userName={userName} />
    </ProtectedRoute>
  );
}