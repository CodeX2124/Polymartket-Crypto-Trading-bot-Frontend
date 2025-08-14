"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, Copy, MoreHorizontal, ExternalLink, Check, ArrowUpRight, ArrowDownRight } from "lucide-react"
import axios from 'axios';
import { UserActivityInterface, UserPositionInterface } from "@/app/Interface/User"
import { redeemPositions } from "@/app/api"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-toastify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAccounts, saveSettings } from "@/app/api";
import { Account } from "@/app/Interface/account";
import { SellModal } from "./sell-modal"
import { sellPositions } from "@/app/api"

const PROXY_WALLET = process.env.NEXT_PUBLIC_PROXY_WALLET;

export function PositionsActivitiesCard() {
  const [activeTab, setActiveTab] = useState<"positions" | "activities">("positions")
  const [activePositions, setActivePostions] = useState<UserPositionInterface[]>([])
  const [activities, setActivities] = useState<UserActivityInterface[]>([])
  const [isRedeeming, setIsRedeeming] = useState<number | null>(null);
  const [redeemedPositions, setRedeemedPositions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<UserPositionInterface | null>(null)

  const handleRedeem = async (index: number, position: any) => {
    if (!position.redeemable || redeemedPositions.includes(index)) return;
    
    setIsRedeeming(index);
    
    try {
      const transactions = await redeemPositions(position);
      console.log("transactions", transactions);
      if(transactions.success){
        setRedeemedPositions(prev => [...prev, index]);
        toast.success("Position redeemed successfully!");
      }
    } catch (error) {
      console.error("Redemption failed:", error);
      toast.error("Failed to redeem position");
    } finally {
      setIsRedeeming(null);
    }
  };
  
  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoadingAccounts(true);
      setAccountsError(null);
      try {
        const loadedAccounts = await getAccounts();
        setAccounts(loadedAccounts);
        if (loadedAccounts.length > 0) {
          setSelectedUser(loadedAccounts[0].id);
          setWalletAddress(loadedAccounts[0].proxyWallet);
        }
      } catch (error) {
        console.error("Failed to load accounts:", error);
        setAccountsError("Failed to load users");
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const onChangeHandler = (userId: string) => {
    setSelectedUser(userId);
    const selectedAccount = accounts.find(account => account.id === userId);
    if (selectedAccount) {
      setWalletAddress(selectedAccount.proxyWallet);
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
    try {

      if (!walletAddress) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      let [activePositions, activities] = await Promise.all([
        fetchData(`https://data-api.polymarket.com/positions?user=${walletAddress}`),
        fetchData(`https://data-api.polymarket.com/activity?user=${walletAddress}&limit=500&offset=0`)
      ]);
      
      setActivePostions(activePositions);
      setActivities(activities);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPostion();
    const interval = setInterval(fetchPostion, 60000); // Refresh every 10 seconds
    
    return () => {
      clearInterval(interval);
    }
  }, [walletAddress]);

  const handleSellPosition = async (amount: number) => {
    if (!selectedPosition) return
    
    try {
      // Implement your sell logic here
      const sell = await sellPositions(selectedPosition, amount);
      if(sell.success){      

        toast.success(`Sold ${amount.toFixed(2)} shares of ${selectedPosition.title}`)
      }

    } catch (error) {
      console.error("Sell failed:", error)
      toast.error("Failed to sell position")
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "positions" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("positions")}
              className={`transition-all ${activeTab === "positions" ? "bg-green-600 hover:bg-green-700" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <TrendingUp className="h-4 w-4" />
              Positions
            </Button>
            <Button
              variant={activeTab === "activities" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("activities")}
              className={`transition-all ${activeTab === "activities" ? "bg-green-600 hover:bg-green-700" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Clock className="h-4 w-4" />
              Activities
            </Button>
          </div>
          
          {/* User Select Dropdown */}
          <div className="w-full md:w-64">
            <Select 
              value={selectedUser}
              onValueChange={onChangeHandler}
              disabled={isLoadingAccounts || accounts.length === 0}
            >
              {isLoadingAccounts ? (
                <SelectTrigger className="bg-gray-800 text-gray-400 border-gray-700">
                  <SelectValue placeholder="Loading users..." />
                </SelectTrigger>
              ) : accountsError ? (
                <SelectTrigger className="bg-gray-800 text-red-400 border-gray-700">
                  <SelectValue placeholder={accountsError} />
                </SelectTrigger>
              ) : accounts.length === 0 ? (
                <SelectTrigger className="bg-gray-800 text-gray-400 border-gray-700">
                  <SelectValue placeholder="No users available" />
                </SelectTrigger>
              ) : (
                <>
                  <SelectTrigger className="bg-gray-800 text-white border-gray-700 hover:bg-gray-750 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {accounts.map((account) => (
                      <SelectItem 
                        key={account.id} 
                        value={account.id}
                        className="hover:bg-gray-700 focus:bg-gray-700"                        
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>User {account.proxyWallet.substring(0, 6)}...{account.proxyWallet.slice(-4)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </>
              )}
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-gray-700 rounded-lg" />
            ))}
          </div>
        ) : activeTab === "positions" ? (
          <div className="rounded-lg border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-700/50">
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="text-gray-300">Market</TableHead>
                  <TableHead className="text-gray-300">Position</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Odds</TableHead>
                  <TableHead className="text-gray-300">PnL</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePositions.length > 0 ? (
                  activePositions.map((position, index) => (
                    <TableRow key={index} className="border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <TableCell className="font-medium text-white max-w-[200px]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col">
                                <span className="truncate font-medium">{position.title}</span>
                                <Badge variant="outline" className="w-fit mt-1 text-xs border-gray-600 text-gray-400">
                                  {"Sports"}
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px]">
                              <p>{position.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={position.outcome === "Yes" ? "default" : "secondary"}
                          className={`flex items-center gap-1 ${position.outcome === "Yes" ? "bg-green-600/80 hover:bg-green-600" : "bg-red-600/80 hover:bg-red-600"}`}
                        >
                          {position.outcome === "Yes" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {position.outcome}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">
                        ${(position.avgPrice * position.totalBought).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-white">
                          {position.size.toFixed(2)} 
                      </TableCell>
                      <TableCell className={position.cashPnl >= 0 ? "text-green-400" : "text-red-400"}>
                        <div className="flex items-center gap-1">
                          {position.cashPnl >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          ${position.cashPnl.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={position.redeemable ? "secondary" : "default"}
                          className={position.redeemable ? "bg-blue-600/80 hover:bg-blue-600" : "bg-gray-600 hover:bg-gray-500"}
                        >
                          {position.redeemable ? "Redeemable" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {redeemedPositions.includes(index) ? (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 gap-1 bg-green-600/20 hover:bg-green-600/30 text-green-400"
                              disabled
                            >
                              <Check className="h-4 w-4" />
                              Redeemed
                            </Button>
                          ) : (
                            <>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 gap-1 bg-red-600/80 hover:bg-red-600 text-white"
                                onClick={() => {
                                  setSelectedPosition(position)
                                  setSellModalOpen(true)
                                }}
                              >
                                <ArrowDownRight className="h-4 w-4" />
                                Sell
                              </Button>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className={`h-8 gap-1 ${position.redeemable ? "bg-green-600/80 hover:bg-green-600" : "bg-gray-700 cursor-not-allowed"}`}
                                      onClick={() => handleRedeem(index, position)}
                                      disabled={!position.redeemable || isRedeeming === index}
                                    >
                                      {isRedeeming === index ? (
                                        <span className="animate-pulse">Processing...</span>
                                      ) : (
                                        <>
                                          <Copy className="h-4 w-4" />
                                          Redeem
                                        </>
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  {!position.redeemable && (
                                    <TooltipContent className="bg-gray-700 border-gray-600">
                                      <p>This position is not yet redeemable</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableCell colSpan={7} className="h-24 text-center text-gray-400">
                      No active positions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors border border-gray-700"
                >
                  <div className={`p-2 rounded-full ${activity.type === "BUY" ? "bg-green-600/20" : "bg-red-600/20"}`}>
                    {activity.type === "BUY" ? (
                      <ArrowUpRight className="h-5 w-5 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white capitalize">
                        {activity.type.toLowerCase()}
                      </p>
                      <p className={`text-sm font-medium ${activity.type === "BUY" ? "text-green-400" : "text-red-400"}`}>
                        ${activity.size.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 truncate">{activity.title}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {new Date(activity.timestamp).toLocaleString()}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {"Sports"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No activities found
              </div>
            )}
          </div>
        )}
      </CardContent>

      <SellModal
        open={sellModalOpen}
        onOpenChange={setSellModalOpen}
        position={selectedPosition!}
        onSell={handleSellPosition}
      />
    </Card>
  )
}