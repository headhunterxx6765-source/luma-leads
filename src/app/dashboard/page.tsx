"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, Users, Target, LayoutDashboard, 
  Plus, Search, Database, ArrowUpRight,
  TrendingUp, Activity, Clock, CheckCircle
} from "lucide-react"
import Link from "next/link"
import { cn, formatDate, CRM_STATUSES } from "@/lib/utils"
import { useState, useEffect } from "react"

const mockGenerations = [
  {
    id: "1",
    generation_id: "gen-001",
    name: "Dental Clinics in Varanasi",
    business_type: "Dental Clinics",
    location: "Varanasi, Uttar Pradesh",
    requested_lead_count: 50,
    generated_lead_count: 47,
    objectives: ["Businesses Without a Website", "Low Review Count"],
    status: "completed",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "2",
    generation_id: "gen-002",
    name: "Restaurants in Kanpur",
    business_type: "Restaurants",
    location: "Kanpur, Uttar Pradesh",
    requested_lead_count: 50,
    generated_lead_count: 52,
    objectives: ["Businesses Without Online Booking"],
    status: "completed",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "3",
    generation_id: "gen-003",
    name: "Coaching Institutes in Lucknow",
    business_type: "Coaching Institutes",
    location: "Lucknow, Uttar Pradesh",
    requested_lead_count: 30,
    generated_lead_count: 28,
    objectives: ["AI Opportunity", "High Automation Potential"],
    custom_objective: "Institutes where I could apply for internship",
    status: "generating",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
]

const statusColors: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  completed: "success",
  generating: "warning",
  failed: "destructive",
  partial: "secondary",
} as const

export default function DashboardPage() {
  const { user } = useAuth()
  const [generations] = useState(mockGenerations)
  const [stats] = useState({
    totalGenerations: 12,
    totalLeads: 547,
    newLeads: 89,
    conversionRate: "12.4%",
  })

  const recentGenerations = generations.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.email?.split("@")[0] || "User"}! Here's what's happening with your leads.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/search">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Generation
            </Button>
          </Link>
          <Link href="/dashboard/generations">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGenerations}</div>
            <p className="text-xs text-muted-foreground">All time projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all generations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-muted-foreground">Status: New</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}</div>
            <p className="text-xs text-muted-foreground">Won / Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generations */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Recent Generations</h2>
          <p className="text-sm text-muted-foreground">Your latest lead generation projects</p>
        </div>
        <Link href="/dashboard/generations" className="text-sm font-medium text-primary hover:underline">
          View all <ArrowUpRight className="h-3 w-3 inline" />
        </Link>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Generation</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Niche & Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Leads</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Objectives</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentGenerations.map((gen) => (
              <tr key={gen.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">{gen.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{gen.generation_id}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">{gen.business_type}</div>
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
                  {formatDate(gen.created_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/generations/${gen.id}`} className="text-sm font-medium text-primary hover:underline">
                      Open
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Database className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Start New Search</h3>
                <p className="text-sm text-muted-foreground">Find leads with custom niche, location & objectives</p>
              </div>
            </div>
            <Link href="/dashboard/search">
              <Button className="mt-4 w-full gap-2" variant="outline">
                Create Generation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Database className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">View All Generations</h3>
                <p className="text-sm text-muted-foreground">Manage all your lead generation projects</p>
              </div>
            </div>
            <Link href="/dashboard/generations">
              <Button className="mt-4 w-full gap-2" variant="outline">
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Activity className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">CRM Pipeline</h3>
                <p className="text-sm text-muted-foreground">Track deals across all generations</p>
              </div>
            </div>
            <Link href="/dashboard/pipeline">
              <Button className="mt-4 w-full gap-2" variant="outline">
                Open Pipeline
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}