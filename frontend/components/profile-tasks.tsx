import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  createdAt: string
}

interface ProfileTasksProps {
  tasks: Task[]
}

export function ProfileTasks({ tasks }: ProfileTasksProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No tasks yet</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  {task.title}
                  <Badge className={getStatusColor(task.status)}>{getStatusLabel(task.status)}</Badge>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Due: {formatDate(task.dueDate)}</p>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors ml-4">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
