"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { RankingTable } from "@/components/ranking-table"
import { HolderDashboard } from "@/components/holder-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RankingPage() {
  const [selectedMaster, setSelectedMaster] = useState<any>(null)

  const handleMasterClick = (master: any) => {
    setSelectedMaster(master)
  }

  const handleBackToRanking = () => {
    setSelectedMaster(null)
  }

  if (selectedMaster) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBackToRanking} className="border-gray-600 text-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rankings
            </Button>
          </div>
          <HolderDashboard holder={selectedMaster} onBack={handleBackToRanking} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader title="Master Rankings" subtitle="Top performing traders across all markets" />

      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Top Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">CryptoKing</div>
            <div className="text-sm text-green-400">72.5% Win Rate</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Highest PnL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">CryptoKing</div>
            <div className="text-sm text-green-400">+$12,847</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Most Followed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">CryptoKing</div>
            <div className="text-sm text-gray-400">1,247 followers</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Best ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">CryptoKing</div>
            <div className="text-sm text-green-400">34.2% ROI</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-600 text-white">
            All Categories
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-green-600 text-white">
            Crypto
          </TabsTrigger>
          <TabsTrigger value="ufc" className="data-[state=active]:bg-green-600 text-white">
            UFC
          </TabsTrigger>
          <TabsTrigger value="nfl" className="data-[state=active]:bg-green-600 text-white">
            NFL
          </TabsTrigger>
          <TabsTrigger value="nba" className="data-[state=active]:bg-green-600 text-white">
            NBA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <RankingTable onMasterClick={handleMasterClick} />
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <RankingTable category="Crypto" onMasterClick={handleMasterClick} />
        </TabsContent>

        <TabsContent value="ufc" className="mt-6">
          <RankingTable category="UFC" onMasterClick={handleMasterClick} />
        </TabsContent>

        <TabsContent value="nfl" className="mt-6">
          <RankingTable category="NFL" onMasterClick={handleMasterClick} />
        </TabsContent>

        <TabsContent value="nba" className="mt-6">
          <RankingTable category="NBA" onMasterClick={handleMasterClick} />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
