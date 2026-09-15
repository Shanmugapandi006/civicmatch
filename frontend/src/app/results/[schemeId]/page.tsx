import Link from "next/link"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { ConfidenceGauge } from "@/components/ConfidenceGauge"
import { EvidenceGraph } from "@/components/EvidenceGraph"
import { BenefitDeadlineCard } from "@/components/BenefitDeadlineCard"
import { Navbar } from "@/components/Navbar"
import { ArrowLeft, CheckCircle, FileText, Download, Lightbulb } from "lucide-react"

export default async function SchemeDetailPage({ params }: { params: Promise<{ schemeId: string }> }) {
  const resolvedParams = await params;
  const scheme = {
    id: resolvedParams.schemeId,
    name: "PM Kisan Samman Nidhi",
    benefit: "₹6,000 / year",
    deadlineStatus: "closing_soon" as const,
    deadlineText: "Closing Soon - 15 days left",
    confidence: 95,
    description: "Income support to all landholding farmers' families in the country to supplement their financial needs for procuring various inputs related to agriculture.",
    counterfactual: "If your land holding was verified instantly via DigiLocker, confidence would be 100%.",
    documents: ["Aadhaar Card", "Bank Account Details", "Land Ownership Documents"],
    official_apply_link: "https://pmkisan.gov.in/"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />
      <header className="w-full max-w-[1400px] p-4 flex items-center gap-4">
        <Link href="/results">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <span className="text-text-light text-sm font-medium">Scheme Details</span>
      </header>

      <main className="w-full max-w-[1400px] px-4 flex flex-col gap-6 pb-24">
        <div className="flex flex-col items-center text-center">
          <ConfidenceGauge score={scheme.confidence} size={150} />
          <div className="inline-flex items-center gap-2 bg-success/20 text-success px-4 py-1.5 rounded-full font-semibold text-sm mt-4 border border-success/30">
            <CheckCircle size={18} />
            <span>You are highly likely to be eligible</span>
          </div>
        </div>

        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-primary-custom leading-tight mb-6">{scheme.name}</h1>
          <BenefitDeadlineCard 
            prizeAmount={scheme.benefit} 
            deadlineStatus={scheme.deadlineStatus} 
            deadlineText={scheme.deadlineText} 
          />
          <p className="text-text-main mt-4 leading-relaxed">{scheme.description}</p>
        </div>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-primary-custom">Eligibility Evidence</h3>
            <button className="text-sm font-semibold text-secondary underline">Explain AI</button>
          </div>
          <EvidenceGraph />
        </section>

        <Card className="border-l-4 border-l-accent-custom bg-surface">
          <div className="p-4 flex gap-3 items-start">
            <Lightbulb size={24} className="text-accent-custom shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-text-main">Did you know?</h4>
              <p className="text-sm text-text-light mt-1">{scheme.counterfactual}</p>
            </div>
          </div>
        </Card>

        <section>
          <h3 className="text-lg font-bold text-primary-custom mb-3">Documents Needed</h3>
          <ul className="flex flex-col gap-3">
            {scheme.documents.map((doc, i) => (
              <li key={i} className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-border shadow-sm">
                <FileText size={20} className="text-primary-light" />
                <span className="font-medium text-text-main">{doc}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-12 pb-4 px-4 flex flex-col items-center z-50">
        <div className="w-full max-w-lg flex flex-col gap-3">
          <a href={scheme.official_apply_link} target="_blank" rel="noopener noreferrer" className="w-full block">
            <Button variant="accent" size="lg" className="w-full text-lg shadow-xl shadow-accent/20">
              Apply Now
            </Button>
          </a>
          <Button variant="outline" size="lg" className="w-full bg-surface">
            <Download size={20} className="mr-2" /> Download Checklist
          </Button>
        </div>
      </div>
    </div>
  )
}
