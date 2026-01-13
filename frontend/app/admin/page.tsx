"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="bg-red-50 p-8 border border-red-200">
        <h1 className="text-2xl font-bold text-red-700">Admin Control Panel</h1>
        <p>Only users with role 'admin' can see this.</p>
      </div>
    </ProtectedRoute>
  );
}