import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, Copy } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "copy",
    action: "Copied trade from CryptoKing",
    market: "Lakers vs Warriors",
    amount: "$500",
    time: "2 minutes ago",
    icon: Copy,
    color: "text-blue-400",
  },
  {
    id: 2,
    type: "win",
    action: "Position closed with profit",
    market: "Bitcoin $50k prediction",
    amount: "+$287.50",
    time: "1 hour ago",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    id: 3,
    type: "loss",
    action: "Position closed with loss",
    market: "UFC 295 outcome",
    amount: "-$45.20",
    time: "3 hours ago",
    icon: TrendingDown,
    color: "text-red-400",
  },
  {
    id: 4,
    type: "copy",
    action: "Copied trade from NFLPro",
    market: "Chiefs vs Bills Over 45.5",
    amount: "$400",
    time: "5 hours ago",
    icon: Copy,
    color: "text-blue-400",
  },
  {
    id: 5,
    type: "win",
    action: "Position closed with profit",
    market: "NFL Championship odds",
    amount: "+$160.00",
    time: "1 day ago",
    icon: TrendingUp,
    color: "text-green-400",
  },
]

export function ActivityFeed() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50">
              <div className={`p-2 rounded-full bg-gray-700 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-sm text-gray-400 truncate">{activity.market}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {activity.amount}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
