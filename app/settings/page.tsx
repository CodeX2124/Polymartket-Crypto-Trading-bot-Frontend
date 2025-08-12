'use client';

import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import { FilterForm } from "@/components/settings-form"

export default function SettingsPage() {

  return (
    <Layout>
      <PageHeader title="Settings" subtitle="Configure your copy trading parameters and preferences" />      
      <FilterForm />      
    </Layout>
  )
}
