"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Inbox, Clock, User, AlertCircle, Mail, MessageSquare, Tag, Calendar, ChevronDown, Menu, X } from "lucide-react"

const queues = [
  { name: "All", href: "/inbox", icon: Inbox, count: 5 },
  { name: "Open", href: "/inbox?status=open", icon: Clock, count: 4 },
  { name: "My Tickets", href: "/inbox?assignee=me", icon: User, count: 1 },
  { name: "High Priority", href: "/inbox?priority=P1", icon: AlertCircle, count: 2 },
  { name: "SLA Risk", href: "/inbox?sla=risk", icon: Clock, count: 2 },
]

const filters = [
  { name: "Email", icon: Mail, value: "email" },
  { name: "Slack", icon: MessageSquare, value: "slack" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5" />
          <span className="font-semibold">Helpdesk</span>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Queues</h3>
            <div className="space-y-1">
              {queues.map((queue) => {
                const Icon = queue.icon
                const isActive = pathname === queue.href || pathname.startsWith(queue.href)
                return (
                  <Link key={queue.name} href={queue.href}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start gap-2", isActive && "bg-accent text-accent-foreground")}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{queue.name}</span>
                      {queue.count > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {queue.count}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</h3>
            <div className="space-y-1">
              {filters.map((filter) => {
                const Icon = filter.icon
                return (
                  <Button key={filter.name} variant="ghost" className="w-full justify-start gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{filter.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tag className="h-4 w-4" />
              <span className="flex-1 text-left">Tags</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              <span className="flex-1 text-left">Date Range</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card lg:block">{sidebarContent}</aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}
