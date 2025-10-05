"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Ticket } from "@/lib/types"
import { TicketCard } from "./ticket-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, UserPlus, CheckCircle, AlertCircle } from "lucide-react"

interface InboxListProps {
  tickets: Ticket[]
}

export function InboxList({ tickets }: InboxListProps) {
  const pathname = usePathname()
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set())

  const toggleTicket = (ticketId: string) => {
    const newSelected = new Set(selectedTickets)
    if (newSelected.has(ticketId)) {
      newSelected.delete(ticketId)
    } else {
      newSelected.add(ticketId)
    }
    setSelectedTickets(newSelected)
  }

  const toggleAll = () => {
    if (selectedTickets.size === tickets.length) {
      setSelectedTickets(new Set())
    } else {
      setSelectedTickets(new Set(tickets.map((t) => t.id)))
    }
  }

  const hasSelection = selectedTickets.size > 0

  return (
    <div className="flex h-full">
      {/* Ticket List */}
      <div className="flex w-full flex-col border-r border-border lg:w-96">
        {/* Bulk Actions Bar */}
        {hasSelection && (
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 p-3">
            <span className="text-sm text-muted-foreground">{selectedTickets.size} selected</span>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Alex Smith</DropdownMenuItem>
                  <DropdownMenuItem>Sarah Johnson</DropdownMenuItem>
                  <DropdownMenuItem>Mike Chen</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Priority
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>P1 - Critical</DropdownMenuItem>
                  <DropdownMenuItem>P2 - High</DropdownMenuItem>
                  <DropdownMenuItem>P3 - Medium</DropdownMenuItem>
                  <DropdownMenuItem>P4 - Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        )}

        {/* List Header */}
        <div className="flex items-center gap-3 border-b border-border p-3">
          <Checkbox checked={selectedTickets.size === tickets.length} onCheckedChange={toggleAll} />
          <span className="text-sm font-medium">
            {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Ticket List */}
        <div className="flex-1 overflow-auto">
          {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/inbox/${ticket.id}`}>
              <div className="border-b border-border hover:bg-accent/50 transition-colors">
                <TicketCard
                  ticket={ticket}
                  selected={selectedTickets.has(ticket.id)}
                  onToggle={() => toggleTicket(ticket.id)}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State for Detail View */}
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <div className="text-center">
          <p className="text-muted-foreground">Select a ticket to view details</p>
        </div>
      </div>
    </div>
  )
}
