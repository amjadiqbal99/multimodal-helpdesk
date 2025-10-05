# Multimodal Helpdesk

A modern, AI-powered customer support platform built with Next.js 15, featuring intelligent ticket triage, automated classification, and AI-assisted reply generation.

## Features

### Core Functionality
- **Inbox Management** - Virtualized ticket list with bulk actions, filtering, and search
- **Multi-Channel Support** - Handle tickets from email, chat, phone, and social media
- **Priority & SLA Tracking** - Visual indicators for ticket priority and SLA risk
- **Threaded Conversations** - Chat-like message timeline with attachment support
- **Bulk Operations** - Assign, prioritize, or close multiple tickets at once

### AI-Powered Features
- **Smart Summarization** - Generate concise summaries of long ticket threads
- **Automatic Classification** - AI-powered priority and topic detection
- **Similar Ticket Search** - Find related tickets using semantic search
- **Reply Suggestions** - Generate contextual responses with tone control
- **PII Redaction** - Automatically detect and redact sensitive information

### Analytics & Insights
- **Performance Metrics** - Track open tickets, response times, and resolution rates
- **Volume Trends** - Visualize ticket patterns over time
- **Topic Analysis** - Identify common support issues

## Tech Stack

- **Framework** - Next.js 15 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS v4
- **UI Components** - shadcn/ui
- **Icons** - Lucide React
- **Charts** - Recharts
- **Virtualization** - @tanstack/react-virtual
- **Date Handling** - date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Mock Authentication

The app currently uses mock authentication for demo purposes:

- **Login Page** - `/auth/login` - Any email/password will work
- **Signup Page** - `/auth/signup` - Creates mock user accounts
- **Auto-redirect** - After login, you'll be redirected to `/inbox`

## Project Structure

\`\`\`
├── app/
│   ├── (app)/                    # Authenticated app routes
│   │   ├── inbox/                # Ticket inbox and detail views
│   │   ├── analytics/            # Analytics dashboard
│   │   └── settings/             # Settings page
│   ├── auth/                     # Authentication pages
│   ├── api/                      # API routes for AI features
│   └── layout.tsx                # Root layout
├── components/
│   ├── helpdesk/                 # Helpdesk-specific components
│   │   ├── app-sidebar.tsx       # Main navigation sidebar
│   │   ├── app-topbar.tsx        # Top navigation bar
│   │   ├── inbox-list.tsx        # Ticket list view
│   │   ├── ticket-card.tsx       # Individual ticket card
│   │   ├── ticket-detail.tsx     # Ticket detail view
│   │   └── ai-panel.tsx          # AI features panel
│   └── ui/                       # Reusable UI components (shadcn)
├── lib/
│   ├── mock.ts                   # Mock data for tickets and messages
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
└── scripts/                      # Database migration scripts (for future use)
\`\`\`

## Key Features Explained

### Inbox Filtering

The sidebar provides multiple filtering options:
- **Queue Filters** - All, Unassigned, My Tickets, Urgent
- **Channel Filters** - Email, Chat, Phone, Social
- **Search** - Global search with keyboard shortcut (⌘K)

### Ticket Detail View

Each ticket shows:
- Customer information and contact details
- Full message thread with timestamps
- Priority, status, and assignee controls
- Tags and metadata
- AI analysis panel

### AI Panel

The AI panel provides four main features:

1. **Analyze** - Summarize threads and classify tickets
2. **Similar Tickets** - Find related tickets with citations
3. **Generate Reply** - Create contextual responses with tone control
4. **PII Protection** - Toggle automatic PII redaction

### Analytics Dashboard

Track key metrics:
- Open tickets count
- Average first response time
- SLA risk percentage
- Resolution rate
- Ticket volume trends
- Top support topics

## Configuration

### Theme

The app supports light and dark modes. Toggle using the theme switcher in the top bar.

### Settings

Configure the following in `/settings`:
- **LLM Provider** - API keys for OpenAI, Anthropic, or Groq
- **Security** - PII redaction settings
- **Notifications** - Email and browser notification preferences

## Adding Real Database (Optional)

To connect a real database using Supabase:

1. Add Supabase integration from v0 Project Settings
2. Run the SQL scripts in the `/scripts` folder:
   - `01-create-tables.sql` - Creates tables for tickets, messages, and embeddings
   - `02-setup-rls.sql` - Sets up Row Level Security policies
   - `03-seed-data.sql` - Seeds initial data

3. Update authentication to use Supabase Auth (see commented code in auth pages)

## API Routes

The app includes API routes for AI features:

- `POST /api/ai/summarize` - Summarize ticket threads
- `POST /api/ai/classify` - Classify ticket priority and topics
- `POST /api/ai/suggest-reply` - Generate reply suggestions

These routes currently return mock data. To enable real AI features, add your LLM provider API key in settings.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Ticket Fields** - Update types in `lib/types.ts`
2. **New Filters** - Add to sidebar in `components/helpdesk/app-sidebar.tsx`
3. **New AI Features** - Create API route in `app/api/ai/` and add to AI panel
4. **New Analytics** - Add charts to `app/(app)/analytics/page.tsx`

## Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Email integration for automatic ticket creation
- [ ] Advanced search with filters and saved views
- [ ] Custom fields and ticket forms
- [ ] Automation rules and workflows
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] Multi-language support

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
