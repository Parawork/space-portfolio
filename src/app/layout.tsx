import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Footer, Navbar } from "@/components/layout";
import { StarsCanvas } from "@/components/ui";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <StarsCanvas />
        <Navbar />
        <div
          className="mx-auto w-full px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1400px" }}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
