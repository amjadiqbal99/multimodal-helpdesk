"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Shield, Bell } from "lucide-react"

export default function SettingsPage() {
  const [piiRedaction, setPiiRedaction] = useState(true)
  const [autoTriage, setAutoTriage] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your helpdesk configuration</p>
      </div>

      <Tabs defaultValue="llm" className="w-full">
        <TabsList>
          <TabsTrigger value="llm">LLM Provider</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="llm" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <CardTitle>API Keys</CardTitle>
              </div>
              <CardDescription>Configure your LLM provider API keys for AI features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input id="openai-key" type="password" placeholder="sk-..." />
                <p className="text-xs text-muted-foreground">
                  Used for summarization, classification, and reply generation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="embedding-key">Embedding Model Key</Label>
                <Input id="embedding-key" type="password" placeholder="Optional: for semantic search" />
                <p className="text-xs text-muted-foreground">
                  Required for finding similar tickets using vector embeddings
                </p>
              </div>

              <Button>Save API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>Control how sensitive data is handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pii-redaction">PII Redaction</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically mask emails, phone numbers, and SSNs before sending to LLM
                  </p>
                </div>
                <Switch id="pii-redaction" checked={piiRedaction} onCheckedChange={setPiiRedaction} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-triage">Auto-Triage</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically classify priority and severity for new tickets
                  </p>
                </div>
                <Switch id="auto-triage" checked={autoTriage} onCheckedChange={setAutoTriage} />
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-2">Data Retention</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Ticket data is retained for 90 days. Closed tickets are archived after 30 days.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Configure Retention Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email alerts for new tickets and mentions</p>
                </div>
                <Switch id="email-notif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="new-tickets" defaultChecked className="rounded" />
                    <Label htmlFor="new-tickets" className="font-normal">
                      New tickets assigned to me
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="mentions" defaultChecked className="rounded" />
                    <Label htmlFor="mentions" className="font-normal">
                      When I'm mentioned in a ticket
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="sla-risk" defaultChecked className="rounded" />
                    <Label htmlFor="sla-risk" className="font-normal">
                      SLA at risk alerts
                    </Label>
                  </div>
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
