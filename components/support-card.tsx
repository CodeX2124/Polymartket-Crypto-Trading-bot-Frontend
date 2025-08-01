import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SupportCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link?: string
}

export function SupportCard({ title, description, icon, link }: SupportCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-600/20 text-green-500">{icon}</div>
          <CardTitle className="text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{description}</p>
        {link && (
          <Button variant="outline" className="w-full border-gray-600 text-gray-300">
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
