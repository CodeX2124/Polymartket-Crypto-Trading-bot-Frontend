import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-400",
  }[changeType]

  const ChangeIcon = changeType === "positive" ? TrendingUp : TrendingDown

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className={`flex items-center text-xs ${changeColor}`}>
          <ChangeIcon className="mr-1 h-3 w-3" />
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

export function AccountOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Balance"
        value="$12,847.32"
        change="+2.5% from last week"
        changeType="positive"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Total PnL"
        value="$2,847.32"
        change="+15.3% this month"
        changeType="positive"
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <MetricCard
        title="Total Volume"
        value="$45,231.89"
        change="+8.2% from last week"
        changeType="positive"
        icon={<BarChart3 className="h-4 w-4" />}
      />
      <MetricCard
        title="Win Rate"
        value="68.4%"
        change="-2.1% from last week"
        changeType="negative"
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  )
}
