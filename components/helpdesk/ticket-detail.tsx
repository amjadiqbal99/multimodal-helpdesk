"use client"

import type { Ticket, Message } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, MessageSquare, Paperclip, ChevronDown, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { AIPanel } from "./ai-panel"

interface TicketDetailProps {
  ticket: Ticket
  messages: Message[]
}

const priorityColors = {
  P1: "bg-red-500/10 text-red-500 border-red-500/20",
  P2: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  P3: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  P4: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

const statusColors = {
  open: "bg-green-500/10 text-green-500 border-green-500/20",
  "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  closed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
}

export function TicketDetail({ ticket, messages }: TicketDetailProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())

  const toggleMessage = (messageId: string) => {
    const newExpanded = new Set(expandedMessages)
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId)
    } else {
      newExpanded.add(messageId)
    }
    setExpandedMessages(newExpanded)
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-semibold truncate">{ticket.subject}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{ticket.id}</span>
                <Badge variant="outline" className={statusColors[ticket.status]}>
                  {ticket.status}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className={priorityColors[ticket.priority]}>
                      {ticket.priority}
                      <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>P1 - Critical</DropdownMenuItem>
                    <DropdownMenuItem>P2 - High</DropdownMenuItem>
                    <DropdownMenuItem>P3 - Medium</DropdownMenuItem>
                    <DropdownMenuItem>P4 - Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {ticket.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{ticket.assignee.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{ticket.assignee}</span>
                  </div>
                ) : (
                  <Button variant="outline" size="sm">
                    Assign
                  </Button>
                )}

                {ticket.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <X className="ml-1 h-3 w-3 cursor-pointer" />
                  </Badge>
                ))}

                <Button variant="ghost" size="sm">
                  + Add tag
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Thread */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => {
            const isExpanded = expandedMessages.has(message.id)
            const isLong = message.text.length > 300

            return (
              <div key={message.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.author}</span>
                      {message.channel === "email" ? (
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm leading-relaxed">
                  {isLong && !isExpanded ? (
                    <>
                      {message.text.slice(0, 300)}...
                      <Button
                        variant="link"
                        size="sm"
                        className="ml-2 p-0 h-auto"
                        onClick={() => toggleMessage(message.id)}
                      >
                        Show more
                      </Button>
                    </>
                  ) : (
                    <>
                      {message.text}
                      {isLong && (
                        <Button
                          variant="link"
                          size="sm"
                          className="ml-2 p-0 h-auto"
                          onClick={() => toggleMessage(message.id)}
                        >
                          Show less
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.attachments.map((attachment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span>{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <AIPanel ticketId={ticket.id} messages={messages} />
    </div>
  )
}
