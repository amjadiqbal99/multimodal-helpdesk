"use client"

import type { Ticket } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, MessageSquare, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TicketCardProps {
  ticket: Ticket
  selected: boolean
  onToggle: () => void
}

const priorityColors = {
  P1: "bg-red-500/10 text-red-500 border-red-500/20",
  P2: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  P3: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  P4: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

export function TicketCard({ ticket, selected, onToggle }: TicketCardProps) {
  const timeUntilSLA = formatDistanceToNow(ticket.slaDueAt, { addSuffix: false })
  const isAtRisk = ticket.slaDueAt.getTime() - Date.now() < 4 * 60 * 60 * 1000 // Less than 4 hours

  return (
    <div className="flex gap-3 p-3">
      <Checkbox
        checked={selected}
        onCheckedChange={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start gap-2">
          {ticket.unread && <div className="mt-2 h-2 w-2 rounded-full bg-primary" />}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{ticket.subject}</h3>
            <p className="text-sm text-muted-foreground">{ticket.customer}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {ticket.channel === "email" ? (
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
          )}

          <Badge variant="outline" className={priorityColors[ticket.priority]}>
            {ticket.priority}
          </Badge>

          {isAtRisk && (
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
              <Clock className="mr-1 h-3 w-3" />
              {timeUntilSLA} left
            </Badge>
          )}

          {ticket.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}</span>
          {ticket.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">{ticket.assignee.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
