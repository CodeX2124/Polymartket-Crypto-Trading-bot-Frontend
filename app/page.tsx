import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { AccountOverview } from "@/components/account-overview"
import { PnLChart } from "@/components/pnl-chart"
import { PositionsActivitiesCard } from "@/components/positions-activities-card"

export default function Dashboard() {
  return (
    <Layout>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your trading overview." />

      {/* Account Overview */}
      <AccountOverview />

      {/* Charts and Tables */}
      <div className="grid gap-6 mt-6 lg:grid-cols-2">
        <PnLChart />
        <PositionsActivitiesCard />
      </div>
    </Layout>
  )
}
