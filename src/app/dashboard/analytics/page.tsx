"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, Users, Target, DollarSign,
  BarChart3, PieChart, Activity, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Generations", value: "12", change: "+2 this month", icon: Sparkles, color: "text-primary" },
  { label: "Total Leads", value: "547", change: "+89 this month", icon: Users, color: "text-blue-500" },
  { label: "Conversion Rate", value: "12.4%", change: "+1.2% vs last month", icon: Target, color: "text-green-500" },
  { label: "Avg Leads/Gen", value: "45.6", change: "Target: 50", icon: TrendingUp, color: "text-orange-500" },
]

const nicheData = [
  { name: "Dental Clinics", leads: 47, conversions: 6, color: "#3b82f6" },
  { name: "Restaurants", leads: 52, conversions: 4, color: "#ef4444" },
  { name: "Coaching Institutes", leads: 28, conversions: 3, color: "#22c55e" },
  { name: "Gyms", leads: 38, conversions: 5, color: "#f59e0b" },
  { name: "Real Estate", leads: 55, conversions: 7, color: "#8b5cf6" },
  { name: "Others", leads: 127, conversions: 12, color: "#6b7280" },
]

const monthlyData = [
  { month: "Jan", generations: 2, leads: 85 },
  { month: "Feb", generations: 3, leads: 112 },
  { month: "Mar", generations: 1, leads: 47 },
  { month: "Apr", generations: 2, leads: 90 },
  { month: "May", generations: 2, leads: 98 },
  { month: "Jun", generations: 2, leads: 115 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your lead generation performance across all generations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leads by Niche */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Business Niche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nicheData.map((niche, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{niche.name}</span>
                    <span className="text-muted-foreground">{niche.leads} leads • {niche.conversions} won</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(niche.leads / 127) * 100}%`,
                        backgroundColor: niche.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Generation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-muted-foreground">{month.month}</span>
                  <div className="flex-1 h-8 bg-muted rounded-full relative overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(month.leads / 115) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 text-sm font-medium text-right">{month.leads} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Conversion */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { stage: "New Leads", count: 89, color: "#6b7280" },
                { stage: "Contacted", count: 67, color: "#3b82f6" },
                { stage: "Follow Up", count: 45, color: "#8b5cf6" },
                { stage: "Interested", count: 32, color: "#22c55e" },
                { stage: "Meeting", count: 18, color: "#f59e0b" },
                { stage: "Proposal", count: 12, color: "#ef4444" },
                { stage: "Won", count: 8, color: "#22c55e" },
              ].map((stage, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-32 text-sm font-medium">{stage.stage}</span>
                  <div className="flex-1 h-8 bg-muted rounded-full relative overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stage.count / 89) * 100}%`,
                        backgroundColor: stage.color 
                      }}
                    />
                  </div>
                  <span className="w-16 text-sm font-medium text-right">{stage.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generation Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generation Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="pb-3">Generation</th>
                    <th className="pb-3">Niche</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Requested</th>
                    <th className="pb-3">Generated</th>
                    <th className="pb-3">Contacted</th>
                    <th className="pb-3">Won</th>
                    <th className="pb-3">Conversion</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { gen: "gen-001", niche: "Dental Clinics", loc: "Varanasi", req: 50, gen: 47, contacted: 12, won: 2, status: "Completed" },
                    { gen: "gen-002", niche: "Restaurants", loc: "Kanpur", req: 50, gen: 52, contacted: 15, won: 1, status: "Completed" },
                    { gen: "gen-003", niche: "Coaching", loc: "Lucknow", req: 30, gen: 28, contacted: 8, won: 0, status: "Generating" },
                    { gen: "gen-004", niche: "Gyms", loc: "Mumbai", req: 40, gen: 38, contacted: 10, won: 3, status: "Completed" },
                    { gen: "gen-005", niche: "Real Estate", loc: "Delhi", req: 60, gen: 55, contacted: 22, won: 2, status: "Partial" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-3 font-mono text-sm">{row.gen}</td>
                      <td className="py-3">{row.niche}</td>
                      <td className="py-3">{row.loc}</td>
                      <td className="py-3">{row.req}</td>
                      <td className="py-3 font-medium">{row.gen}</td>
                      <td className="py-3">{row.contacted}</td>
                      <td className="py-3 font-medium text-green-600">{row.won}</td>
                      <td className="py-3">{(row.won / row.gen * 100).toFixed(1)}%</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          row.status === "Completed" ? "bg-green-100 text-green-800" :
                          row.status === "Generating" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}