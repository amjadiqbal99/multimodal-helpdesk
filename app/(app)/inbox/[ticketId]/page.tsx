import { notFound } from "next/navigation"
import { mockTickets, mockMessages } from "@/lib/mock"
import { TicketDetail } from "@/components/helpdesk/ticket-detail"

export default function TicketDetailPage({ params }: { params: { ticketId: string } }) {
  const ticket = mockTickets.find((t) => t.id === params.ticketId)
  const messages = mockMessages[params.ticketId] || []

  if (!ticket) {
    notFound()
  }

  return <TicketDetail ticket={ticket} messages={messages} />
}
