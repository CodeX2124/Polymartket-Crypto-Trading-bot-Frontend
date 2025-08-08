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
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"
import { useTradeSettings } from "@/hooks/useTradeSettingContext"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {

  const { settings, toggleSetting, updateRangeValues, OrderSettings, setSettings } = useTradeSettings();

  return (
    <Layout>
      <PageHeader title="Settings" subtitle="Configure your copy trading parameters and preferences" />
      
      <Tabs defaultValue="filter" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="filter" className="data-[state=active]:bg-green-600 text-white">
            Filter
          </TabsTrigger>
          <TabsTrigger value="myorder" className="data-[state=active]:bg-green-600 text-white">
            My Order
          </TabsTrigger>
          <TabsTrigger value="limitation" className="data-[state=active]:bg-green-600 text-white">
            Limitation
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-green-600 text-white">
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="filter" className="mt-6">
          <FilterForm />
        </TabsContent>

        <TabsContent value="myorder" className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">My Order Size Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-1/2 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="text-white text-[20px]">Buy Order Size : </div>
                  <Input className="w-[150px]"
                    value={settings.buy.copyOrderSize.size}
                    onChange={(e) => OrderSettings('buy', 'copyOrderSize', {size: e.target.value})}
                  ></Input>
                </div>
                <RadioGroup 
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="buy-percentage"
                      checked={settings.buy.copyOrderSize.type == 'percentage'} 
                      onClick={() => OrderSettings('buy', 'copyOrderSize', {type: 'percentage'})} />
                    <Label htmlFor="buy-percentage">Copying Trade by Percentage(%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="buy-fixed"
                      checked={settings.buy.copyOrderSize.type == 'amount'}  
                      onClick={() => OrderSettings('buy', 'copyOrderSize', {type: 'amount'})}
                    />
                    <Label htmlFor="buy-fixed">Copying Trade with fixed amount($)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="w-1/2 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="text-white text-[20px]">Sell Order Size : </div>
                  <Input className="w-[150px]"
                    value={settings.sell.copyOrderSize.size}
                    onChange={(e) => OrderSettings('sell', 'copyOrderSize', {size: e.target.value})}
                  ></Input>
                </div>
                <RadioGroup 
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="sell-percentage"
                      checked={settings.sell.copyOrderSize.type == 'percentage'}  
                      onClick={() => OrderSettings('sell', 'copyOrderSize', {type: 'percentage'})} />
                    <Label htmlFor="sell-percentage">Copying Trade by Percentage(%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="sell-fixed"
                      checked={settings.sell.copyOrderSize.type == 'amount'}  
                      onClick={() => OrderSettings('sell', 'copyOrderSize', {type: 'amount'})}
                    />
                    <Label htmlFor="sell-fixed">Copying Trade with fixed amount(share)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limitation" className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Limitation Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
              <div className="flex">
                <div className="w-1/2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-white text-[20px]">Buy Order: </div>
                    <Input className="w-[150px]"
                      value={settings.buy.limitOrderSize.size}
                      onChange={(e) => OrderSettings('buy', 'limitOrderSize', {size: e.target.value})}
                    ></Input>
                  </div>
                  <RadioGroup 
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="buy-specific"
                        checked={settings.buy.limitOrderSize.type == 'specific'} 
                        onClick={() => OrderSettings('buy', 'limitOrderSize', {type: 'specific'})} />
                      <Label htmlFor="buy-specific">Not higher than specific price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="original" id="buy-original"
                        checked={settings.buy.limitOrderSize.type == 'original'} 
                        onClick={() => OrderSettings('buy', 'limitOrderSize', {type: 'original'})}
                      />
                      <Label htmlFor="buy-original">Allow it to be 2-3% higher than original trade price</Label>
                    </div>
                  </RadioGroup>                  
                </div>
                <div className="w-1/2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-white text-[20px]">Sell Order: </div>
                    <Input className="w-[150px]"
                      value={settings.sell.limitOrderSize.size}
                      onChange={(e) => OrderSettings('sell', 'limitOrderSize', {size: e.target.value})}
                    ></Input>
                  </div>
                  <RadioGroup 
                    className="space-y-2"                    
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="sell-specific"
                        checked={settings.sell.limitOrderSize.type == 'specific'}
                        onClick={() => OrderSettings('sell', 'limitOrderSize', {type: 'specific'})} />
                      <Label htmlFor="sell-specific">Not lower than specific price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="original" id="sell-original"
                        checked={settings.sell.limitOrderSize.type == 'original'}
                        onClick={() => OrderSettings('sell', 'limitOrderSize', {type: 'original'})}
                      />
                      <Label htmlFor="sell-original">Allow it to be 2-3% lower than original trade price</Label>
                    </div>
                  </RadioGroup>                  
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <Input type="checkbox" className="w-[20px]"
                    checked={settings.byMaxAmount}
                    onChange={(e) => setSettings(prev => ({...prev, byMaxAmount: e.target.checked}))}
                  ></Input>
                  <div className="text-white text-[20px]">Max Amount per Market : </div>
                  <Input className="w-[150px]"
                    value={settings.maxAmount}
                    onChange={(e) => setSettings(prev => ({...prev, maxAmount: e.target.value}))}
                  ></Input> 
                </div>               
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
