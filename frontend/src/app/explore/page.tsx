"use client"
import React from "react"
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { BenefitDeadlineCard } from "@/components/BenefitDeadlineCard"
import { Search } from "lucide-react"

export default function ExplorePage() {
  const allSchemes = [
    { id: 1, name: "PM Kisan Samman Nidhi", category: "Agriculture", benefit: "₹6,000 / year", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pmkisan.gov.in/" },
    { id: 2, name: "Ayushman Bharat PM-JAY", category: "Health", benefit: "₹5 Lakh Health Cover", deadlineStatus: "deadline_set" as const, deadlineText: "Deadline: 31 Dec 2026", official_apply_link: "https://pmjay.gov.in/" },
    { id: 3, name: "Pradhan Mantri Awas Yojana - Gramin", category: "Housing", benefit: "Up to ₹1.30 Lakh Subsidy", deadlineStatus: "closing_soon" as const, deadlineText: "Closing Soon", official_apply_link: "https://pmayg.nic.in/" },
    { id: 4, name: "Pradhan Mantri Ujjwala Yojana", category: "Social Welfare", benefit: "₹1,600 per connection", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://www.pmuy.gov.in/" },
    { id: 5, name: "Pradhan Mantri Jan Dhan Yojana", category: "Financial Inclusion", benefit: "Zero Balance Account", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pmjdy.gov.in/" },
    { id: 6, name: "Atal Pension Yojana", category: "Pension", benefit: "₹1k-5k Pension / month", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pfrda.org.in/" },
    { id: 7, name: "Sukanya Samriddhi Yojana", category: "Child Welfare", benefit: "High Interest Savings", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://www.indiapost.gov.in/" },
    { id: 8, name: "PM Shram Yogi Maan-dhan", category: "Pension", benefit: "₹3,000 / month after 60", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://maandhan.in/" },
    { id: 9, name: "Pradhan Mantri Mudra Yojana", category: "Business", benefit: "Up to ₹10 Lakhs Loan", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://www.mudra.org.in/" },
    { id: 10, name: "Stand-Up India Scheme", category: "Business", benefit: "₹10 Lakh to ₹1 Crore Loan", deadlineStatus: "open" as const, deadlineText: "Rolling Applications", official_apply_link: "https://www.standupmitra.in/" },
    { id: 11, name: "MGNREGA", category: "Employment", benefit: "100 Days Guaranteed Wage", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://nrega.nic.in/" },
    { id: 12, name: "PM Matru Vandana Yojana", category: "Maternity Benefit", benefit: "₹5,000 Cash Incentive", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pmmvy-cas.nic.in/" },
    { id: 13, name: "PM Fasal Bima Yojana", category: "Agriculture", benefit: "Crop Insurance", deadlineStatus: "deadline_set" as const, deadlineText: "Varies by Season", official_apply_link: "https://pmfby.gov.in/" },
    { id: 14, name: "National Social Assistance Programme", category: "Pension", benefit: "₹200 - ₹500 / month", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://nsap.nic.in/" },
    { id: 15, name: "PM Kaushal Vikas Yojana", category: "Skill Development", benefit: "Free Training", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://www.pmkvyofficial.org/" },
    { id: 16, name: "PM Jeevan Jyoti Bima Yojana", category: "Insurance", benefit: "₹2 Lakhs Life Cover", deadlineStatus: "deadline_set" as const, deadlineText: "Renewed Annually", official_apply_link: "https://jansuraksha.gov.in/" },
    { id: 17, name: "PM Suraksha Bima Yojana", category: "Insurance", benefit: "₹2 Lakhs Accident Cover", deadlineStatus: "deadline_set" as const, deadlineText: "Renewed Annually", official_apply_link: "https://jansuraksha.gov.in/" },
    { id: 18, name: "DDU-GKY", category: "Skill Development", benefit: "Free Training + Placement", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "http://ddugky.gov.in/" },
    { id: 19, name: "Post Matric Scholarship SC/ST", category: "Education", benefit: "Varies by course", deadlineStatus: "closing_soon" as const, deadlineText: "Closing Soon", official_apply_link: "https://scholarships.gov.in/" },
    { id: 20, name: "PM Vishwakarma Yojana", category: "Employment", benefit: "₹15,000 Toolkit + ₹3 Lakh Credit", deadlineStatus: "deadline_set" as const, deadlineText: "Deadline: 31 Mar 2027", official_apply_link: "https://pmvishwakarma.gov.in/" },
    { id: 21, name: "Pradhan Mantri Awas Yojana - Urban", category: "Housing", benefit: "Up to ₹2.67 Lakhs Subsidy", deadlineStatus: "open" as const, deadlineText: "Open - Apply Anytime", official_apply_link: "https://pmay-urban.gov.in/" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-12">
      <Navbar />

      <main className="w-full max-w-[1400px] px-4 pt-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-custom">Explore Schemes</h1>
            <p className="text-text-light mt-1">Browse all available government schemes across categories.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
            <input 
              type="text" 
              placeholder="Search schemes..." 
              className="w-full pl-10 pr-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-custom"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSchemes.map(scheme => (
            <Card key={scheme.id} className="relative overflow-hidden flex flex-col h-full">
              <div className="p-5 flex flex-col flex-1">
                <div className="inline-block bg-primary-custom/10 text-primary-custom text-xs font-semibold px-2 py-1 rounded w-max mb-3">
                  {scheme.category}
                </div>
                <h3 className="text-lg font-bold text-text-main leading-tight mb-4">{scheme.name}</h3>
                
                <div className="mt-auto">
                  <BenefitDeadlineCard 
                    prizeAmount={scheme.benefit} 
                    deadlineStatus={scheme.deadlineStatus} 
                    deadlineText={scheme.deadlineText} 
                  />
                  <a href={scheme.official_apply_link} target="_blank" rel="noopener noreferrer" className="block mt-4">
                    <Button variant="outline" className="w-full text-sm">
                      Apply Now
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
