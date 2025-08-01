"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { SportsMarketCard } from "@/components/sports-market-card"
import { MarketHolders } from "@/components/market-holders"
import { HolderDashboard } from "@/components/holder-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft } from "lucide-react"

const sportsMarkets = {
  nba: [
    {
      id: 1,
      title: "Will Lakers win vs Warriors?",
      category: "NBA",
      endTime: "Today, 7:30 PM",
      liquidity: "High",
      volume: "$45,231",
      participants: 324,
      odds: { yes: "1.85", no: "2.15" },
    },
    {
      id: 2,
      title: "Will Celtics win vs Bucks?",
      category: "NBA",
      endTime: "Tomorrow, 6:00 PM",
      liquidity: "Medium",
      volume: "$32,456",
      participants: 256,
      odds: { yes: "1.75", no: "2.25" },
    },
    {
      id: 3,
      title: "Will Nets score over 110 points vs Heat?",
      category: "NBA",
      endTime: "Today, 8:00 PM",
      liquidity: "Medium",
      volume: "$28,765",
      participants: 198,
      odds: { yes: "1.95", no: "1.85" },
    },
  ],
  ufc: [
    {
      id: 4,
      title: "UFC 295: Jon Jones vs Stipe Miocic",
      category: "UFC",
      endTime: "Nov 11, 10:00 PM",
      liquidity: "High",
      volume: "$67,890",
      participants: 543,
      odds: { yes: "1.45", no: "2.75" },
    },
    {
      id: 5,
      title: "UFC Fight Night: Whittaker vs Costa",
      category: "UFC",
      endTime: "Nov 18, 9:00 PM",
      liquidity: "Medium",
      volume: "$34,567",
      participants: 287,
      odds: { yes: "1.65", no: "2.35" },
    },
  ],
  nfl: [
    {
      id: 6,
      title: "NFL: Chiefs vs Bills Over 45.5",
      category: "NFL",
      endTime: "Sunday, 4:25 PM",
      liquidity: "High",
      volume: "$56,789",
      participants: 432,
      odds: { yes: "1.90", no: "1.90" },
    },
    {
      id: 7,
      title: "NFL: Eagles vs Cowboys",
      category: "NFL",
      endTime: "Sunday, 8:20 PM",
      liquidity: "High",
      volume: "$78,901",
      participants: 654,
      odds: { yes: "2.05", no: "1.75" },
    },
  ],
  crypto: [
    {
      id: 8,
      title: "Will Bitcoin hit $50k by Dec?",
      category: "Crypto",
      endTime: "Dec 1, 11:59 PM",
      liquidity: "High",
      volume: "$123,456",
      participants: 876,
      odds: { yes: "1.65", no: "2.35" },
    },
    {
      id: 9,
      title: "Will Ethereum merge before Nov 30?",
      category: "Crypto",
      endTime: "Nov 30, 11:59 PM",
      liquidity: "Medium",
      volume: "$87,654",
      participants: 543,
      odds: { yes: "2.25", no: "1.65" },
    },
  ],
}

export default function SportsMarketsPage() {
  const [selectedMarket, setSelectedMarket] = useState<any>(null)
  const [selectedHolder, setSelectedHolder] = useState<any>(null)

  const handleMarketClick = (market: any) => {
    setSelectedMarket(market)
    setSelectedHolder(null)
  }

  const handleHolderClick = (holder: any) => {
    setSelectedHolder(holder)
  }

  const handleBackToMarkets = () => {
    setSelectedMarket(null)
    setSelectedHolder(null)
  }

  const handleBackToHolders = () => {
    setSelectedHolder(null)
  }

  if (selectedHolder) {
    return (
      <Layout>
        <HolderDashboard holder={selectedHolder} onBack={handleBackToHolders} />
      </Layout>
    )
  }

  if (selectedMarket) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBackToMarkets} className="border-gray-600 text-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Markets
            </Button>
          </div>
          <MarketHolders marketTitle={selectedMarket.title} onHolderClick={handleHolderClick} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader title="Sports Markets" subtitle="Browse and copy trade from all available markets" />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search markets..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Filter</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-600 text-white">
            All Markets
          </TabsTrigger>
          <TabsTrigger value="nba" className="data-[state=active]:bg-green-600 text-white">
            NBA
          </TabsTrigger>
          <TabsTrigger value="ufc" className="data-[state=active]:bg-green-600 text-white">
            UFC
          </TabsTrigger>
          <TabsTrigger value="nfl" className="data-[state=active]:bg-green-600 text-white">
            NFL
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-green-600 text-white">
            Crypto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...sportsMarkets.nba, ...sportsMarkets.ufc, ...sportsMarkets.nfl, ...sportsMarkets.crypto]
              .slice(0, 6)
              .map((market) => (
                <div key={market.id} onClick={() => handleMarketClick(market)}>
                  <SportsMarketCard {...market} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="nba" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sportsMarkets.nba.map((market) => (
              <div key={market.id} onClick={() => handleMarketClick(market)}>
                <SportsMarketCard {...market} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ufc" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sportsMarkets.ufc.map((market) => (
              <div key={market.id} onClick={() => handleMarketClick(market)}>
                <SportsMarketCard {...market} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nfl" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sportsMarkets.nfl.map((market) => (
              <div key={market.id} onClick={() => handleMarketClick(market)}>
                <SportsMarketCard {...market} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sportsMarkets.crypto.map((market) => (
              <div key={market.id} onClick={() => handleMarketClick(market)}>
                <SportsMarketCard {...market} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
