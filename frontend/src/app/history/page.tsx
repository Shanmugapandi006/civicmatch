"use client"
import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { useAuth } from "@/components/AuthContext"
import { Clock, CheckCircle } from "lucide-react"

export default function HistoryPage() {
  const { user, setAuthModalOpen } = useAuth();

  const mockHistory = [
    { id: 1, date: "15 Sep 2026", scheme: "PM Kisan Samman Nidhi", status: "Highly Eligible", confidence: 95 },
    { id: 2, date: "12 Sep 2026", scheme: "Ayushman Bharat PM-JAY", status: "Eligible", confidence: 88 },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-12">
      <Navbar />

      <main className="w-full max-w-[1400px] px-4 pt-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-custom">Your History</h1>
          <p className="text-text-light mt-1">Review your past scheme recommendations and applications.</p>
        </div>

        {!user ? (
          <Card className="p-12 flex flex-col items-center justify-center text-center bg-surface border-dashed">
            <Clock size={48} className="text-text-light mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-text-main mb-2">Login to view history</h2>
            <p className="text-text-light mb-6">Your past recommendations are saved securely to your account.</p>
            <Button variant="accent" onClick={() => setAuthModalOpen(true)}>
              Login / Sign Up
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {mockHistory.map((item) => (
              <Card key={item.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-text-light mb-1">{item.date}</div>
                  <h3 className="text-xl font-bold text-text-main">{item.scheme}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-sm font-semibold text-success">{item.status} ({item.confidence}% Match)</span>
                  </div>
                </div>
                <Link href={`/results/${item.id}`}>
                  <Button variant="outline" className="w-full sm:w-auto">
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
