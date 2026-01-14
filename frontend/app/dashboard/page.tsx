"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Dashboard } from "@/components/dashboard";

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  assignedTo: {
    _id: string
    username: string
    email: string
  }
  createdAt: string
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const userName = user?.username || "User";

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/api/tasks/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Dashboard tasks={tasks} userName={userName} />
    </ProtectedRoute>
  );
}
