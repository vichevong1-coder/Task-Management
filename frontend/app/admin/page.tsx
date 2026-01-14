import { AdminDashboard } from "@/components/admin-dashboard"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  )
}