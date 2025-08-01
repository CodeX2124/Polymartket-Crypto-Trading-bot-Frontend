"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target, Clock, Award, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MasterDetailCardProps {
  name: string
  avatar: string
  winRate: string
  totalPnL: string
  followers: number
  category: string
  isFollowing: boolean
  joinDate: string
  totalTrades: number
  roi: string
  description: string
}

export function MasterDetailCard({
  name,
  avatar,
  winRate,
  totalPnL,
  followers,
  category,
  isFollowing: initialFollowing,
  joinDate,
  totalTrades,
  roi,
  description,
}: MasterDetailCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const { toast } = useToast()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)

    if (!isFollowing) {
      toast({
        title: "Master Added",
        description: `You are now following ${name}. Check Your Masters page to manage settings.`,
      })
    } else {
      toast({
        title: "Master Removed",
        description: `You are no longer following ${name}.`,
      })
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white text-xl">{name}</CardTitle>
              <Badge className="bg-green-600">{category}</Badge>
            </div>
            <p className="text-gray-400 mt-1 text-sm">{description}</p>
          </div>
          <Button
            variant={isFollowing ? "outline" : "default"}
            className={isFollowing ? "border-gray-600 text-gray-300" : "bg-green-600 hover:bg-green-700"}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              <span>Win Rate</span>
            </div>
            <div className="text-xl font-bold text-white">{winRate}</div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Target className="h-4 w-4" />
              <span>Total PnL</span>
            </div>
            <div className="text-xl font-bold text-green-400">{totalPnL}</div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Users className="h-4 w-4" />
              <span>Followers</span>
            </div>
            <div className="text-xl font-bold text-white">{followers}</div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Award className="h-4 w-4" />
              <span>ROI</span>
            </div>
            <div className="text-xl font-bold text-white">{roi}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Joined: {joinDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Total Trades: {totalTrades}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
