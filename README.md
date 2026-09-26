# Luma Leads — AI-Powered Lead Discovery & CRM

A production-ready SaaS application for freelancers, agencies, and sales teams to discover, organize, and convert leads from Google Maps with generation isolation architecture.

## 🚀 Features

- **Smart Lead Discovery** — Search Google Maps/Places with custom niches, locations, and opportunity objectives
- **Generation Isolation** — Every search creates an independent project/batch. Never mixes leads. Separate CSVs, pipelines, analytics.
- **Opportunity Engine** — Optional objectives: businesses without websites, weak profiles, low reviews, no booking, high automation potential, custom objectives
- **CRM Pipeline** — Kanban board per generation: New → Contacted → Follow Up → Interested → Meeting → Proposal → Won/Lost
- **Google Sheets Sync** — Secure server-side integration. One worksheet per generation. Independent export/sync.
- **AI Assistant** — Chat interface for creating searches, managing generations, navigating CRM
- **Analytics** — Generation-aware metrics, conversion funnels, niche performance

## 🏗️ Architecture

```
Next.js 14 (App Router) + TypeScript + Tailwind CSS
├── Supabase (Auth, PostgreSQL, Realtime)
├── Google Maps/Places API (Lead Discovery)
├── Google Sheets API (Export/Sync)
└── OpenRouter (AI Features)
```

## 📦 Project Structure

```
src/
├── app/
│   ├── (auth)/login/          # Authentication pages
│   ├── dashboard/             # Protected dashboard routes
│   │   ├── search/            # Find Leads workspace
│   │   ├── generations/       # Lead Generation Projects
│   │   ├── pipeline/          # CRM Kanban
│   │   ├── ai/                # AI Assistant
│   │   ├── analytics/         # Analytics & Reports
│   │   ├── integrations/      # External integrations
│   │   └── settings/          # User settings
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable UI components (shadcn-style)
│   └── providers.tsx          # Context providers
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── supabase.ts            # Supabase client & types
│   └── auth.tsx               # Auth context
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Google Cloud project (for Maps/Places & Sheets)

### Installation

```bash
# Clone and install
cd luma-leads
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migrations (see `supabase/migrations/`)
3. Enable Email/Password auth in Supabase Auth settings
4. Copy project URL and anon key to `.env.local`

### Google Maps/Places Setup

1. Create Google Cloud project
2. Enable Maps JavaScript API, Places API, Geocoding API
3. Create API key with appropriate restrictions
4. Add to `.env.local`

### Google Sheets Setup (Optional)

1. Enable Google Sheets API & Drive API
2. Create OAuth 2.0 credentials
3. Add redirect URI: `https://your-domain/api/auth/callback/google`
4. Add client ID/secret to `.env.local`

## 🎯 Generation Isolation Architecture

**Core Principle:** One search = one independent generation/project/batch.

```
Generation 1: 50 Dental Clinics in Varanasi
  ├── Leads: 47 (only these 47)
  ├── CSV: luma_leads_gen-001.csv
  ├── Pipeline: Own Kanban board
  ├── Analytics: Own metrics
  └── Google Sheets: Worksheet "gen-001"

Generation 2: 50 Restaurants in Kanpur
  ├── Leads: 52 (only these 52)
  ├── CSV: luma_leads_gen-002.csv
  ├── Pipeline: Own Kanban board
  ├── Analytics: Own metrics
  └── Google Sheets: Worksheet "gen-002"
```

**NEVER:**
- Append new leads to old generation
- Merge two generations
- Reuse generation_id
- Combine CSV files
- Mix result sets in UI

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push and open PR

## 📞 Support

- Documentation: [docs.luma-leads.com](https://docs.luma-leads.com)
- Issues: GitHub Issues
- Email: support@luma-leads.com