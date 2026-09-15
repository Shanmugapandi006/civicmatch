import Link from "next/link"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { ConfidenceGauge } from "@/components/ConfidenceGauge"
import { BenefitDeadlineCard } from "@/components/BenefitDeadlineCard"
import { Navbar } from "@/components/Navbar"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function ResultsPage() {
  const eligibleSchemes = [
    { id: 1, name: "PM Kisan Samman Nidhi", benefit: "₹6,000 / year", confidence: 95, reason: "Matches your occupation (Farmer) and income bracket.", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pmkisan.gov.in/" },
    { id: 2, name: "Ayushman Bharat PM-JAY", benefit: "₹5 Lakh Health Cover", confidence: 88, reason: "Based on your income and social category.", deadlineStatus: "deadline_set" as const, deadlineText: "Deadline: 31 Dec 2026", official_apply_link: "https://pmjay.gov.in/" }
  ]

  const almostEligible = [
    { id: 3, name: "Kisan Credit Card", benefit: "Subsidized Loan", confidence: 40, gap: "Requires land ownership details.", deadlineStatus: "open" as const, deadlineText: "Rolling Applications", official_apply_link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card" }
  ]

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
        <section>
          <h2 className="text-lg font-bold text-primary-custom mb-4">Schemes You Qualify For</h2>
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
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-light mb-4">Almost Eligible</h2>
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
        </section>
      </main>
    </div>
  )
}
