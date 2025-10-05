export type Priority = "P1" | "P2" | "P3" | "P4"
export type Channel = "email" | "slack"
export type TicketStatus = "open" | "in-progress" | "closed"

export interface Ticket {
  id: string
  subject: string
  customer: string
  customerEmail: string
  channel: Channel
  priority: Priority
  status: TicketStatus
  tags: string[]
  createdAt: Date
  updatedAt: Date
  slaDueAt: Date
  assignee?: string
  unread: boolean
}

export interface Message {
  id: string
  ticketId: string
  author: string
  channel: Channel
  text: string
  attachments?: { name: string; url: string }[]
  createdAt: Date
}

export interface SimilarTicket {
  id: string
  title: string
  score: number
  snippet: string
}

// Mock data
export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Unable to login to dashboard",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@company.com",
    channel: "email",
    priority: "P1",
    status: "open",
    tags: ["authentication", "urgent"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    slaDueAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    unread: true,
  },
  {
    id: "TKT-002",
    subject: "API rate limit exceeded",
    customer: "Mike Chen",
    customerEmail: "mike.chen@startup.io",
    channel: "slack",
    priority: "P2",
    status: "in-progress",
    tags: ["api", "rate-limit"],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    slaDueAt: new Date(Date.now() + 7 * 60 * 60 * 1000),
    assignee: "Alex Smith",
    unread: false,
  },
  {
    id: "TKT-003",
    subject: "Feature request: Dark mode support",
    customer: "Emma Wilson",
    customerEmail: "emma.w@design.co",
    channel: "email",
    priority: "P3",
    status: "open",
    tags: ["feature-request", "ui"],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    slaDueAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    unread: false,
  },
  {
    id: "TKT-004",
    subject: "Payment processing failed",
    customer: "David Brown",
    customerEmail: "david.b@shop.com",
    channel: "email",
    priority: "P1",
    status: "open",
    tags: ["payments", "urgent"],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
    slaDueAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    unread: true,
  },
  {
    id: "TKT-005",
    subject: "Webhook not receiving events",
    customer: "Lisa Anderson",
    customerEmail: "lisa.a@tech.com",
    channel: "slack",
    priority: "P2",
    status: "open",
    tags: ["webhooks", "integration"],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    slaDueAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    unread: false,
  },
]

export const mockMessages: Record<string, Message[]> = {
  "TKT-001": [
    {
      id: "MSG-001",
      ticketId: "TKT-001",
      author: "Sarah Johnson",
      channel: "email",
      text: "Hi, I've been trying to log into my dashboard for the past hour but keep getting an error message saying 'Invalid credentials' even though I'm sure my password is correct. I've tried resetting it twice but still can't get in. This is urgent as I need to access my reports for a meeting in 2 hours.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "MSG-002",
      ticketId: "TKT-001",
      author: "Support Bot",
      channel: "email",
      text: "Thank you for contacting support. Your ticket has been created and assigned ID TKT-001. A support agent will respond shortly.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 1000),
    },
  ],
  "TKT-002": [
    {
      id: "MSG-003",
      ticketId: "TKT-002",
      author: "Mike Chen",
      channel: "slack",
      text: "Hey team, our API calls are being rate limited. We're getting 429 errors on about 30% of requests. Our current plan should support 10k requests/hour but we're only at about 3k. Can you check if there's an issue?",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: "MSG-004",
      ticketId: "TKT-002",
      author: "Alex Smith",
      channel: "slack",
      text: "Thanks for reaching out! I'm looking into this now. Can you share which endpoint you're hitting and your API key (last 4 digits only)?",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: "MSG-005",
      ticketId: "TKT-002",
      author: "Mike Chen",
      channel: "slack",
      text: "We're hitting /api/v1/data/sync and the key ends in ...7x9K",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
  ],
  "TKT-003": [
    {
      id: "MSG-006",
      ticketId: "TKT-003",
      author: "Emma Wilson",
      channel: "email",
      text: "Hello! I love your product but would really appreciate a dark mode option. I work late hours and the bright interface strains my eyes. Would this be something you could add?",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ],
  "TKT-004": [
    {
      id: "MSG-007",
      ticketId: "TKT-004",
      author: "David Brown",
      channel: "email",
      text: "URGENT: Customer tried to complete checkout but payment failed with error code PAY_001. They're a high-value customer and this is the second time this has happened. Transaction ID: txn_abc123xyz. Please help ASAP!",
      attachments: [
        { name: "error-screenshot.png", url: "/placeholder.svg?height=200&width=300" },
        { name: "transaction-log.txt", url: "#" },
      ],
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
  ],
  "TKT-005": [
    {
      id: "MSG-008",
      ticketId: "TKT-005",
      author: "Lisa Anderson",
      channel: "slack",
      text: "Our webhook endpoint hasn't received any events for the past 3 hours. We have it configured for order.created and order.updated events. The endpoint is https://api.ourapp.com/webhooks/orders and it's definitely up and running.",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ],
}

export const mockSimilarTickets: SimilarTicket[] = [
  {
    id: "TKT-089",
    title: "Login issues after password reset",
    score: 0.92,
    snippet:
      "Customer was unable to login after resetting password. Issue was resolved by clearing browser cache and cookies.",
  },
  {
    id: "TKT-067",
    title: "Authentication error on dashboard",
    score: 0.87,
    snippet: "User experiencing authentication errors. Fixed by updating session token expiration settings.",
  },
  {
    id: "TKT-045",
    title: "Cannot access account after update",
    score: 0.81,
    snippet: "Account access issues resolved by verifying email and re-enabling 2FA.",
  },
]

export function redactPII(text: string): string {
  // Simple regex-based PII redaction
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL_REDACTED]")
    .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[PHONE_REDACTED]")
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_REDACTED]")
}
