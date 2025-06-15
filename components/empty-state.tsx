"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Plus } from "lucide-react"
import Link from "next/link"

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20"
    >
      <Card className="bg-white/5 border-purple-500/20 max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">No Campaigns Yet</h3>
          <p className="text-white/60 mb-6 leading-relaxed">
            Be the first to launch a crowdfunding campaign for your favorite Solana token's Dexscreener listing.
          </p>

          <Link href="/create">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Campaign
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
