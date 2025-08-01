"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, Copy, MoreHorizontal, ExternalLink } from "lucide-react"

const positions = [
  {
    id: 1,
    market: "Will Lakers win vs Warriors?",
    side: "Yes",
    amount: "$500",
    odds: "1.85",
    pnl: "+$125.50",
    status: "Open",
    master: "CryptoKing",
    category: "NBA",
  },
  {
    id: 2,
    market: "UFC 295: Jon Jones vs Stipe",
    side: "No",
    amount: "$300",
    odds: "2.10",
    pnl: "-$45.20",
    status: "Open",
    master: "FightAnalyst",
    category: "UFC",
  },
  {
    id: 3,
    market: "Will Bitcoin hit $50k by Dec?",
    side: "Yes",
    amount: "$750",
    odds: "1.65",
    pnl: "+$287.50",
    status: "Closed",
    master: "BitcoinBull",
    category: "Crypto",
  },
  {
    id: 4,
    market: "NFL: Chiefs vs Bills Over 45.5",
    side: "Yes",
    amount: "$400",
    odds: "1.90",
    pnl: "+$160.00",
    status: "Closed",
    master: "NFLPro",
    category: "NFL",
  },
]

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

export function PositionsActivitiesCard() {
  const [activeTab, setActiveTab] = useState<"positions" | "activities">("positions")

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "positions" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("positions")}
              className={activeTab === "positions" ? "bg-green-600 hover:bg-green-700" : "text-gray-300"}
            >
              Positions
            </Button>
            <Button
              variant={activeTab === "activities" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("activities")}
              className={activeTab === "activities" ? "bg-green-600 hover:bg-green-700" : "text-gray-300"}
            >
              Activities
            </Button>
          </div>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "positions" ? (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Market</TableHead>
                <TableHead className="text-gray-300">Side</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Odds</TableHead>
                <TableHead className="text-gray-300">PnL</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Master</TableHead>
                <TableHead className="text-gray-300"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.id} className="border-gray-700">
                  <TableCell className="font-medium text-white max-w-[200px]">
                    <div className="flex flex-col">
                      <span className="truncate">{position.market}</span>
                      <Badge variant="outline" className="w-fit mt-1 text-xs border-gray-600 text-gray-400">
                        {position.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={position.side === "Yes" ? "default" : "secondary"}
                      className={position.side === "Yes" ? "bg-green-600" : "bg-red-600"}
                    >
                      {position.side}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{position.amount}</TableCell>
                  <TableCell className="text-white">{position.odds}</TableCell>
                  <TableCell className={position.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}>
                    {position.pnl}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={position.status === "Open" ? "default" : "secondary"}
                      className={position.status === "Open" ? "bg-blue-600" : "bg-gray-600"}
                    >
                      {position.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-400">{position.master}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}
