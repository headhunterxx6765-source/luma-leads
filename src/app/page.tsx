"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Search, Users, Zap, Shield, BarChart3, 
  Brain, Globe, ArrowRight, CheckCircle,
  Sparkles, LayoutDashboard, Database,
  Target, ArrowUpRight, Moon, Sun
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Search,
    title: "Smart Lead Discovery",
    desc: "AI-powered Google Maps search with custom niches, locations, and opportunity objectives. Every search is an isolated generation."
  },
  {
    icon: Database,
    title: "Generation Isolation",
    desc: "Each lead generation creates an independent project/batch. Never mixes leads. Separate CSVs, separate pipelines, separate analytics."
  },
  {
    icon: Brain,
    title: "Opportunity Engine",
    desc: "Optional objectives: businesses without websites, weak profiles, low reviews, no booking, high automation potential, and custom objectives."
  },
  {
    icon: BarChart3,
    title: "CRM Pipeline",
    desc: "Kanban board per generation. Statuses: New → Contacted → Follow Up → Interested → Meeting → Proposal → Won/Lost. Notes & tasks per lead."
  },
  {
    icon: Users,
    title: "Google Sheets Sync",
    desc: "Secure server-side Google Sheets integration. One worksheet per generation. Independent export/sync. Never combines datasets."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    desc: "No invented contact data. Only public business info. Server-side API keys. User data isolation. Ready for production."
  }
]

const stats = [
  { label: "Generations Created", value: "0", icon: Sparkles },
  { label: "Total Leads Found", value: "0", icon: Users },
  { label: "Conversion Rate", value: "0%", icon: Target },
  { label: "Active Projects", value: "0", icon: LayoutDashboard },
]

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved !== null) setDarkMode(saved === "true")
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setDarkMode(true)
  }, [])
  
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode))
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Sparkles className="h-6 w-6" />
              <span>Luma Leads</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-in">
              <Zap className="h-4 w-4" />
              <span>AI-Powered Lead Discovery & CRM</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-in">
              Find. Organize.{" "}
              <span className="text-primary">Convert.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in">
              Luma Leads helps freelancers, agencies, and sales teams discover qualified leads from Google Maps, 
              organize them in isolated generation projects, and convert them through a modern CRM pipeline.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" style={{ paddingRight: 24 }}>
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">View Demo</Button>
              </Link>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-in">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> 14-day free trial</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> Cancel anytime</span>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="mt-16 relative animate-in">
            <div className="rounded-xl border border-border/50 bg-card/50 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-xs text-muted-foreground font-mono">luma-leads.vercel.app/dashboard</div>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-muted/30">
                      <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">New Generation</div>
                      <div className="text-sm text-muted-foreground">Dental Clinics · Varanasi · 50 leads</div>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Generating...</span>
                  </div>
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted" />
                          <div>
                            <div className="font-medium text-foreground">Business Name {i}</div>
                            <div className="text-sm text-muted-foreground">Category · Location · ⭐ 4.5 (120)</div>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">New</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/50">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by freelancers, agencies, and sales teams worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-muted-foreground/60 font-medium">
            <span>Freelancers</span>
            <span>Agencies</span>
            <span>SaaS Companies</span>
            <span>Real Estate</span>
            <span>Consultants</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to win leads</h2>
            <p className="text-lg text-muted-foreground">Powerful features built for modern lead generation workflows</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">How it works in 4 steps</h2>
            <p className="text-lg text-muted-foreground">From search to close — every generation is independent</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Define Your Search", desc: "Pick niche, location, lead count, and optional opportunity objectives. Custom niches supported." },
              { step: "02", title: "Generate Leads", desc: "Creates a new isolated generation. Fetches public business data from Google Maps/Places." },
              { step: "03", title: "Manage in CRM", desc: "Kanban pipeline per generation. Update status, add notes, create tasks. Never mixes batches." },
              { step: "04", title: "Export & Sync", desc: "Download CSV per generation or sync to Google Sheets — one worksheet per generation." },
            ].map((item, i) => (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to find your next client?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join hundreds of professionals using Luma Leads to grow their business.</p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 w-auto" style={{ paddingRight: 24 }}>
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                <Sparkles className="h-6 w-6" />
                <span>Luma Leads</span>
              </Link>
              <p className="text-sm text-muted-foreground">AI-powered lead discovery and CRM for modern sales teams.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Luma Leads. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}