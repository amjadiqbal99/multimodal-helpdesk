import type React from "react"
import { AppSidebar } from "@/components/helpdesk/app-sidebar"
import { AppTopBar } from "@/components/helpdesk/app-topbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar />
        <main className="flex-1 overflow-aut```tsx file=\"app/(app)/layout.tsx"
import { AppSidebar } from "@/components/helpdesk/app-sidebar"
import { AppTopBar } from "@/components/helpdesk/app-topbar"
\
export default function AppLayout({ children }: { children: React.ReactNode }) {\
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}\
