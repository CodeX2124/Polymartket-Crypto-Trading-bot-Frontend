import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsForm() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Copy Trading Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="api-key" className="text-gray-300">
              API Key
            </Label>
            <Input id="api-key" placeholder="Enter your API key" className="bg-gray-700 border-gray-600 text-white" />
          </div>

          <div>
            <Label htmlFor="api-secret" className="text-gray-300">
              API Secret
            </Label>
            <Input
              id="api-secret"
              type="password"
              placeholder="Enter your API secret"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">General Settings</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-copy" className="text-gray-300">
              Auto-copy trades
            </Label>
            <Switch id="auto-copy" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-gray-300">
              Enable notifications
            </Label>
            <Switch id="notifications" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-position" className="text-gray-300">
              Maximum position size
            </Label>
            <div className="flex items-center gap-4">
              <Slider defaultValue={[500]} max={2000} step={100} className="flex-1" />
              <span className="text-white min-w-[60px] text-right">$500</span>
            </div>
          </div>

          <div>
            <Label htmlFor="risk-level" className="text-gray-300">
              Risk Level
            </Label>
            <Select>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Master Settings</h3>

          <div className="space-y-2">
            <Label htmlFor="copy-percentage" className="text-gray-300">
              Copy percentage (% of master's trade)
            </Label>
            <div className="flex items-center gap-4">
              <Slider defaultValue={[50]} max={100} step={5} className="flex-1" />
              <span className="text-white min-w-[60px] text-right">50%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-masters" className="text-gray-300">
              Maximum masters to follow
            </Label>
            <div className="flex items-center gap-4">
              <Slider defaultValue={[5]} max={20} step={1} className="flex-1" />
              <span className="text-white min-w-[60px] text-right">5</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
