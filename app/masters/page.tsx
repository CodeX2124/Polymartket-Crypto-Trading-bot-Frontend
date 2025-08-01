"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { MasterDetailCard } from "@/components/master-detail-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { PnLChart } from "@/components/pnl-chart"
import { PositionsActivitiesCard } from "@/components/positions-activities-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from a global state management solution
const getFollowedMasters = () => {
  // In a real app, this would fetch from your state management or API
  return [
    {
      id: 1,
      name: "CryptoKing",
      avatar: "/placeholder.svg?height=40&width=40",
      winRate: "72.5%",
      totalPnL: "+$12,847",
      followers: 1247,
      category: "Crypto",
      isFollowing: true,
      joinDate: "Jan 2022",
      totalTrades: 342,
      roi: "34.2%",
      description: "Specialized in cryptocurrency markets with a focus on Bitcoin and Ethereum predictions.",
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
      joinDate: "Mar 2022",
      totalTrades: 256,
      roi: "28.7%",
      description: "UFC expert with deep knowledge of fighter statistics and match outcomes.",
    },
  ]
}

export default function MastersPage() {
  const [followedMasters, setFollowedMasters] = useState(getFollowedMasters())

  // In a real app, you'd listen to global state changes here
  useEffect(() => {
    // This would update when masters are followed/unfollowed
    setFollowedMasters(getFollowedMasters())
  }, [])

  if (followedMasters.length === 0) {
    return (
      <Layout>
        <PageHeader title="Your Masters" subtitle="Manage and analyze your followed traders" />

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">No Masters Followed Yet</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-gray-400 mb-6">
              You haven't followed any masters yet. Browse the Sports Markets or Rankings to find traders to follow.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">Browse Sports Markets</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                View Rankings
              </Button>
            </div>
          </CardContent>
        </Card>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader title="Your Masters" subtitle="Manage and analyze your followed traders" />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search masters..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Master
        </Button>
      </div>

      <Tabs defaultValue={followedMasters[0]?.name.toLowerCase().replace(/\s+/g, "")} className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          {followedMasters.map((master) => (
            <TabsTrigger
              key={master.id}
              value={master.name.toLowerCase().replace(/\s+/g, "")}
              className="data-[state=active]:bg-green-600 text-white"
            >
              {master.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {followedMasters.map((master) => (
          <TabsContent key={master.id} value={master.name.toLowerCase().replace(/\s+/g, "")} className="mt-6">
            <div className="space-y-6">
              <MasterDetailCard {...master} />

              <div className="grid gap-6 lg:grid-cols-2">
                <PnLChart />
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 border-gray-700 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Win Streak</div>
                      <div className="text-2xl font-bold text-white">7</div>
                    </div>
                    <div className="bg-gray-800 border-gray-700 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Avg. Position</div>
                      <div className="text-2xl font-bold text-white">$450</div>
                    </div>
                    <div className="bg-gray-800 border-gray-700 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Favorite Market</div>
                      <div className="text-lg font-bold text-white">{master.category}</div>
                    </div>
                    <div className="bg-gray-800 border-gray-700 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Copy Success</div>
                      <div className="text-2xl font-bold text-green-400">92%</div>
                    </div>
                  </div>
                </div>
              </div>

              <PositionsActivitiesCard />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  )
}
