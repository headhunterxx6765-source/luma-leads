import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

export const BUSINESS_NICHES = [
  "Dental Clinics", "Medical Clinics", "Hospitals", "Dermatologists",
  "Gyms", "Fitness Centers", "Yoga Studios", "Salons", "Spas",
  "Restaurants", "Cafes", "Hotels", "Real Estate Agencies",
  "Real Estate Agents", "Property Dealers", "Coaching Institutes",
  "Schools", "Colleges", "Training Institutes", "Accounting Firms",
  "CA Firms", "Law Firms", "Insurance Agencies", "Travel Agencies",
  "Tour Operators", "Car Dealerships", "Auto Repair Shops",
  "Beauty Clinics", "Physiotherapy Clinics", "Veterinary Clinics",
  "Pharmacies", "Interior Designers", "Architects", "Construction Companies",
  "Home Services", "Plumbers", "Electricians", "Cleaning Services",
  "Digital Marketing Agencies", "IT Companies", "Software Companies",
  "E-commerce Businesses", "Retail Stores", "Photography Studios",
  "Event Management Companies", "Wedding Planners", "Recruitment Agencies",
  "Consultants", "Financial Advisors", "Manufacturers", "Wholesalers",
  "Distributors", "Other"
]

export const SEARCH_OBJECTIVES = [
  "General Business Leads",
  "Businesses Without a Website",
  "Businesses With an Old/Weak Website",
  "Businesses With Low Review Count",
  "Businesses With Weak Google Business Profiles",
  "Businesses Without Online Booking",
  "Businesses Without WhatsApp Presence",
  "Growing Businesses",
  "High Automation Potential",
  "AI Opportunity",
  "Other"
]

export const CRM_STATUSES = [
  "New", "Contacted", "Follow Up", "Interested",
  "Meeting", "Proposal", "Won", "Lost"
] as const

export type CrmStatus = typeof CRM_STATUSES[number]