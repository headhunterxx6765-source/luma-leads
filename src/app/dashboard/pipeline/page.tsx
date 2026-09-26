"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Kanban, Plus, Search, Filter, Users, Target,
  ArrowRight, Sparkles, MoreHorizontal, Edit, Trash2, Download
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CRM_STATUSES } from "@/lib/utils"

const mockLeads = [
  { id: "1", business_name: "Root Dental Clinic", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43210", website: "rootdental.com", rating: 4.5, review_count: 120, crm_status: "New" as const, objective_match: "High" },
  { id: "2", business_name: "Smile Dental Care", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43211", website: undefined, rating: 4.2, review_count: 45, crm_status: "Contacted" as const, objective_match: "High" },
  { id: "3", business_name: "Bright Teeth Dental", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43212", website: "brightteeth.in", rating: 4.7, review_count: 200, crm_status: "Follow Up" as const, objective_match: "Medium" },
  { id: "4", business_name: "Varanasi Dental Hub", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43213", website: undefined, rating: 3.8, review_count: 12, crm_status: "Interested" as const, objective_match: "High" },
  { id: "5", business_name: "Perfect Smile Clinic", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43214", website: "perfectsmile.com", rating: 4.9, review_count: 300, crm_status: "Meeting" as const, objective_match: "Medium" },
  { id: "6", business_name: "Dental Excellence", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43215", website: undefined, rating: 4.0, review_count: 30, crm_status: "Proposal" as const, objective_match: "Low" },
  { id: "7", business_name: "Family Dental Care", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43216", website: "familydental.in", rating: 4.6, review_count: 180, crm_status: "Won" as const, objective_match: "High" },
  { id: "8", business_name: "Modern Dentistry", category: "Dental Clinic", location: "Varanasi, UP", phone: "+91 98765 43217", website: undefined, rating: 3.5, review_count: 8, crm_status: "Lost" as const, objective_match: "Low" },
]

const statusColors = {
  New: "default",
  Contacted: "secondary",
  "Follow Up": "warning",
  Interested: "success",
  Meeting: "default",
  Proposal: "secondary",
  Won: "success",
  Lost: "destructive",
} as const

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Kanban board for Generation 1: Dental Clinics in Varanasi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Generation Context */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Generation: Dental Clinics in Varanasi</p>
              <p className="text-sm text-muted-foreground">gen-001 • 47 leads • Objectives: Businesses Without a Website, Low Review Count</p>
            </div>
            <Badge variant="success">Completed</Badge>
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowRight className="h-3 w-3" />
              Switch Generation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {CRM_STATUSES.map((status) => (
          <div key={status} className="min-w-[300px] max-w-[300px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <Badge variant={statusColors[status]} className="text-sm">
                {status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {mockLeads.filter(l => l.crm_status === status).length}
              </span>
            </div>
            <div className="bg-muted/30 rounded-lg p-2 min-h-[500px] space-y-3">
              {mockLeads.filter(l => l.crm_status === status).map((lead) => (
                <div key={lead.id} className="bg-card border border-border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium text-sm">{lead.business_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{lead.category} • {lead.location}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    {lead.phone && <span className="flex items-center gap-1">📞 {lead.phone}</span>}
                    {lead.website && <span className="flex items-center gap-1">🌐 {lead.website}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Match: {lead.objective_match}</Badge>
                    <span className="flex-1" />
                    <Badge variant="outline" className="text-xs">⭐ {lead.rating} ({lead.review_count})</Badge>
                  </div>
                </div>
              ))}
              {mockLeads.filter(l => l.crm_status === status).length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No leads in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend / Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Pipeline Flow</h4>
              <p className="text-sm text-muted-foreground">
                New → Contacted → Follow Up → Interested → Meeting → Proposal → Won/Lost
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Generation Isolation</h4>
              <p className="text-sm text-muted-foreground">
                Status changes only affect this generation. Other generations remain untouched.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Objective Match</h4>
              <p className="text-sm text-muted-foreground">
                High/Medium/Low based on selected search objectives. Helps prioritize outreach.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Notes & Tasks</h4>
              <p className="text-sm text-muted-foreground">
                Click a lead to add notes, create tasks, and view full details per generation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}