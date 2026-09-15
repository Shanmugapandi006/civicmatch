"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { ConfidenceGauge } from "@/components/ConfidenceGauge"
import { BenefitDeadlineCard } from "@/components/BenefitDeadlineCard"
import { Navbar } from "@/components/Navbar"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function ResultsPage() {
  const [eligibleSchemes, setEligibleSchemes] = useState<any[]>([])
  const [almostEligible, setAlmostEligible] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const storedProfile = localStorage.getItem("citizenProfile")
        if (!storedProfile) {
          setIsLoading(false)
          return
        }
        
        const profile = JSON.parse(storedProfile)
        const response = await fetch("https://civicmatch-1.onrender.com/api/v1/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(profile)
        })

        if (response.ok) {
          const data = await response.json()
          
          // Map backend response to UI format
          const mappedSchemes = data.map((rec: any) => ({
            id: rec.scheme_id,
            name: rec.scheme_name,
            benefit: rec.benefit_amount || "Financial Support",
            confidence: rec.confidence_score,
            reason: rec.matched_rules?.map((r:any) => r.description).join(" ") || "Matches your profile.",
            gap: rec.missing_rules?.map((r:any) => r.description).join(" ") || rec.gap_analysis || "Doesn't fully match.",
            deadlineStatus: "open",
            deadlineText: "Rolling Applications",
            official_apply_link: "#"
          }))

          setEligibleSchemes(mappedSchemes.filter((s: any) => s.confidence >= 80))
          setAlmostEligible(mappedSchemes.filter((s: any) => s.confidence < 80))
        }
      } catch (error) {
        console.error("Failed to fetch recommendations", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-12">
      <Navbar />
      <header className="w-full max-w-[1400px] p-4 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-primary-custom">Your Matches</h1>
      </header>

      <main className="w-full max-w-[1400px] px-4 flex flex-col gap-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary-custom">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-lg font-semibold">Running Explainable AI Rules Engine...</p>
          </div>
        ) : (
          <>
            <section>
              <h2 className="text-lg font-bold text-primary-custom mb-4">Schemes You Qualify For</h2>
              {eligibleSchemes.length === 0 ? (
                <p className="text-text-light">No perfectly matching schemes found. Check the almost eligible list below!</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {eligibleSchemes.map(scheme => (
                    <Card key={scheme.id} className="relative overflow-hidden border-l-4 border-l-success">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="pr-2">
                            <h3 className="text-xl font-semibold text-text-main leading-tight mb-2">{scheme.name}</h3>
                            <p className="text-sm text-text-light">{scheme.reason}</p>
                          </div>
                          <div className="shrink-0 scale-90 -mt-2 -mr-2">
                            <ConfidenceGauge score={scheme.confidence} size={80} />
                          </div>
                        </div>
                        
                        <BenefitDeadlineCard 
                          prizeAmount={scheme.benefit} 
                          deadlineStatus={scheme.deadlineStatus} 
                          deadlineText={scheme.deadlineText} 
                        />

                        <div className="flex gap-3 mt-4">
                          <Link href={`/results/${scheme.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              Details & Proof
                            </Button>
                          </Link>
                          <a href={scheme.official_apply_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button variant="accent" className="w-full shadow-md">
                              Apply Now
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-bold text-text-light mb-4">Almost Eligible</h2>
              {almostEligible.length === 0 ? (
                <p className="text-text-light">No almost-eligible schemes found.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {almostEligible.map(scheme => (
                    <Card key={scheme.id} className="relative overflow-hidden bg-background opacity-90">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="pr-2">
                            <h3 className="text-lg font-semibold text-text-main leading-tight mb-2">{scheme.name}</h3>
                            <div className="mt-2 inline-block bg-warning/20 px-2 py-1 rounded text-xs font-medium text-warning-custom border border-warning/30">
                              <span className="font-bold">Missing:</span> {scheme.gap}
                            </div>
                          </div>
                          <div className="shrink-0 scale-75 -mt-4 -mr-4 opacity-70">
                            <ConfidenceGauge score={scheme.confidence} size={80} />
                          </div>
                        </div>
                        
                        <BenefitDeadlineCard 
                          prizeAmount={scheme.benefit} 
                          deadlineStatus={scheme.deadlineStatus} 
                          deadlineText={scheme.deadlineText} 
                        />

                        <div className="flex gap-3 mt-3">
                          <Link href={`/results/${scheme.id}`} className="flex-1">
                            <Button variant="outline" className="w-full text-sm">
                              See how to qualify
                            </Button>
                          </Link>
                          <a href={scheme.official_apply_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button variant="accent" className="w-full text-sm shadow-md">
                              Apply Now
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
