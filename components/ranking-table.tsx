"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface RankingTableProps {
  category?: string
  onMasterClick: (master: any) => void
}

const rankings = [
  {
    id: 1,
    rank: 1,
    name: "CryptoKing",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "72.5%",
    totalPnL: "+$12,847",
    followers: 1247,
    category: "Crypto",
    roi: "34.2%",
    isFollowing: true,
    description: "Specialized in cryptocurrency markets with a focus on Bitcoin and Ethereum predictions.",
    joinDate: "Jan 2022",
    totalTrades: 342,
    position: "$2,500",
  },
  {
    id: 2,
    rank: 2,
    name: "FightAnalyst",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "68.3%",
    totalPnL: "+$8,432",
    followers: 892,
    category: "UFC",
    roi: "28.7%",
    isFollowing: true,
    description: "UFC expert with deep knowledge of fighter statistics and match outcomes.",
    joinDate: "Mar 2022",
    totalTrades: 256,
    position: "$1,800",
  },
  {
    id: 3,
    rank: 3,
    name: "NFLPro",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "65.7%",
    totalPnL: "+$6,234",
    followers: 654,
    category: "NFL",
    roi: "25.1%",
    isFollowing: false,
    description: "NFL specialist focusing on game outcomes and player performance metrics.",
    joinDate: "Sep 2022",
    totalTrades: 187,
    position: "$1,200",
  },
  {
    id: 4,
    rank: 4,
    name: "BasketballGuru",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "64.2%",
    totalPnL: "+$5,876",
    followers: 521,
    category: "NBA",
    roi: "23.8%",
    isFollowing: false,
    description: "NBA specialist with expertise in player performance and team dynamics.",
    joinDate: "Jun 2022",
    totalTrades: 198,
    position: "$900",
  },
  {
    id: 5,
    rank: 5,
    name: "PoliticsTrader",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "62.1%",
    totalPnL: "+$5,432",
    followers: 487,
    category: "Politics",
    roi: "21.5%",
    isFollowing: false,
    description: "Political prediction expert with focus on election outcomes and policy decisions.",
    joinDate: "Apr 2022",
    totalTrades: 165,
    position: "$750",
  },
]

export function RankingTable({ category, onMasterClick }: RankingTableProps) {
  const [followingStates, setFollowingStates] = useState<Record<number, boolean>>(
    rankings.reduce((acc, master) => ({ ...acc, [master.id]: master.isFollowing }), {}),
  )
  const { toast } = useToast()

  const filteredRankings = category ? rankings.filter((r) => r.category === category) : rankings

  const handleFollow = (masterId: number, masterName: string, isCurrentlyFollowing: boolean) => {
    setFollowingStates((prev) => ({
      ...prev,
      [masterId]: !isCurrentlyFollowing,
    }))

    if (!isCurrentlyFollowing) {
      toast({
        title: "Master Added",
        description: `You are now following ${masterName}. Check Your Masters page to manage settings.`,
      })
    } else {
      toast({
        title: "Master Removed",
        description: `You are no longer following ${masterName}.`,
      })
    }
  }

  const handleMasterNameClick = (master: any) => {
    onMasterClick({
      ...master,
      isFollowing: followingStates[master.id],
    })
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Top Masters {category ? `- ${category}` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Rank</TableHead>
              <TableHead className="text-gray-300">Trader</TableHead>
              <TableHead className="text-gray-300">Category</TableHead>
              <TableHead className="text-gray-300">Win Rate</TableHead>
              <TableHead className="text-gray-300">Total PnL</TableHead>
              <TableHead className="text-gray-300">ROI</TableHead>
              <TableHead className="text-gray-300">Followers</TableHead>
              <TableHead className="text-gray-300"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRankings.map((master) => (
              <TableRow key={master.id} className="border-gray-700">
                <TableCell className="font-bold text-white">{master.rank}</TableCell>
                <TableCell>
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    onClick={() => handleMasterNameClick(master)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
                      <AvatarFallback>{master.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white hover:text-green-400">{master.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-gray-700 text-gray-300">{master.category}</Badge>
                </TableCell>
                <TableCell className="text-white">{master.winRate}</TableCell>
                <TableCell className="text-green-400">{master.totalPnL}</TableCell>
                <TableCell className="text-white">{master.roi}</TableCell>
                <TableCell className="text-white">{master.followers}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={followingStates[master.id] ? "outline" : "default"}
                    className={
                      followingStates[master.id] ? "border-gray-600 text-gray-300" : "bg-green-600 hover:bg-green-700"
                    }
                    onClick={() => handleFollow(master.id, master.name, followingStates[master.id])}
                  >
                    {followingStates[master.id] ? "Following" : "Follow"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
