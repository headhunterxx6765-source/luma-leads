"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Plus, X, MapPin, Target, 
  Loader2, ArrowRight, Sparkles, CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BUSINESS_NICHES, INDIAN_STATES, SEARCH_OBJECTIVES } from "@/lib/utils"

const steps = [
  { key: "niche", title: "Niche", desc: "What type of business?" },
  { key: "location", title: "Location", desc: "Where to search?" },
  { key: "count", title: "Count", desc: "How many leads?" },
  { key: "objectives", title: "Objectives", desc: "Opportunity filters (optional)" },
  { key: "preview", title: "Preview", desc: "Review & generate" },
]

export default function SearchPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    niche: "",
    customNiche: "",
    location: "",
    customLocation: "",
    leadCount: 50,
    objectives: [] as string[],
    customObjective: "",
  })
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [generationId, setGenerationId] = useState("")

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleObjective = (obj: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(obj)
        ? prev.objectives.filter(o => o !== obj)
        : [...prev.objectives, obj]
    }))
  }

  const handleGenerate = async () => {
    setGenerating(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000))
    const newGenId = `gen-${Date.now().toString(36)}`
    setGenerationId(newGenId)
    setGenerating(false)
    setGenerated(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.niche !== ""
      case 1: return formData.location !== ""
      case 2: return formData.leadCount > 0
      case 3: return true // optional
      case 4: return true
      default: return false
    }
  }

  const goNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (generated) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold">Generation Created!</h1>
          <p className="text-muted-foreground mt-2">Your lead generation project is now running.</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Generation ID</p>
                  <p className="text-sm text-muted-foreground font-mono">{generationId}</p>
                </div>
                <Badge variant="warning">Generating...</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Niche</p>
                  <p className="font-medium">{formData.niche === "Other" ? formData.customNiche : formData.niche}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{formData.location === "Other" ? formData.customLocation : formData.location}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Requested Leads</p>
                  <p className="font-medium">{formData.leadCount}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Objectives</p>
                  <p className="font-medium">{formData.objectives.length > 0 ? formData.objectives.join(", ") : "None"}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button onClick={() => { setGenerated(false); setCurrentStep(0); setFormData({ niche: "", customNiche: "", location: "", customLocation: "", leadCount: 50, objectives: [], customObjective: "" })}} variant="outline" className="flex-1">
                Create Another
              </Button>
              <Button className="flex-1 gap-2">
                View Generation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Find Leads</h1>
        <p className="text-muted-foreground">Create a new lead generation project with custom criteria</p>
      </div>

      {/* Progress Steps */}
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center relative">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              i < currentStep ? "bg-primary text-primary-foreground" :
              i === currentStep ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {i < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{i + 1}</span>}
            </div>
            <span className={cn("mt-2 text-xs font-medium text-center w-24", i === currentStep ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </span>
            {i < steps.length - 1 && (
              <div className={cn(
                "absolute top-5 left-1/2 w-full h-1 -translate-x-1/2",
                i < currentStep ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile step indicator */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between">
          <button onClick={goBack} disabled={currentStep === 0} className="text-sm text-muted-foreground disabled:opacity-50">
            ← Back
          </button>
          <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
          <button onClick={goNext} disabled={!canProceed() || currentStep === steps.length - 1} className="text-sm text-primary disabled:opacity-50">
            Next →
          </button>
        </div>
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Niche */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Business Type</label>
              <Select
                value={formData.niche}
                onChange={(e) => updateField("niche", e.target.value)}
                className="w-full"
              >
                <option value="">Select a niche...</option>
                {BUSINESS_NICHES.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </Select>
              {formData.niche === "Other" && (
                <Input
                  placeholder="Enter custom niche (e.g., Coaching institutes for internships)"
                  value={formData.customNiche}
                  onChange={(e) => updateField("customNiche", e.target.value)}
                />
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Location</label>
              <div className="flex gap-2">
                <Select
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="flex-1"
                >
                  <option value="">Select state...</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Select>
                <Input
                  placeholder="City / Area"
                  value={formData.customLocation}
                  onChange={(e) => updateField("customLocation", e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Example: Varanasi, Kanpur, Lucknow, Mumbai, Delhi
              </p>
            </div>
          )}

          {/* Step 3: Lead Count */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Number of Leads</label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={formData.leadCount}
                  onChange={(e) => updateField("leadCount", parseInt(e.target.value) || 0)}
                  className="w-32"
                />
                <div className="flex gap-2">
                  {[10, 25, 50, 100].map(n => (
                    <Button
                      key={n}
                      variant={formData.leadCount === n ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateField("leadCount", n)}
                    >
                      {n}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended: 25-50 for focused searches, up to 500 for broad discovery
              </p>
            </div>
          )}

          {/* Step 4: Objectives */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Search Objectives (Optional)</label>
              <p className="text-sm text-muted-foreground">
                Select opportunity filters to find businesses with specific gaps. Multi-select supported.
              </p>
              <div className="flex flex-wrap gap-2">
                {SEARCH_OBJECTIVES.map(obj => (
                  <Button
                    key={obj}
                    variant={formData.objectives.includes(obj) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleObjective(obj)}
                    className="whitespace-nowrap"
                  >
                    {obj === "Other" ? <Plus className="h-4 w-4 mr-1" /> : null}
                    {obj}
                  </Button>
                ))}
              </div>
              {formData.objectives.includes("Other") && (
                <Input
                  placeholder="Enter custom objective..."
                  value={formData.customObjective}
                  onChange={(e) => updateField("customObjective", e.target.value)}
                />
              )}
            </div>
          )}

          {/* Step 5: Preview */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Search Preview
                </h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Business Type</dt>
                    <dd className="font-medium">{formData.niche === "Other" ? formData.customNiche : formData.niche}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="font-medium">{formData.location === "Other" ? formData.customLocation : formData.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Lead Count</dt>
                    <dd className="font-medium">{formData.leadCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Objectives</dt>
                    <dd className="font-medium">
                      {formData.objectives.length > 0 
                        ? formData.objectives.map((o, i) => (
                            <Badge key={i} variant="outline" className="mr-1">{o}</Badge>
                          ))
                        : <span className="text-muted-foreground">None selected</span>
                      }
                    </dd>
                  </div>
                  {formData.customObjective && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Custom Objective</dt>
                      <dd className="font-medium">{formData.customObjective}</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm">
                  <strong>Important:</strong> This will create a <strong>new independent generation</strong>. 
                  It will not append to or merge with any existing project. Each generation gets its own CSV, pipeline, and analytics.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={goBack} disabled={currentStep === 0}>
              Back
            </Button>
            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={goNext} disabled={!canProceed()}>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleGenerate} disabled={generating} className="gap-2">
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Generate Leads
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Sparkles className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Generation Isolation Guarantee</p>
              <p>Every search creates a completely independent project. Leads never mix between generations. Each gets its own CSV, CRM pipeline, and Google Sheets tab.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}