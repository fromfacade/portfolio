"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TerminalNavigator from "@/components/TerminalNavigator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if boot has been seen in this session
    const bootSeen = sessionStorage.getItem("bootSeen");
    if (!bootSeen) {
      router.replace("/boot");
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) {
    return <div className="min-h-screen bg-[#121212]" />; // Blank loading state to prevent flash
  }

  return (
    <div className="container-custom flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] gap-10">
      <div className="text-center space-y-4 max-w-2xl animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Luis <span className="text-[#f8c946]">Castellanos</span>
        </h1>
        <p className="text-xl text-white/60">
          Upcoming Full-Stack Software Engineer. <br />
          CSE Student at UC Santa Cruz.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/projects"
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center gap-2"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full border border-white/20 hover:border-[#f8c946] hover:text-[#f8c946] transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="w-full animate-fade-in text-left">
        <div className="text-center mb-4 text-sm text-white/40">
          Try the terminal below or use the menu above to navigate.
        </div>
        <TerminalNavigator />
      </div>
    </div>
  );
}
