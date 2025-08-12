'use client';

import { Layout } from "@/components/layout"
import { PageHeader } from "@/components/page-header"
import AccountsForm from "@/components/accounts-form"


export default function AccountsPage() {

  return (
    <Layout>
      <PageHeader title="Accounts" subtitle="Accounts management" />      
      <AccountsForm />      
    </Layout>
  )
}
