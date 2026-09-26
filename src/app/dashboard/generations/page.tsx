"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Plus, Filter, Download, Database, 
  ArrowUpRight, Sparkles, ChevronDown, ChevronUp,
  MoreHorizontal, Edit, Trash2, Eye
} from "lucide-react"
import { cn, formatDate, formatDateTime } from "@/lib/utils"
import Link from "next/link"

const mockGenerations = [
  {
    id: "1",
    generation_id: "gen-001",
    name: "Dental Clinics in Varanasi",
    business_type: "Dental Clinics",
    custom_business_type: undefined,
    location: "Varanasi, Uttar Pradesh",
    requested_lead_count: 50,
    generated_lead_count: 47,
    objectives: ["Businesses Without a Website", "Low Review Count"],
    custom_objective: undefined,
    status: "completed",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "2",
    generation_id: "gen-002",
    name: "Restaurants in Kanpur",
    business_type: "Restaurants",
    custom_business_type: undefined,
    location: "Kanpur, Uttar Pradesh",
    requested_lead_count: 50,
    generated_lead_count: 52,
    objectives: ["Businesses Without Online Booking"],
    custom_objective: undefined,
    status: "completed",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "3",
    generation_id: "gen-003",
    name: "Coaching Institutes in Lucknow",
    business_type: "Coaching Institutes",
    custom_business_type: "Coaching institutes where I could apply for internship",
    location: "Lucknow, Uttar Pradesh",
    requested_lead_count: 30,
    generated_lead_count: 28,
    objectives: ["AI Opportunity", "High Automation Potential"],
    custom_objective: "Institutes where I could apply for internship",
    status: "generating",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "4",
    generation_id: "gen-004",
    name: "Gyms in Mumbai",
    business_type: "Gyms",
    custom_business_type: undefined,
    location: "Mumbai, Maharashtra",
    requested_lead_count: 40,
    generated_lead_count: 38,
    objectives: ["Businesses Without WhatsApp Presence", "Weak Google Business Profiles"],
    custom_objective: undefined,
    status: "completed",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "5",
    generation_id: "gen-005",
    name: "Real Estate Agents in Delhi",
    business_type: "Real Estate Agents",
    custom_business_type: undefined,
    location: "Delhi",
    requested_lead_count: 60,
    generated_lead_count: 55,
    objectives: ["General Business Leads"],
    custom_objective: undefined,
    status: "partial",
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
]

const statusColors = {
  completed: "success",
  generating: "warning",
  failed: "destructive",
  partial: "secondary",
} as const

export default function GenerationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const filteredGenerations = mockGenerations.filter(gen => {
    const matchesSearch = gen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gen.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gen.generation_id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || gen.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Generations</h1>
          <p className="text-muted-foreground mt-1">
            All your lead generation projects. Each generation is completely independent.
          </p>
        </div>
        <Link href="/dashboard/search">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Generation
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search generations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full sm:w-48">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="generating">Generating</option>
              <option value="partial">Partial</option>
              <option value="failed">Failed</option>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setViewMode("table")} aria-label="Table view">
                <Database className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setViewMode("cards")} aria-label="Card view">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-1.5 w-full bg-current rounded" />
                    <div className="h-1.5 w-full bg-current rounded" />
                    <div className="h-1.5 w-full bg-current rounded" />
                    <div className="h-1.5 w-full bg-current rounded" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generations List - Table View */}
      {viewMode === "table" && (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Generation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Niche & Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Leads</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Objectives</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredGenerations.map((gen) => (
                <tr key={gen.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-foreground">{gen.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{gen.generation_id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{gen.custom_business_type || gen.business_type}</div>
                    <div className="text-xs text-muted-foreground">{gen.location}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium">{gen.generated_lead_count} / {gen.requested_lead_count}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {gen.objectives.slice(0, 2).map((obj, i) => (
                        <Badge key={i} variant="outline" className="text-xs px-2 py-0.5">
                          {obj}
                        </Badge>
                      ))}
                      {gen.objectives.length > 2 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          +{gen.objectives.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={statusColors[gen.status]}>
                      {gen.status.charAt(0).toUpperCase() + gen.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {formatDateTime(gen.created_at)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/generations/${gen.id}`} className="text-sm font-medium text-primary hover:underline">
                        Open
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGenerations.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No generations found. <Link href="/dashboard/search" className="text-primary hover:underline">Create your first generation</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Generations List - Card View */}
      {viewMode === "cards" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGenerations.map((gen) => (
            <Card key={gen.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{gen.name}</CardTitle>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{gen.generation_id}</div>
                  </div>
                  <Badge variant={statusColors[gen.status]}>
                    {gen.status.charAt(0).toUpperCase() + gen.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>{gen.custom_business_type || gen.business_type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4" />{" "}
                  <span>{gen.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Leads: {gen.generated_lead_count} / {gen.requested_lead_count}</span>
                  <span className="text-sm font-medium text-primary">{gen.objectives.length} objectives</span>
                </div>
                <div className="pt-2 border-t flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatDateTime(gen.created_at)}</span>
                  <Link href={`/dashboard/generations/${gen.id}`} className="text-sm font-medium text-primary hover:underline">
                    Open <ArrowUpRight className="h-3 w-3 inline" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredGenerations.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No generations found. <Link href="/dashboard/search" className="text-primary hover:underline">Create your first generation</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}