"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

interface TasksTableProps {
  tasks: Task[]
  loading: boolean
}

export function TasksTable({ tasks, loading }: TasksTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Completed</Badge>
      case "in-progress":
      case "in progress":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">In Progress</Badge>
      case "pending":
        return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">No tasks found</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{getStatusBadge(task.status)}</TableCell>
            <TableCell>{task.assignedTo.email}</TableCell>
            <TableCell>{formatDate(task.dueDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
