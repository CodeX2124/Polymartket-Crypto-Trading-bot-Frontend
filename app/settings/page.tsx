import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { SettingsForm } from "@/components/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"

const masterSettings = [
  {
    id: 1,
    name: "CryptoKing",
    category: "Crypto",
    copyPercentage: 50,
    maxPosition: 500,
    isActive: true,
  },
  {
    id: 2,
    name: "FightAnalyst",
    category: "UFC",
    copyPercentage: 30,
    maxPosition: 300,
    isActive: true,
  },
  {
    id: 3,
    name: "NFLPro",
    category: "NFL",
    copyPercentage: 25,
    maxPosition: 250,
    isActive: false,
  },
]

export default function SettingsPage() {
  return (
    <Layout>
      <PageHeader title="Settings" subtitle="Configure your copy trading parameters and preferences" />

      <Tabs defaultValue="general" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-green-600 text-white">
            General Settings
          </TabsTrigger>
          <TabsTrigger value="masters" className="data-[state=active]:bg-green-600 text-white">
            Master Settings
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-green-600 text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-green-600 text-white">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <SettingsForm />
        </TabsContent>

        <TabsContent value="masters" className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Individual Master Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {masterSettings.map((master) => (
                <div key={master.id} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-white">{master.name}</h4>
                      <Badge className="bg-gray-600">{master.category}</Badge>
                      <Switch checked={master.isActive} />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 text-sm">Copy Percentage</Label>
                      <div className="text-white font-medium">{master.copyPercentage}%</div>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Max Position Size</Label>
                      <div className="text-white font-medium">${master.maxPosition}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Trade Notifications</Label>
                  <p className="text-sm text-gray-400">Get notified when masters place new trades</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Position Closed</Label>
                  <p className="text-sm text-gray-400">Notifications when positions are closed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Daily Summary</Label>
                  <p className="text-sm text-gray-400">Daily performance summary email</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Weekly Report</Label>
                  <p className="text-sm text-gray-400">Weekly performance report</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Risk Alerts</Label>
                  <p className="text-sm text-gray-400">Alerts when risk limits are approached</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Polymarket API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="password"
                      value="pk_live_••••••••••••••••"
                      readOnly
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Edit
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">API Secret</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="password"
                      value="sk_live_••••••••••••••••"
                      readOnly
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Test Connection</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Add extra security to your account</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Login Notifications</Label>
                    <p className="text-sm text-gray-400">Get notified of new logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">API Access Logging</Label>
                    <p className="text-sm text-gray-400">Log all API access attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" className="w-full border-red-600 text-red-400">
                  Revoke All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
