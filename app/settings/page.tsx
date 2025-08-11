'use client';

import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { FilterForm } from "@/components/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {

  return (
    <Layout>
      <PageHeader title="Settings" subtitle="Configure your copy trading parameters and preferences" />
      
      <Tabs defaultValue="filter" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="filter" className="data-[state=active]:bg-green-600 text-white">
            Filter
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-green-600 text-white">
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="filter" className="mt-6">
          <FilterForm />
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
