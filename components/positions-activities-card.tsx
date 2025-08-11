"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, Copy, MoreHorizontal, ExternalLink, Check } from "lucide-react"
import axios from 'axios';
import { UserActivityInterface, UserPositionInterface } from "@/app/Interface/User"
import { redeemPositions } from "@/app/api"


const PROXY_WALLET = process.env.NEXT_PUBLIC_PROXY_WALLET;

export function PositionsActivitiesCard() {
  const [activeTab, setActiveTab] = useState<"positions" | "activities">("positions")
  const [activePositions, setActivePostions] = useState<UserPositionInterface[]>([])
  const [activities, setActivities] = useState<UserActivityInterface[]>([])
  const [isRedeeming, setIsRedeeming] = useState<number | null>(null);
  const [redeemedPositions, setRedeemedPositions] = useState<number[]>([]);

  const handleRedeem = async (index: number, position: any) => {
    if (!position.redeemable || redeemedPositions.includes(index)) return;
    
    setIsRedeeming(index);
    
    try {
      
      const transactions = redeemPositions(position);
      
      console.log("transactions", transactions);
      // Here you would actually send the transaction
      // For now, we'll simulate success after 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark position as redeemed
      setRedeemedPositions(prev => [...prev, index]);
    } catch (error) {
      console.error("Redemption failed:", error);
    } finally {
      setIsRedeeming(null);
    }
  };
  
  const fetchData = async (url: string) => {
      try {
          const response = await axios.get(url);
          return response.data;
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }
  };
  const fetchPostion = async () => {
    let activePositions: UserPositionInterface[] = await fetchData(`https://data-api.polymarket.com/positions?user=${PROXY_WALLET}`);
    setActivePostions(activePositions);

    let acivities: UserActivityInterface[] = await fetchData(`https://data-api.polymarket.com/activity?user=${PROXY_WALLET}&limit=500&offset=0`)
    setActivities(acivities);
  }

  useEffect(() => {
    const ptr = setInterval(fetchPostion, 1000)

    return () => {
      clearInterval(ptr)
    }
  }, [])

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
          {/* <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            View All
          </Button> */}
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
                <TableHead className="text-gray-300">Redeemable</TableHead>
                {/* <TableHead className="text-gray-300">Master</TableHead> */}
                <TableHead className="text-gray-300"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activePositions.map((position, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-white/0.2">
                  <TableCell className="font-medium text-white max-w-[200px]">
                    <div className="flex flex-col">
                      <span className="truncate">{position.title}</span>
                      <Badge variant="outline" className="w-fit mt-1 text-xs border-gray-600 text-gray-400">
                        Sports
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={position.outcome === "Yes" ? "default" : "secondary"}
                      className={position.outcome === "Yes" ? "bg-green-600" : "bg-red-600"}
                    >
                      {position.outcome}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{(position.avgPrice * position.totalBought).toFixed(2)}</TableCell>
                  <TableCell className="text-white">{position.size.toFixed(2)}</TableCell>
                  <TableCell className={position.cashPnl ? "text-green-400" : "text-red-400"}>
                    {position.cashPnl.toFixed(2)}
                  </TableCell>
                  <TableCell key={index}>
                    <Badge
                      variant={position.redeemable === false ? "default" : "secondary"}
                      className={position.redeemable === false ? "bg-blue-600" : "bg-red-600"}
                    >
                      {position.redeemable ? "True" : "False"}
                    </Badge>
                  </TableCell>                 
                  <TableCell onClick={() => handleRedeem(index, position)}>
                    <div className="flex gap-2">
                      {redeemedPositions.includes(index) ? (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-30 pl-10 pr-10"
                            disabled
                          >
                            <Check className="h-4 w-4" />Redeemed
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-30 pl-10 pr-10 hover:bg-green-600"
                            onClick={() => handleRedeem(index, position)}
                            disabled={!position.redeemable || isRedeeming === index}
                          >
                            {isRedeeming === index ? (
                              <span className="animate-pulse">Processing...</span>
                            ) : (
                              "Redeem"
                            )}
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50">
                {/* <div className={`p-2 rounded-full bg-gray-700 ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div> */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.type == "REDEEM" ? activity.type : activity.side}</p>
                  <p className="text-sm text-gray-400 truncate">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {activity.size.toFixed(2)}
                    </Badge>
                    {/* <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div> */}
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
