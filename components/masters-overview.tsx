import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target } from "lucide-react"

const masters = [
  {
    id: 1,
    name: "CryptoKing",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "72.5%",
    totalPnL: "+$12,847",
    followers: 1247,
    category: "Crypto",
    isFollowing: true,
  },
  {
    id: 2,
    name: "FightAnalyst",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "68.3%",
    totalPnL: "+$8,432",
    followers: 892,
    category: "UFC",
    isFollowing: true,
  },
  {
    id: 3,
    name: "NFLPro",
    avatar: "/placeholder.svg?height=40&width=40",
    winRate: "65.7%",
    totalPnL: "+$6,234",
    followers: 654,
    category: "NFL",
    isFollowing: false,
  },
]

export function MastersOverview() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Your Masters</CardTitle>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            Manage
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {masters.map((master) => (
            <div key={master.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={master.avatar || "/placeholder.svg"} alt={master.name} />
                <AvatarFallback>{master.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{master.name}</h4>
                  <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                    {master.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {master.winRate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {master.totalPnL}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {master.followers}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant={master.isFollowing ? "outline" : "default"}
                className={master.isFollowing ? "border-gray-600 text-gray-300" : "bg-green-600 hover:bg-green-700"}
              >
                {master.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
