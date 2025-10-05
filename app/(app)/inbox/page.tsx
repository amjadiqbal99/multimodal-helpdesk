import { InboxList } from "@/components/helpdesk/inbox-list"
import { mockTickets } from "@/lib/mock"

export default function InboxPage() {
  return <InboxList tickets={mockTickets} />
}
