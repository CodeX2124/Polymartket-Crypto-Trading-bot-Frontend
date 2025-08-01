"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MarketHoldersProps {
  marketTitle: string
  onHolderClick: (holder: any) => void
}

const holders = [
  {
    id: 1,
    name: "CryptoKing",
    avatar: "/placeholder.svg?height=40&width=40",
    position: "$2,500",
    side: "Yes",
    winRate: "72.5%",
    totalPnL: "+$12,847",
    followers: 1247,
    category: "Crypto",
    isFollowing: true,
    description: "Specialized in cryptocurrency markets with a focus on Bitcoin and Ethereum predictions.",
    joinDate: "Jan 2022",
    totalTrades: 342,
    roi: "34.2%",
  },
  {
    id: 2,
    name: "SportsBettor",
    avatar: "/placeholder.svg?height=40&width=40",
    position: "$1,800",
    side: "Yes",
    winRate: "65.3%",
    totalPnL: "+$8,432",
    followers: 892,
    category: "Sports",
    isFollowing: false,
    description: "Multi-sport betting expert with focus on NBA and NFL markets.",
    joinDate: "Feb 2022",
    totalTrades: 278,
    roi: "28.7%",
  },
  {
    id: 3,
    name: "LakersFan",
    avatar: "/placeholder.svg?height=40&width=40",
    position: "$1,200",
    side: "Yes",
    winRate: "58.7%",
    totalPnL: "+$3,234",
    followers: 456,
    category: "NBA",
    isFollowing: false,
    description: "Lakers specialist with deep knowledge of team performance and player stats.",
    joinDate: "Mar 2022",
    totalTrades: 156,
    roi: "22.1%",
  },
  {
    id: 4,
    name: "WarriorsSupporter",
    avatar: "/placeholder.svg?height=40&width=40",
    position: "$900",
    side: "No",
    winRate: "62.1%",
    totalPnL: "+$2,876",
    followers: 321,
    category: "NBA",
    isFollowing: false,
    description: "Warriors fan with expertise in Golden State team dynamics and performance.",
    joinDate: "Apr 2022",
    totalTrades: 134,
    roi: "19.8%",
  },
  {
    id: 5,
    name: "BasketballPro",
    avatar: "/placeholder.svg?height=40&width=40",
    position: "$750",
    side: "No",
    winRate: "69.4%",
    totalPnL: "+$5,432",
    followers: 678,
    category: "NBA",
    isFollowing: false,
    description: "Professional basketball analyst with focus on game outcomes and player performance.",
    joinDate: "Jan 2022",
    totalTrades: 245,
    roi: "26.3%",
  },
]

export function MarketHolders({ marketTitle, onHolderClick }: MarketHoldersProps) {
  const [followingStates, setFollowingStates] = useState<Record<number, boolean>>(
    holders.reduce((acc, holder) => ({ ...acc, [holder.id]: holder.isFollowing }), {}),
  )
  const { toast } = useToast()

  const handleFollow = (
    holderId: number,
    holderName: string,
    isCurrentlyFollowing: boolean,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation() // Prevent triggering the holder click

    setFollowingStates((prev) => ({
      ...prev,
      [holderId]: !isCurrentlyFollowing,
    }))

    if (!isCurrentlyFollowing) {
      toast({
        title: "Master Added",
        description: `You are now following ${holderName}. Check Your Masters page to manage settings.`,
      })
    } else {
      toast({
        title: "Master Removed",
        description: `You are no longer following ${holderName}.`,
      })
    }
  }

  const handleHolderClick = (holder: any) => {
    onHolderClick({
      ...holder,
      isFollowing: followingStates[holder.id],
    })
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Top Holders - {marketTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holders.map((holder, index) => (
            <div
              key={holder.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleHolderClick(holder)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-lg font-bold text-gray-400 w-6">#{index + 1}</div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={holder.avatar || "/placeholder.svg"} alt={holder.name} />
                  <AvatarFallback>{holder.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{holder.name}</h4>
                    <Badge
                      variant={holder.side === "Yes" ? "default" : "secondary"}
                      className={holder.side === "Yes" ? "bg-green-600" : "bg-red-600"}
                    >
                      {holder.side}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {holder.position}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {holder.winRate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {holder.followers}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total PnL</div>
                  <div className="font-bold text-green-400">{holder.totalPnL}</div>
                </div>
                <Button
                  size="sm"
                  variant={followingStates[holder.id] ? "outline" : "default"}
                  className={
                    followingStates[holder.id] ? "border-gray-600 text-gray-300" : "bg-green-600 hover:bg-green-700"
                  }
                  onClick={(e) => handleFollow(holder.id, holder.name, followingStates[holder.id], e)}
                >
                  {followingStates[holder.id] ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
