import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, TrendingUp } from "lucide-react"

interface SportsMarketCardProps {
  title: string
  category: string
  endTime: string
  liquidity: string
  volume: string
  participants: number
  odds: {
    yes: string
    no: string
  }
}

export function SportsMarketCard({
  title,
  category,
  endTime,
  liquidity,
  volume,
  participants,
  odds,
}: SportsMarketCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2 bg-green-600">{category}</Badge>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Ends: {endTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Vol: {volume}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{participants}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-sm text-gray-300 mb-1">Yes</div>
            <div className="text-xl font-bold text-white">{odds.yes}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-sm text-gray-300 mb-1">No</div>
            <div className="text-xl font-bold text-white">{odds.no}</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Click to view top holders</p>
        </div>
      </CardContent>
    </Card>
  )
}
