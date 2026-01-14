import { Card } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"

interface ProfileBioProps {
  bio: string
  location: string
  joinedDate: string
}

export function ProfileBio({ bio, location, joinedDate }: ProfileBioProps) {
  const joinedYear = new Date(joinedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
          <p className="text-foreground leading-relaxed">{bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-foreground font-medium">{location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="text-foreground font-medium">{joinedYear}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
