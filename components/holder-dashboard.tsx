"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target, ArrowLeft } from "lucide-react"
import { AccountOverview } from "@/components/account-overview"
import { PnLChart } from "@/components/pnl-chart"
import { PositionsActivitiesCard } from "@/components/positions-activities-card"
import { useToast } from "@/hooks/use-toast"

interface HolderDashboardProps {
  holder: any
  onBack: () => void
}

export function HolderDashboard({ holder, onBack }: HolderDashboardProps) {
  const [isFollowing, setIsFollowing] = useState(holder.isFollowing || false)
  const { toast } = useToast()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)

    if (!isFollowing) {
      toast({
        title: "Master Added",
        description: `You are now following ${holder.name}. Check Your Masters page to manage settings.`,
      })
    } else {
      toast({
        title: "Master Removed",
        description: `You are no longer following ${holder.name}.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-600 text-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={holder.avatar || "/placeholder.svg"} alt={holder.name} />
              <AvatarFallback>{holder.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-white text-xl">{holder.name}</CardTitle>
                <Badge className="bg-green-600">{holder.category}</Badge>
              </div>
              <p className="text-gray-400 mt-1 text-sm">
                {holder.description || `Professional trader specializing in ${holder.category} markets`}
              </p>
            </div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              className={isFollowing ? "border-gray-600 text-gray-300" : "bg-green-600 hover:bg-green-700"}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow Trader"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                <span>Win Rate</span>
              </div>
              <div className="text-xl font-bold text-white">{holder.winRate}</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Target className="h-4 w-4" />
                <span>Total PnL</span>
              </div>
              <div className="text-xl font-bold text-green-400">{holder.totalPnL}</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Users className="h-4 w-4" />
                <span>Followers</span>
              </div>
              <div className="text-xl font-bold text-white">{holder.followers}</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Target className="h-4 w-4" />
                <span>{holder.position ? "Position" : "ROI"}</span>
              </div>
              <div className="text-xl font-bold text-white">{holder.position || holder.roi}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AccountOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <PnLChart />
        <PositionsActivitiesCard />
      </div>
    </div>
  )
}
