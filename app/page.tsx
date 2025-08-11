import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { AccountOverview } from "@/components/account-overview"
import { PnLChart } from "@/components/pnl-chart"
import { PositionsActivitiesCard } from "@/components/positions-activities-card"
import {TradeSettingsProvider} from "@/hooks/useTradeSettingContext"

export default function Dashboard() {
  return (
    <TradeSettingsProvider>
      <Layout>
        <PageHeader title="Dashboard" subtitle="Welcome back! Here's your trading overview." />

        {/* Account Overview */}
        <AccountOverview />

        {/* Charts and Tables */}
        <div className="mt-6">
          {/* <PnLChart /> */}
          <PositionsActivitiesCard />
        </div>
      </Layout>
    </TradeSettingsProvider>
  )
}
