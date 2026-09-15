"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/Card"

export default function InterviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    annualIncome: "",
    occupation: "",
    casteCategory: "",
    gender: "",
    needs: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock processing time
    setTimeout(() => {
      router.push("/results")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />
      
      <main className="w-full max-w-[1400px] px-4 py-8 flex justify-center">
        <Card className="w-full max-w-4xl p-8 bg-surface shadow-sm border border-border">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-custom mb-2">Find Matching Schemes</h1>
            <p className="text-text-light">
              Tell us about yourself to discover government schemes you might be eligible for.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Test Citizen" 
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">State</label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-custom"
                >
                  <option value="">Select State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Annual Income (₹)</label>
                <input 
                  type="number" 
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  placeholder="180000" 
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Occupation</label>
                <select 
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-custom"
                >
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Business">Business</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Caste Category</label>
                <select 
                  name="casteCategory"
                  value={formData.casteCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-custom"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Gender</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-custom"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">Tell us what you need</label>
              <textarea 
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                rows={3}
                placeholder="I need financial support for my education."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom resize-none"
              ></textarea>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full text-lg mt-4 bg-primary-custom text-white hover:bg-primary-light">
              Find Matching Schemes
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
