"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/navbar";
import { ElegantShape } from "@/components/geometric-shapes";
import {
  Search,
  Plus,
  ExternalLink,
  Twitter,
  Globe,
  Copy,
  CheckCircle,
} from "lucide-react";

interface TokenData {
  mint: string;
  name: string;
  symbol: string;
  logo: string;
  description: string;
  links: {
    twitter?: string;
    website?: string;
  };
  fullyDilutedValue: string;
  totalSupplyFormatted: string;
}

export default function CreateCampaignPage() {
  const [searchAddress, setSearchAddress] = useState("");
  const [createAddress, setCreateAddress] = useState("");
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const validateToken = async () => {
    if (!createAddress.trim()) return;

    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
        },
      };

      const response = await fetch(
        `https://solana-gateway.moralis.io/token/mainnet/${createAddress.trim()}/metadata`,
        options
      );

      if (!response.ok) {
        throw new Error("Token not found or invalid address");
      }

      const data = await response.json();

      const mappedTokenData: TokenData = {
        mint: data.mint,
        name: data.name,
        symbol: data.symbol,
        logo: data.logo,
        description: data.description || "No description available",
        fullyDilutedValue: data.fullyDilutedValue,
        totalSupplyFormatted: data.totalSupplyFormatted,
        links: {
          twitter: data.links?.twitter,
          website: data.links?.website,
        },
      };

      setTokenData(mappedTokenData);
      setIsValidated(true);
    } catch (error) {
      console.error("Error validating token:", error);
      alert(
        "Failed to validate token. Please check the contract address and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async () => {
    if (!tokenData) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create campaign");
      }

      // Redirect to the new campaign page
      window.location.href = `/campaign/${data.campaignId}`;
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert(
        error instanceof Error ? error.message : "Failed to create campaign"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative min-h-screen pt-24 overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Launch Your Campaign
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Create a crowdfunding campaign for your Solana token's Dexscreener
              listing
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search Existing Campaigns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Search className="w-5 h-5 text-purple-400" />
                    Search Existing Campaigns
                  </CardTitle>
                  <p className="text-white/60 text-sm">
                    Check if a campaign already exists for your token
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter token contract address..."
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40"
                    />
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Create New Campaign */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Plus className="w-5 h-5 text-purple-400" />
                    Create New Campaign
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="token-address" className="text-white">
                      Token Contract Address
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="token-address"
                        placeholder="Enter the token contract address..."
                        value={createAddress}
                        onChange={(e) => setCreateAddress(e.target.value)}
                        className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/40"
                      />
                      <Button
                        onClick={validateToken}
                        disabled={isLoading || !createAddress.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]"
                      >
                        {isLoading ? "Validating..." : "Validate Token"}
                      </Button>
                    </div>
                    <p className="text-white/50 text-sm">
                      The contract address of the token you want to create a
                      campaign for
                    </p>
                  </div>

                  {/* Token Validation Result */}
                  {tokenData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border border-purple-500/30 rounded-lg p-6 bg-purple-500/5"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={tokenData.logo || "/placeholder.svg"}
                          alt={tokenData.name}
                          className="w-16 h-16 rounded-full bg-purple-500/20"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-white">
                              {tokenData.name} ({tokenData.symbol})
                            </h3>
                            <Badge className="bg-green-500/20 text-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Validated
                            </Badge>
                          </div>

                          <p className="text-white/70 text-sm">
                            {tokenData.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-white/50">Market Cap:</span>
                              <span className="text-white ml-2">
                                ${tokenData.fullyDilutedValue}
                              </span>
                            </div>
                            <div>
                              <span className="text-white/50">
                                Total Supply:
                              </span>
                              <span className="text-white ml-2">
                                {tokenData.totalSupplyFormatted}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {tokenData.links.twitter && (
                              <a
                                href={tokenData.links.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm"
                              >
                                <Twitter className="w-4 h-4" />
                                Twitter
                              </a>
                            )}
                            {tokenData.links.website && (
                              <a
                                href={tokenData.links.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm"
                              >
                                <Globe className="w-4 h-4" />
                                Website
                              </a>
                            )}
                            <a
                              href={`https://pump.fun/coin/${tokenData.mint}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View on Pump.Fun
                            </a>
                          </div>

                          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                            <span className="text-white/50 text-xs">
                              Contract:
                            </span>
                            <code className="text-purple-300 text-xs font-mono flex-1">
                              {tokenData.mint}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-purple-300 hover:text-purple-200"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-purple-500/20">
                        <Button
                          onClick={createCampaign}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                        >
                          {isLoading
                            ? "Creating Campaign..."
                            : `Create Campaign for ${tokenData.symbol}`}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
