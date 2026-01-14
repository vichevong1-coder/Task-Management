"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { ProfileBio } from "@/components/profile-bio"
import { ProfileTasks } from "@/components/profile-tasks"
import { useAuth } from "@/src/context/AuthContext"

interface User {
  _id: string
  username: string
  email: string
  fullName: string
  bio: string
  location: string
  joinedDate: string
  avatar: string
}

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  createdAt: string
}

export default function ProfilePage() {
  const { user, token } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [userTasks, setUserTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return

      try {
        setLoading(true)
        
        // Fetch user profile
        const userResponse = await fetch(`http://localhost:3000/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data")
        }

        const userData = await userResponse.json()
        setEditedUser({
          _id: userData._id,
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName || userData.username,
          bio: userData.bio || "No bio added yet",
          location: userData.location || "Not specified",
          joinedDate: userData.createdAt || new Date().toISOString(),
          avatar: userData.avatar || "/placeholder.svg",
        })

        // Fetch user tasks
        const tasksResponse = await fetch(`http://localhost:3000/api/tasks/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json()
          setUserTasks(tasksData || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [token])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </main>
    )
  }

  if (error || !editedUser) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error || "Failed to load profile"}</p>
      </main>
    )
  }

  const pendingCount = userTasks.filter((t) => t.status === "pending").length
  const inProgressCount = userTasks.filter((t) => t.status === "in-progress").length
  const completedCount = userTasks.filter((t) => t.status === "completed").length

  const handleSave = async () => {
    if (!token || !editedUser) return

    try {
      const response = await fetch(`http://localhost:3000/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: editedUser.fullName,
          username: editedUser.username,
          email: editedUser.email,
          bio: editedUser.bio,
          location: editedUser.location,
          avatar: editedUser.avatar,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save changes")
      }

      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Profile Header Card */}
        <div className="mb-8">
          <ProfileHeader
            user={editedUser}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onEditChange={setEditedUser}
          />
        </div>

        {/* Bio Section */}
        {!isEditing && (
          <div className="mb-8">
            <ProfileBio bio={editedUser.bio} location={editedUser.location} joinedDate={editedUser.joinedDate} />
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-8">
          <ProfileStats
            total={userTasks.length}
            pending={pendingCount}
            inProgress={inProgressCount}
            completed={completedCount}
          />
        </div>

        {/* Tasks Section */}
        {!isEditing && (
          <div className="mb-8">
            <ProfileTasks tasks={userTasks} />
          </div>
        )}

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </main>
  )
}
