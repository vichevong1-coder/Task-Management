import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface ProfileStatsProps {
  total: number
  pending: number
  inProgress: number
  completed: number
}

export function ProfileStats({ total, pending, inProgress, completed }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Tasks */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-foreground">{total}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-xl">📋</span>
          </div>
        </div>
      </Card>

      {/* Pending */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-foreground">{pending}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </Card>

      {/* In Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold text-foreground">{inProgress}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </Card>

      {/* Completed */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold text-foreground">{completed}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </Card>
    </div>
  )
}
