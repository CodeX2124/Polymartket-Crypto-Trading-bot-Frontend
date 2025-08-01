import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ExternalLink } from "lucide-react"

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

export function PositionsTable() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Recent Positions</CardTitle>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
