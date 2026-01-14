"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2 } from "lucide-react"

interface User {
  _id: string
  username: string
  fullName: string
  email: string
  bio: string
  avatar: string
}

interface ProfileHeaderProps {
  user: User
  isEditing: boolean
  onEdit: () => void
  onEditChange: (user: User) => void
}

export function ProfileHeader({ user, isEditing, onEdit, onEditChange }: ProfileHeaderProps) {
  return (
    <Card className="overflow-hidden">
      {/* Background gradient section */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

      <div className="px-6 pb-6">
        {/* Profile Avatar and Info */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 mb-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-lg bg-white border-4 border-background shadow-lg overflow-hidden">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.fullName}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Full Name</label>
                  <Input
                    value={user.fullName}
                    onChange={(e) => onEditChange({ ...user, fullName: e.target.value })}
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Username</label>
                  <Input
                    value={user.username}
                    onChange={(e) => onEditChange({ ...user, username: e.target.value })}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Email</label>
                  <Input
                    type="email"
                    value={user.email}
                    onChange={(e) => onEditChange({ ...user, email: e.target.value })}
                    placeholder="Email"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="text-sm text-muted-foreground mt-2">{user.email}</p>
              </>
            )}
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <Button onClick={onEdit} variant="outline" className="gap-2 bg-transparent">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
