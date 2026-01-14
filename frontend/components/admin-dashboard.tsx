"use client"

import { useState, useEffect } from "react"
import { Users, Shield, UserCheck, ClipboardList } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/users-table"
import { TasksTable } from "@/components/tasks-table"

interface Stats {
  totalUsers: number
  adminUsers: number
  regularUsers: number
  tasksCount: number
}

interface Task {
  _id: string
  title: string
  status: string
  assignedTo: {
    _id: string
    username: string
    email: string
  }
  dueDate: string
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsResponse, tasksResponse] = await Promise.all([fetch("/api/admin/stats"), fetch("/api/admin/tasks")])
        const [statsData, tasksData] = await Promise.all([statsResponse.json(), tasksResponse.json()])
        setStats(statsData)
        setTasks(tasksData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleUserDeleted = (userId: string) => {
    setTasks((prev) => prev.filter((task) => task.assignedTo._id !== userId))
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Admin Users",
      value: stats?.adminUsers ?? 0,
      icon: Shield,
      color: "bg-purple-500",
    },
    {
      title: "Regular Users",
      value: stats?.regularUsers ?? 0,
      icon: UserCheck,
      color: "bg-emerald-500",
    },
    {
      title: "Total Tasks",
      value: stats?.tasksCount ?? 0,
      icon: ClipboardList,
      color: "bg-amber-500",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and monitor all tasks across the platform</p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`rounded-md p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? (
                    <span className="animate-pulse text-muted-foreground">—</span>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for Users and Tasks */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="tasks">Global Task View</TabsTrigger>
              </TabsList>
              <TabsContent value="users" className="mt-6">
                <UsersTable onUserDeleted={handleUserDeleted} />
              </TabsContent>
              <TabsContent value="tasks" className="mt-6">
                <TasksTable tasks={tasks} loading={loading} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
