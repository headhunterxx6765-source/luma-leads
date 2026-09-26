"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileSpreadsheet, Globe, Database, CheckCircle, 
  XCircle, Loader2, Link2, ExternalLink,
  Settings, Plus, Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const integrations = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Export generations to Google Sheets. One worksheet per generation.",
    icon: FileSpreadsheet,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
    connected: false,
    features: [
      "Separate worksheet per generation",
      "Auto-sync on generation complete",
      "Custom column mapping",
      "Export history tracking"
    ]
  },
  {
    id: "google-maps",
    name: "Google Maps / Places",
    description: "Search public business listings for lead discovery.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    connected: true,
    features: [
      "Nearby search & text search",
      "Place details & photos",
      "Business hours & reviews",
      "Rate limit management"
    ]
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Database, authentication, and realtime subscriptions.",
    icon: Database,
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
    connected: true,
    features: [
      "PostgreSQL database",
      "Row-level security",
      "Auth (email/password, OAuth)",
      "Realtime subscriptions"
    ]
  },
]

export default function IntegrationsPage() {
  const [sheetsConnected, setSheetsConnected] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (id: string) => {
    setConnecting(id)
    await new Promise(r => setTimeout(r, 2000))
    if (id === "google-sheets") setSheetsConnected(true)
    setConnecting(null)
  }

  const handleDisconnect = (id: string) => {
    if (id === "google-sheets") setSheetsConnected(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Integrations
        </h1>
        <p className="text-muted-foreground mt-1">
          Connect external services to enhance your lead generation workflow
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", integration.bg)}>
                  <integration.icon className={cn("h-6 w-6", integration.color)} />
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  integration.connected ? "border-green-500 bg-green-500" : "border-border"
                )}>
                  {integration.connected && <CheckCircle className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
              <CardTitle>{integration.name}</CardTitle>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {integration.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t flex gap-2">
                {integration.connected ? (
                  <>
                    <Button variant="outline" className="flex-1 gap-1" onClick={() => handleDisconnect(integration.id)}>
                      <XCircle className="h-4 w-4" />
                      Disconnect
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={() => handleConnect(integration.id)}
                    disabled={connecting === integration.id}
                  >
                    {connecting === integration.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Google Sheets Setup Guide */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Google Sheets Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            To enable Google Sheets export, you'll need to set up a Google Cloud project and configure OAuth credentials.
          </p>
          <div className="space-y-3">
            {[
              "Create a Google Cloud Project at console.cloud.google.com",
              "Enable Google Sheets API and Google Drive API",
              "Create OAuth 2.0 credentials (Web application type)",
              "Add authorized redirect URI: {your-domain}/api/auth/callback/google",
              "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env",
              "Configure Supabase secrets for server-side token storage"
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm mt-0.5">{step}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="gap-2" onClick={() => window.open("https://console.cloud.google.com", "_blank")}>
            <ExternalLink className="h-4 w-4" />
            Open Google Cloud Console
          </Button>
        </CardContent>
      </Card>

      {/* Architecture Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Integration Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Generation Isolation:</strong> Every integration respects the generation/batch boundary. Google Sheets creates one worksheet per generation. Exports never combine multiple generations.</p>
          <p><strong>Server-Side Secrets:</strong> All API keys and tokens are stored server-side. Never exposed to the client.</p>
          <p><strong>Secure OAuth:</strong> User tokens encrypted in Supabase. Automatic refresh handled by backend.</p>
          <p><strong>Audit Trail:</strong> Every export/sync logged with generation_id, timestamp, rows, status.</p>
        </CardContent>
      </Card>
    </div>
  )
}