"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, Sparkles, Bot, MessageSquare, 
  Search, Database, Users, Target,
  Loader2, Copy, Check, X
} from "lucide-react"
import { cn } from "@/lib/utils"

const suggestedPrompts = [
  "Find 50 dental clinics in Varanasi",
  "Find restaurants in Kanpur that may need online booking",
  "Find coaching institutes where I could apply for an internship",
  "Show me my latest lead generation projects",
  "Open the leads from my latest search",
  "Show leads that are still new",
  "Create a search for businesses without websites",
]

const mockMessages = [
  { role: "assistant", content: "Hi! I'm Luma AI. I can help you find leads, manage generations, and navigate your CRM. What would you like to do?", timestamp: new Date() },
  { role: "user", content: "Find 25 gyms in Mumbai without WhatsApp", timestamp: new Date(Date.now() - 300000) },
  { role: "assistant", content: "I'll create a new generation for gyms in Mumbai with the 'No WhatsApp Presence' objective. This will be an independent project.", timestamp: new Date(Date.now() - 240000) },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    
    const userMessage = { role: "user" as const, content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setShowSuggestions(false)
    
    const currentInput = input
    setInput("")
    setLoading(true)
    
    // Simulate AI response
    await new Promise(r => setTimeout(r, 1000))
    
    let response = "I understand. Let me help you with that."
    if (currentInput.toLowerCase().includes("find")) {
      response = `I'll create a new generation for that search. It will be an independent project with its own CSV, pipeline, and analytics. Would you like me to proceed with the preview?`
    } else if (currentInput.toLowerCase().includes("show") || currentInput.toLowerCase().includes("list")) {
      response = "Here are your recent generations: 1) Dental Clinics in Varanasi (47 leads), 2) Restaurants in Kanpur (52 leads), 3) Coaching Institutes in Lucknow (28 leads). Which would you like to open?"
    } else if (currentInput.toLowerCase().includes("pipeline") || currentInput.toLowerCase().includes("crm")) {
      response = "Opening CRM Pipeline for your selected generation. You can filter by status, add notes, and create tasks."
    }
    
    setMessages(prev => [...prev, { role: "assistant" as const, content: response, timestamp: new Date() }])
    setLoading(false)
  }

  const usePrompt = (prompt: string) => {
    setInput(prompt)
    handleSend()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          Luma AI Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Chat with your lead generation assistant. Create searches, manage generations, navigate CRM.
        </p>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {msg.role === "user" ? (
                    <span className="text-xs font-medium">{msg.content.slice(0,1).toUpperCase()}</span>
                  ) : (
                    <Sparkles className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-br-none" 
                    : "bg-muted rounded-bl-none"
                )}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground/70">
                    <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {msg.role === "assistant" && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => navigator.clipboard.writeText(msg.content)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-2 rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{animationDelay: '0ms'}} />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{animationDelay: '150ms'}} />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          {showSuggestions && messages.length <= 1 && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <p className="text-xs text-muted-foreground">Suggested prompts:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 6).map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => usePrompt(prompt)}
                    className="whitespace-nowrap"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Ask Luma AI anything..."
                disabled={loading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || loading} className="gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full gap-2" variant="outline" onClick={() => usePrompt("Create a new lead generation search")}>
              <Search className="h-4 w-4" />
              New Search
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Start a new generation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full gap-2" variant="outline" onClick={() => usePrompt("Show my latest generations")}>
              <Database className="h-4 w-4" />
              My Generations
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">View all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full gap-2" variant="outline" onClick={() => usePrompt("Open CRM pipeline")}>
              <Users className="h-4 w-4" />
              CRM Pipeline
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Manage lead statuses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full gap-2" variant="outline" onClick={() => usePrompt("Find businesses without websites")}>
              <Target className="h-4 w-4" />
              Opportunity Search
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Smart opportunity engine</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}