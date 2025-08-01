import { Sidebar } from "@/components/sidebar"
import type React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
