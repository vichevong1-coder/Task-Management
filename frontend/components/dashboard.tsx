"use client"

import { useState } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Pencil, Trash2, ChevronDown, Plus, ClipboardList, LogOut } from "lucide-react"

interface User {
  _id: string
  username: string
  email: string
}

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  dueDate: string // ISO Date String
  assignedTo: User
  createdAt: string
}

type TaskStatus = Task["status"]

interface DashboardProps {
  tasks: Task[]
  userName: string
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toDateInputValue(isoString: string): string {
  return isoString.split("T")[0]
}

export function Dashboard({ tasks: initialTasks, userName }: DashboardProps) {
  const { logout } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<"all" | TaskStatus>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as TaskStatus,
    dueDate: "",
  })
  const [formError, setFormError] = useState("")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length
  const completedTasks = tasks.filter((t) => t.status === "completed").length

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task._id !== id))
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: toDateInputValue(task.dueDate),
    })
    setFormError("")
    setIsModalOpen(true)
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setFormData({
      title: "",
      description: "",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
    })
    setFormError("")
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setFormError("Title is required")
      return
    }

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id
            ? {
                ...task,
                title: formData.title,
                description: formData.description,
                status: formData.status,
                dueDate: new Date(formData.dueDate).toISOString(),
              }
            : task,
        ),
      )
    } else {
      // Create new task
      const newTask: Task = {
        _id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        dueDate: new Date(formData.dueDate).toISOString(),
        assignedTo: {
          _id: "current-user",
          username: userName.toLowerCase().replace(" ", ""),
          email: `${userName.toLowerCase().replace(" ", "")}@example.com`,
        },
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, newTask])
    }

    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-foreground">Task Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{totalTasks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-muted-foreground">{pendingTasks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{inProgressTasks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Button onClick={handleCreateTask} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                Filter: {filter === "in-progress" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("in-progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Task List or Empty State */}
        {filteredTasks.length === 0 ? (
          <EmptyState onCreateTask={handleCreateTask} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })
                  if (formError) setFormError("")
                }}
                placeholder="Enter task title"
              />
              {formError && <p className="text-sm text-destructive">{formError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg border">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
              {editingTask ? "Save Changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}) {
  const isCompleted = task.status === "completed"

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Pending
          </Badge>
        )
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
    }
  }

  return (
    <Card className={`transition-opacity ${isCompleted ? "opacity-50" : ""}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base font-medium text-foreground truncate">{task.title}</CardTitle>
          {task.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
        </div>
        <div className="flex gap-1 ml-2 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(task._id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          {getStatusBadge(task.status)}
          <span className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            {task.assignedTo.username.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-muted-foreground">{task.assignedTo.username}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ onCreateTask }: { onCreateTask: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-16">
      <ClipboardList className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-medium text-foreground">No tasks found</h3>
      <p className="mb-6 text-muted-foreground">Create one to get started!</p>
      <Button onClick={onCreateTask} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="h-4 w-4" />
        Create Task
      </Button>
    </div>
  )
}
