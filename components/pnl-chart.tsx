"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"

const data = [
  { date: "Jan", pnl: 1000, cumulative: 1000 },
  { date: "Feb", pnl: 1500, cumulative: 2500 },
  { date: "Mar", pnl: -500, cumulative: 2000 },
  { date: "Apr", pnl: 2000, cumulative: 4000 },
  { date: "May", pnl: 800, cumulative: 4800 },
  { date: "Jun", pnl: -300, cumulative: 4500 },
  { date: "Jul", pnl: 1200, cumulative: 5700 },
  { date: "Aug", pnl: 900, cumulative: 6600 },
  { date: "Sep", pnl: 1100, cumulative: 7700 },
  { date: "Oct", pnl: 600, cumulative: 8300 },
  { date: "Nov", pnl: 1400, cumulative: 9700 },
  { date: "Dec", pnl: 1200, cumulative: 10900 },
]

export function PnLChart() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">PnL Performance</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              1D
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              7D
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              1M
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              3M
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              1Y
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-gray-600 bg-gray-800 p-3 shadow-lg">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-400">Month</span>
                            <span className="font-bold text-white">{label}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-400">Cumulative PnL</span>
                            <span className="font-bold text-green-400">${payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={2} fill="url(#colorPnl)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
