"use client"

import { useState } from "react"
import type { Message } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, FileText, TagIcon, Copy, Send, Loader2 } from "lucide-react"
import { mockSimilarTickets } from "@/lib/mock"

interface AIPanelProps {
  ticketId: string
  messages: Message[]
}

export function AIPanel({ ticketId, messages }: AIPanelProps) {
  const [summary, setSummary] = useState("")
  const [classification, setClassification] = useState<{ priority: string; severity: string; topics: string[] } | null>(
    null,
  )
  const [draftReply, setDraftReply] = useState("")
  const [tone, setTone] = useState("friendly")
  const [includeCitations, setIncludeCitations] = useState(true)
  const [piiRedaction, setPiiRedaction] = useState(true)
  const [selectedSimilar, setSelectedSimilar] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<string | null>(null)

  const handleSummarize = async () => {
    setLoading("summarize")
    // TODO: Call real API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSummary(
      "Customer is unable to login to their dashboard despite multiple password reset attempts. They report receiving 'Invalid credentials' error. This is urgent as they need access for an upcoming meeting in 2 hours.",
    )
    setLoading(null)
  }

  const handleClassify = async () => {
    setLoading("classify")
    // TODO: Call real API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setClassification({
      priority: "P1",
      severity: "Critical",
      topics: ["authentication", "login", "urgent"],
    })
    setLoading(null)
  }

  const handleGenerateReply = async () => {
    setLoading("reply")
    // TODO: Call real API
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setDraftReply(
      `Hi Sarah,\n\nThank you for reaching out. I understand how frustrating login issues can be, especially when you have an important meeting coming up.\n\nI've reviewed your account and found that there was a temporary issue with our authentication service that may have affected your login attempts. I've reset your session on our end.\n\nPlease try the following steps:\n1. Clear your browser cache and cookies\n2. Use the password reset link I've sent to your email\n3. Try logging in with the new password\n\nIf you're still experiencing issues, please let me know immediately and I'll escalate this to our engineering team.\n\nBest regards,\nAlex`,
    )
    setLoading(null)
  }

  const toggleSimilar = (id: string) => {
    const newSelected = new Set(selectedSimilar)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedSimilar(newSelected)
  }

  return (
    <div className="hidden lg:flex w-96 flex-col border-l border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="reply">Reply</TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="p-4 space-y-4">
            {/* Summarize */}
            <div className="space-y-2">
              <Button onClick={handleSummarize} disabled={loading === "summarize"} className="w-full">
                {loading === "summarize" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Summarize Thread
                  </>
                )}
              </Button>
              {summary && (
                <div className="rounded-lg border border-border bg-muted p-3 text-sm leading-relaxed">{summary}</div>
              )}
            </div>

            {/* Classify */}
            <div className="space-y-2">
              <Button
                onClick={handleClassify}
                disabled={loading === "classify"}
                variant="outline"
                className="w-full bg-transparent"
              >
                {loading === "classify" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Classifying...
                  </>
                ) : (
                  <>
                    <TagIcon className="mr-2 h-4 w-4" />
                    Classify Ticket
                  </>
                )}
              </Button>
              {classification && (
                <div className="rounded-lg border border-border bg-muted p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Priority:</span>
                    <Badge variant="outline">{classification.priority}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Severity:</span>
                    <Badge variant="outline">{classification.severity}</Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Topics:</span>
                    <div className="flex flex-wrap gap-1">
                      {classification.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Similar Tickets */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Similar Tickets</h3>
              <div className="space-y-2">
                {mockSimilarTickets.map((similar) => (
                  <div key={similar.id} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={selectedSimilar.has(similar.id)}
                        onCheckedChange={() => toggleSimilar(similar.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium truncate">{similar.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(similar.score * 100)}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{similar.snippet}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reply" className="p-4 space-y-4">
            {/* Tone Selector */}
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="citations" className="text-sm">
                  Include citations
                </Label>
                <Switch id="citations" checked={includeCitations} onCheckedChange={setIncludeCitations} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pii" className="text-sm">
                  PII redaction
                </Label>
                <Switch id="pii" checked={piiRedaction} onCheckedChange={setPiiRedaction} />
              </div>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerateReply} disabled={loading === "reply"} className="w-full">
              {loading === "reply" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Reply
                </>
              )}
            </Button>

            {/* Draft Reply */}
            {draftReply && (
              <div className="space-y-2">
                <Label>Draft Reply</Label>
                <Textarea value={draftReply} onChange={(e) => setDraftReply(e.target.value)} rows={12} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button size="sm" className="flex-1" disabled>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
