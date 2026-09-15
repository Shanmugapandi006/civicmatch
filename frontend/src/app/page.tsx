import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/Button"
import { ShieldCheck, Zap, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />

      <main className="w-full max-w-[1400px] px-4 pt-12 flex flex-col items-center text-center gap-6">
        <h1 className="text-6xl font-bold text-primary-custom leading-tight tracking-tight mt-6">
          Find Government Schemes You Deserve. Instantly.
        </h1>
        <p className="text-xl text-text-light max-w-3xl">
          Answer a few simple questions and let our Explainable AI find the exact benefits you qualify for. No complex forms, just clear answers.
        </p>
        
        <Link href="/interview" className="w-full max-w-sm mt-4">
          <Button variant="accent" size="lg" className="w-full py-7 rounded-full text-xl shadow-lg font-semibold">
            Find Schemes in 2 Minutes <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm text-base font-medium border border-border">
            <ShieldCheck size={20} className="text-success" />
            <span>MyScheme Data</span>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full shadow-sm text-base font-medium border border-border">
            <Zap size={20} className="text-accent-custom" />
            <span>AI Powered</span>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-12 relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
          <Image 
            src="/hero-image.jpg" 
            alt="AI seamlessly connecting citizens to schemes" 
            width={800} 
            height={400} 
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </main>
    </div>
  )
}
