"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent"
        >
          DexRooms
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/campaigns" className="text-white/80 hover:text-white transition-colors">
            Campaigns
          </Link>
        </div>

        <Link href="/create">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
            Create Campaign
          </Button>
        </Link>
      </div>
    </motion.nav>
  )
}
