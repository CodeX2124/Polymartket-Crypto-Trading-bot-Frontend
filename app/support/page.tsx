import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { SupportCard } from "@/components/support-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, MessageCircle, Video, HelpCircle, Mail, Phone } from "lucide-react"

export default function SupportPage() {
  return (
    <Layout>
      <PageHeader title="Support Center" subtitle="Get help and learn how to use PolyTrade effectively" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <SupportCard
          title="Getting Started Guide"
          description="Learn the basics of copy trading and how to set up your first master trader."
          icon={<BookOpen className="h-6 w-6" />}
          link="/guide/getting-started"
        />
        <SupportCard
          title="Copy Trading Tutorial"
          description="Step-by-step tutorial on how to copy trades from successful masters."
          icon={<Video className="h-6 w-6" />}
          link="/guide/copy-trading"
        />
        <SupportCard
          title="Risk Management"
          description="Best practices for managing risk and setting appropriate position sizes."
          icon={<HelpCircle className="h-6 w-6" />}
          link="/guide/risk-management"
        />
        <SupportCard
          title="Master Selection"
          description="How to analyze and choose the best masters to follow for your strategy."
          icon={<BookOpen className="h-6 w-6" />}
          link="/guide/master-selection"
        />
        <SupportCard
          title="API Integration"
          description="Technical documentation for integrating with Polymarket API."
          icon={<BookOpen className="h-6 w-6" />}
          link="/guide/api-integration"
        />
        <SupportCard
          title="Troubleshooting"
          description="Common issues and solutions for copy trading problems."
          icon={<HelpCircle className="h-6 w-6" />}
          link="/guide/troubleshooting"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b border-gray-700 pb-4">
              <h4 className="font-medium text-white mb-2">How does copy trading work?</h4>
              <p className="text-gray-400 text-sm">
                Copy trading automatically replicates the trades of successful masters. When a master places a trade,
                our system automatically places a proportional trade in your account based on your settings.
              </p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h4 className="font-medium text-white mb-2">How do I choose the right masters?</h4>
              <p className="text-gray-400 text-sm">
                Look for masters with consistent win rates, positive PnL, and trading styles that match your risk
                tolerance. Check their historical performance and the markets they specialize in.
              </p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h4 className="font-medium text-white mb-2">Can I set position size limits?</h4>
              <p className="text-gray-400 text-sm">
                Yes, you can set maximum position sizes, copy percentages, and risk limits in the Settings page to
                control your exposure.
              </p>
            </div>
            <div className="pb-4">
              <h4 className="font-medium text-white mb-2">What fees are involved?</h4>
              <p className="text-gray-400 text-sm">
                PolyTrade charges a small performance fee on profitable trades. There are no subscription fees or hidden
                costs. You only pay when you make money.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subject</label>
              <Input placeholder="What can we help you with?" className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <Textarea
                placeholder="Describe your issue or question..."
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </Button>

            <div className="border-t border-gray-700 pt-4 space-y-3">
              <h4 className="font-medium text-white">Other Ways to Reach Us</h4>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@polytrade.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Live Chat (9 AM - 6 PM EST)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
