"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ElegantShape } from "@/components/geometric-shapes"
import Navbar from "@/components/layout/navbar"
import EmptyState from "@/components/empty-state"
import { ExternalLink, Clock, Target, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Campaign } from "@/lib/models/Campaign"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns")
      const data = await response.json()
      setCampaigns(data.campaigns || [])
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTimeLeft = (expiresAt: string) => {
    const now = new Date().getTime()
    const expiry = new Date(expiresAt).getTime()
    const diff = expiry - now

    if (diff <= 0) return "Expired"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  const recentCampaigns = campaigns.slice(0, 6) // Show only first 6 campaigns

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-purple-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-purple-400/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />

          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />

          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-purple-300/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 md:mb-12"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 tracking-wide">Community-Powered Listings</span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Fund Your Token's
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white/90 to-purple-300",
                    pacifico.className,
                  )}
                >
                  Dex Listing
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                Community-driven crowdfunding for Solana memecoin Dexscreener listings. Secure escrow, transparent
                funding, automatic refunds.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg"
                >
                  Launch Campaign
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-3 text-lg"
                >
                  How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 text-purple-300 text-sm">
                <Shield className="w-4 h-4" />
                <span className="font-medium">🔍 Live Escrow Tracking:</span>
              </div>
              <p className="text-white/60 text-sm mt-1">
                All campaigns use real Solana mainnet escrow wallets with live balance monitoring. QR codes generated
                for easy mobile contributions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns Section */}
      <div className="relative py-20 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Campaigns</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Join the community in funding the next big Solana memecoin listings
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center text-white/60">Loading campaigns...</div>
          ) : recentCampaigns.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {recentCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={campaign.logo || "/placeholder.svg?height=48&width=48"}
                            alt={campaign.name}
                            className="w-12 h-12 rounded-full bg-purple-500/20"
                          />
                          <div>
                            <h3 className="text-white font-semibold">{campaign.name}</h3>
                            <p className="text-purple-300 text-sm">${campaign.symbol}</p>
                          </div>
                          <Badge
                            variant={campaign.status === "completed" ? "default" : "secondary"}
                            className={
                              campaign.status === "completed"
                                ? "bg-green-500/20 text-green-300"
                                : campaign.status === "failed"
                                  ? "bg-red-500/20 text-red-300"
                                  : "bg-purple-500/20 text-purple-300"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Progress</span>
                            <span className="text-white">
                              ${campaign.raised} / ${campaign.goal}
                            </span>
                          </div>

                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1 text-white/60">
                              <Clock className="w-3 h-3" />
                              {getTimeLeft(campaign.expiresAt.toString())}
                            </div>
                            <div className="flex items-center gap-1 text-white/60">
                              <Target className="w-3 h-3" />
                              {campaign.contributors} contributors
                            </div>
                          </div>

                          <Link href={`/campaign/${campaign._id}`}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                              View Campaign
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-8"
              >
                <Link href="/campaigns">
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    View All Campaigns
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
