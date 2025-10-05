import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Inbox, Zap, BarChart3, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="h-6 w-6" />
              <span className="text-lg font-semibold">Helpdesk</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            AI-Powered Customer Support
          </h1>
          <p className="mb-12 text-pretty text-lg text-muted-foreground sm:text-xl">
            Automatically triage, summarize, and respond to customer tickets with intelligent AI assistance. Built for
            modern support teams.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Inbox className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">Unified Inbox</h3>
            <p className="text-sm text-muted-foreground">Email and Slack threads in one place</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">Auto-Triage</h3>
            <p className="text-sm text-muted-foreground">AI classifies priority and severity</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">Smart Analytics</h3>
            <p className="text-sm text-muted-foreground">Track SLAs and response times</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">PII Protection</h3>
            <p className="text-sm text-muted-foreground">Automatic redaction of sensitive data</p>
          </div>
        </div>
      </main>
    </div>
  )
}
