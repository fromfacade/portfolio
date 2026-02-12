import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingTerminal from "@/components/FloatingTerminal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Luis Castellanos | Portfolio",
  description: "Computer Science & Engineering student at UC Santa Cruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-[#121212] text-white min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1 pt-20 pb-12">
          {children}
        </main>
        <footer className="py-8 text-center text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Luis Castellanos. Built with Next.js & Tailwind.</p>
        </footer>
        <FloatingTerminal />
      </body>
    </html>
  );
}
