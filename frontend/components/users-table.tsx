"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/src/context/AuthContext"

interface User {
  _id: string
  username: string
  email: string
  role: string
  createdAt: string
}

interface UsersTableProps {
  onUserDeleted: (userId: string) => void
}

export function UsersTable({ onUserDeleted }: UsersTableProps) {
  const { token } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      if (!token) return

      try {
        const response = await fetch("http://localhost:3000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [token])

  const handleDelete = async (userId: string, username: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${username}"? This will also delete all their tasks. This action cannot be undone.`,
    )

    if (confirmed && token) {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/user/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user._id !== userId))
          onUserDeleted(userId)
        }
      } catch (error) {
        console.error("Failed to delete user:", error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">Loading users...</div>
  }

  if (users.length === 0) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">No users found</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user._id} className={index % 2 === 0 ? "bg-muted/30" : ""}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role === "admin" ? (
                <Badge className="bg-purple-500 text-white hover:bg-purple-600">Admin</Badge>
              ) : (
                <Badge variant="secondary">User</Badge>
              )}
            </TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(user._id, user.username)}>
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
