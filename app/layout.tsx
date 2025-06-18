import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DexRooms - Community-Powered Dex Listings",
  description:
    "Crowdfund Dexscreener listings for Solana memecoins. Secure escrow, transparent funding, automatic refunds.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "!bg-black !border !border-gray-800",
              title: "!text-white",
              description: "!text-gray-300",
              closeButton:
                "!bg-gray-900 !border-gray-800 !text-white hover:!bg-gray-800",
              success: "!border-emerald-500/30",
              error: "!border-rose-500/30",
              warning: "!border-amber-500/30",
              info: "!border-blue-500/30",
            },
          }}
        />
      </body>
    </html>
  );
}
