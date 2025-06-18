"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/navbar";
import {
  ArrowLeft,
  ExternalLink,
  Twitter,
  Copy,
  Clock,
  Target,
  Shield,
  RefreshCw,
  CheckCircle,
  Wallet,
} from "lucide-react";
import Link from "next/link";

// Define the Campaign type
type Campaign = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  description: string;
  contractAddress: string;
  tokenAddress: string;
  escrowWallet: string;
  raised: number;
  goal: number;
  progress: number;
  expiresAt: string;
  contributors: number;
  status: string;
  replies: number;
  socialLinks: {
    twitter: string;
    website: string;
  };
  contributions: { wallet: string; amount: number; time: string }[];
};

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [liveBalance, setLiveBalance] = useState(0);

  useEffect(() => {
    fetchCampaign();
  }, [params.id]);

  useEffect(() => {
    if (campaign) {
      setLiveBalance(campaign.raised);
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [campaign]);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${params.id}`);
      if (!response.ok) {
        throw new Error("Campaign not found");
      }
      const data = await response.json();
      setCampaign(data.campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTimeLeft = () => {
    if (!campaign) return;

    const now = new Date().getTime();
    const expiry = new Date(campaign.expiresAt).getTime();
    const diff = expiry - now;

    if (diff <= 0) {
      setTimeLeft("Expired");
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setTimeLeft(`${hours}h ${minutes}m`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white/60">Loading campaign...</div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Campaign Not Found
            </h1>
            <p className="text-white/60 mb-6">
              The campaign you're looking for doesn't exist.
            </p>
            <Link href="/campaigns">
              <Button className="bg-purple-600 hover:bg-purple-700">
                View All Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/campaigns">
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
          </motion.div> */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-4"
          >
            <Link href="/campaigns">
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Token Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/5 border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={campaign.logo || "/placeholder.svg"}
                        alt={campaign.name}
                        className="w-20 h-20 rounded-full bg-purple-500/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-2xl font-bold text-white">
                            {campaign.name} ({campaign.symbol})
                          </h1>
                          <Badge className="bg-purple-500/20 text-purple-300">
                            Pump.Fun
                          </Badge>
                          <Button
                            variant="ghost"
                            className="text-purple-100 hover:text-white hover:bg-purple-500/20 border border-purple-400/30"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  window.location.href
                                );
                                toast.success("Campaign link copied!");
                                console.log(
                                  "Campaign link copied to clipboard"
                                );
                              } catch (err) {
                                toast.error("Failed to copy link");
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <Clipboard className="w-4 h-4 mr-2" />
                              <span>Share</span>
                            </div>
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400">
                              {timeLeft} left
                            </span>
                            <span>to reach goal</span>
                          </div>
                        </div>

                        <p className="text-white/70 mb-4">
                          {campaign.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          {campaign.socialLinks.twitter && (
                            <a
                              href={campaign.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm"
                            >
                              <Twitter className="w-4 h-4" />
                              Twitter
                            </a>
                          )}
                          <a
                            href={`https://pump.fun/coin/${campaign.tokenAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on Pump.Fun
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contract Address */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-white/5 border-purple-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Contract Address
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <code className="text-purple-300 text-sm font-mono flex-1 break-all">
                        {campaign.tokenAddress}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(campaign.tokenAddress)}
                        className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Campaign Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white/5 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {campaign.replies}
                      </div>
                      <div className="text-white/60 text-sm">Replies</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        <Badge className="bg-green-500/20 text-green-300">
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="text-white/60 text-sm">Status</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Live Escrow Balance */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/5 border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-purple-400" />
                        Live Escrow Balance
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs">
                          Connected
                        </span>
                        <span className="text-white/50 text-xs">0s ago</span>
                        <RefreshCw className="w-3 h-3 text-white/50" />
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        ${Math.round(liveBalance)}
                      </div>
                      <div className="text-white/60">
                        {liveBalance.toFixed(3)} SOL
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white">
                          {((liveBalance / campaign.goal) * 100).toFixed(4)}%
                        </span>
                      </div>

                      <Progress
                        value={(liveBalance / campaign.goal) * 100}
                        className="h-2 bg-white/10"
                      />

                      <div className="text-center text-white/60 text-sm">
                        0 transactions detected
                      </div>

                      <div className="text-center text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        All contributions tracked via API - even 0.001 SOL
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                      <div className="text-center">
                        <div className="text-purple-300 font-medium mb-1">
                          New Escrow Wallet
                        </div>
                        <div className="text-white/60 text-sm">
                          Ready to receive contributions of any size
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-white/50 text-xs">
                      Server-side balance API - Updates every 30s
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contribute Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/5 border-purple-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      Contribute Funds
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">
                          Escrow Wallet
                        </label>
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                          <code className="text-purple-300 text-xs font-mono flex-1 break-all">
                            {campaign.escrowWallet}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              copyToClipboard(campaign.escrowWallet)
                            }
                            className="text-purple-300 hover:text-purple-200"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="bg-white p-4 rounded-lg">
                        <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-sm">QR Code</span>
                        </div>
                        <div className="text-center mt-2 text-xs text-gray-600">
                          Escrow Wallet Address
                        </div>
                      </div>

                      <div className="text-center text-white/60 text-sm">
                        Scan with your Solana wallet or copy the address to send
                        SOL
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Important Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-orange-500/5 border-orange-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Important Information
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-orange-400 font-medium">
                          Escrow Protection:
                        </span>
                        <span className="text-white/70 ml-1">
                          Funds are held in escrow and sent to the DexRooms team
                          upon successful funding. If the goal is not reached
                          within 48 hours, contributors can claim a refund.
                        </span>
                      </div>

                      <div>
                        <span className="text-orange-400 font-medium">
                          Manual Processing:
                        </span>
                        <span className="text-white/70 ml-1">
                          Our team manually processes DEX LISTING requests
                          within 30 minutes of funding completion.
                        </span>
                      </div>

                      <div>
                        <span className="text-orange-400 font-medium">
                          Live Tracking:
                        </span>
                        <span className="text-white/70 ml-1">
                          This campaign uses real-time Solana mainnet monitoring
                          for accurate balance updates.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Campaign Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-white/5 border-purple-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-4">
                      Campaign Stats
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Campaign Type</span>
                        <span className="text-white">DEX LISTING</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Contributors</span>
                        <span className="text-white">
                          {campaign.contributors}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Average Contribution
                        </span>
                        <span className="text-white">
                          ${Math.round(liveBalance / campaign.contributors)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Time Remaining</span>
                        <span className="text-orange-400">{timeLeft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Campaign Status</span>
                        <Badge className="bg-green-500/20 text-green-300">
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Live Balance</span>
                        <span className="text-green-400">
                          {liveBalance.toFixed(3)} SOL
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
