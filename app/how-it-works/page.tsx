"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import { ElegantShape } from "@/components/geometric-shapes"
import { Rocket, Users, CheckCircle, Shield, Clock, DollarSign, RefreshCw, Zap, Target, Globe } from "lucide-react"

const steps = [
  {
    icon: Rocket,
    title: "Submit Token",
    description:
      "Anyone can create a campaign by submitting a valid Solana token contract address. No need to be the token creator.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Community Funding",
    description:
      "Contributors send SOL to the project's secure escrow wallet to collectively reach the $300 listing goal.",
    color: "from-purple-600 to-purple-700",
  },
  {
    icon: CheckCircle,
    title: "Dex Listing",
    description:
      "Once funded, our team manually submits your token to Dexscreener for official listing within 30 minutes.",
    color: "from-purple-700 to-purple-800",
  },
]

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    description: "All funds are held in secure on-chain smart contracts with automatic refund protection.",
  },
  {
    icon: Clock,
    title: "48-Hour Campaigns",
    description: "Each campaign has exactly 48 hours to reach its funding goal or all contributions are refunded.",
  },
  {
    icon: DollarSign,
    title: "$300 Goal",
    description: "Standard Dexscreener listing fee. Community Takeovers have a $200 goal for verification.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Refunds",
    description: "If funding fails or token gets listed elsewhere, all contributors receive automatic refunds.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Successful campaigns are processed within 30 minutes by our dedicated team.",
  },
  {
    icon: Target,
    title: "Live Tracking",
    description: "Real-time balance monitoring with QR codes for easy mobile wallet contributions.",
  },
]

const faqs = [
  {
    question: "What is DexRooms?",
    answer:
      "DexRooms is a community-driven platform where anyone can start crowdfunding campaigns for Solana memecoin Dexscreener listings. Simply provide any Solana token contract address, and the community can help fund its $300 listing fee.",
  },
  {
    question: "How does the funding process work?",
    answer:
      "Anyone can create a campaign by submitting a valid Solana token contract address. Each campaign gets a unique escrow wallet where contributors send SOL. Projects have 48 hours to raise $300. Upon successful funding, our team receives the funds and manually submits the token to Dexscreener.",
  },
  {
    question: "Are my contributions safe?",
    answer:
      "Yes, all funds are held on-chain in secure escrow smart contracts. Your contribution is completely protected. If the funding goal isn't met within 48 hours, or if the listing is completed elsewhere, all funds are automatically refunded.",
  },
  {
    question: "Who can create a campaign?",
    answer:
      "Anyone can create a campaign for any Solana token! You don't need to be the token creator - just provide a valid Solana contract address. This democratizes access to Dexscreener listings.",
  },
  {
    question: "What is a Community Takeover?",
    answer:
      "A Community Takeover happens when a token is already listed on Dexscreener, but the community wants to organize support efforts. These campaigns have a $200 goal for verification and enhanced visibility.",
  },
  {
    question: "What happens if funding fails?",
    answer:
      "If $300 is not raised within 48 hours, all contributors receive automatic refunds. If the token gets listed elsewhere before our goal is met, all funds are also automatically refunded.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-purple-500/[0.03]" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.2}
            width={500}
            height={120}
            rotate={10}
            gradient="from-purple-500/[0.08]"
            className="left-[-10%] top-[10%]"
          />
          <ElegantShape
            delay={0.4}
            width={400}
            height={100}
            rotate={-15}
            gradient="from-purple-400/[0.08]"
            className="right-[-10%] top-[60%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-500/20 text-purple-300 mb-4">Solana Network</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How DexRooms Works</h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              A community-driven platform to crowdfund Dexscreener listings for Solana memecoins. Simple, secure, and
              transparent.
            </p>
          </motion.div>

          {/* Steps Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Three Simple Steps
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <Card className="bg-white/5 border-purple-500/20 h-full">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Platform Features
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-purple-500/20 h-full hover:border-purple-500/40 transition-colors">
                    <CardContent className="p-6">
                      <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-purple-500/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-12"
          >
            <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Your Token Listed?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Join the community of successful Solana memecoins that have secured their Dexscreener listings through
              DexRooms.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-300">48-Hour</div>
                <div className="text-white/60 text-sm">Campaigns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">$300</div>
                <div className="text-white/60 text-sm">Goal</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">Automatic</div>
                <div className="text-white/60 text-sm">Refunds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
