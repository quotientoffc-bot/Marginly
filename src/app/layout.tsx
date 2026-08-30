import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedRays } from "@/components/ui/animated-rays";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marginly | Premium Scope & Quote Management",
  description: "AI-powered quoting, client-request, and scope monitor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jbMono.variable} antialiased min-h-screen selection:bg-white/20 selection:text-white bg-black text-white font-sans`} suppressHydrationWarning>
        <AnimatedRays className="absolute inset-0 z-0 pointer-events-none opacity-50" />
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
