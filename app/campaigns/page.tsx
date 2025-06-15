"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/layout/navbar"
import EmptyState from "@/components/empty-state"
import { ElegantShape } from "@/components/geometric-shapes"
import { Search, Clock, Target, Filter } from "lucide-react"
import Link from "next/link"
import type { Campaign } from "@/lib/models/Campaign"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchCampaigns()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [campaigns, searchTerm, statusFilter])

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

  const filterCampaigns = () => {
    let filtered = campaigns

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter)
    }

    setFilteredCampaigns(filtered)
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-purple-500/[0.03]" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.2}
            width={400}
            height={100}
            rotate={8}
            gradient="from-purple-500/[0.1]"
            className="left-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-12}
            gradient="from-purple-400/[0.1]"
            className="right-[-5%] bottom-[30%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Campaigns</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Browse and support active crowdfunding campaigns for Solana token listings
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Card className="bg-white/5 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        placeholder="Search by token name, symbol, or contract address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/5 border-purple-500/30 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === "all" ? "default" : "outline"}
                      onClick={() => setStatusFilter("all")}
                      className={
                        statusFilter === "all"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      }
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === "active" ? "default" : "outline"}
                      onClick={() => setStatusFilter("active")}
                      className={
                        statusFilter === "active"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      }
                    >
                      Active
                    </Button>
                    <Button
                      variant={statusFilter === "completed" ? "default" : "outline"}
                      onClick={() => setStatusFilter("completed")}
                      className={
                        statusFilter === "completed"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      }
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Campaigns Grid */}
          {isLoading ? (
            <div className="text-center text-white/60 py-20">Loading campaigns...</div>
          ) : filteredCampaigns.length === 0 ? (
            campaigns.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-20"
              >
                <Card className="bg-white/5 border-purple-500/20 max-w-md mx-auto">
                  <CardContent className="p-8">
                    <Filter className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">No campaigns found</h3>
                    <p className="text-white/60 mb-6">Try adjusting your search terms or filters to find campaigns.</p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                      }}
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
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
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">View Campaign</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
