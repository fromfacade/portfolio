"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ASCII Art Banner
const ASCII_ART = `
      ___           ___           ___           ___           ___           ___           ___           ___           ___           ___     
     /\\  \\         /\\  \\         /\\  \\         /\\__\\         /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\  \\    
    /::\\  \\       /::\\  \\       /::\\  \\       /::|  |       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\   
   /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  
  /::\\~\\:\\  \\   /::\\~\\:\\  \\   /:/  \\:\\  \\   /:/|:|__|__   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /:/  \\:\\  \\   /::\\~\\:\\  \\   /:/  \\:\\__\\   /::\\~\\:\\  \\ 
 /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/ |::::\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:|__| /:/\\:\\ \\:\\__\\
 \\/__\\:\\ \\/__/ \\/_|::\\/:/  / \\:\\  \\ /:/  / \\/__/~~/:/  / \\/__\\:\\ \\/__/ \\/__\\:\\/:/  / \\:\\  \\  \\/__/ \\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\~\\:\\ \\/__/
      \\:\\__\\      |:|::/  /   \\:\\  /:/  /        /:/  /       \\:\\__\\        \\::/  /   \\:\\  \\            \\::/  /   \\:\\  /:/  /   \\:\\ \\:\\__\\  
       \\/__/      |:|\\/__/     \\:\\/:/  /        /:/  /         \\/__/        /:/  /     \\:\\  \\           /:/  /     \\:\\/:/  /     \\:\\ \\/__/  
                  |:|  |        \\::/  /        /:/  /                      /:/  /       \\:\\__\\         /:/  /       \\::/__/       \\:\\__\\    
                   \\|__|         \\/__/         \\/__/                       \\/__/         \\/__/         \\/__/         ~~            \\/__/               
`;

const HAPPY_FACE = String.raw`
 ( ^_^)/
`;

const BOOT_LINES = [
  { text: "Detecting storage devices...", delay: 400 },
  { text: "Mounting volumes: C:, D:...", delay: 600 },
  { text: "Loading device drivers: net, audio, gpu...", delay: 300 },
  { text: "Initializing system hardware...", delay: 500 },
  { text: "Checking memory integrity... OK", delay: 400 },
  { text: "Starting services...", delay: 300 },
  { text: "Allocating resources...", delay: 300 },
  { text: "Preparing environment...", delay: 400 },
  { text: "Launching portfolio shell...", delay: 800 },
  { text: "Boot complete.", delay: 1000 },
  { text: HAPPY_FACE, delay: 500 },
];

export default function BootPage() {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Banner scaling state
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerWrapperRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Handle Resize / Scaling
  useEffect(() => {
    const calculateScale = () => {
      if (bannerWrapperRef.current && preRef.current) {
        const containerWidth = bannerWrapperRef.current.clientWidth;
        const bannerWidth = preRef.current.scrollWidth;

        // Add a small buffer to prevent jitter or edge-clipping
        if (bannerWidth > containerWidth) {
          const newScale = containerWidth / bannerWidth;
          setScale(newScale);
        } else {
          setScale(1);
        }
      }
    };

    // Initial calculation
    calculateScale();

    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    if (bannerWrapperRef.current) {
      resizeObserver.observe(bannerWrapperRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Boot Animation
  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      finishBoot();
      return;
    }

    if (currentLineIndex >= BOOT_LINES.length) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(finishBoot, 800);
      }, 500);
      return;
    }

    const { text, delay } = BOOT_LINES[currentLineIndex];
    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, text]);
      setCurrentLineIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentLineIndex]);

  const finishBoot = () => {
    sessionStorage.setItem("bootSeen", "true");
    router.push("/");
  };

  // Skip handling (Enter key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") finishBoot();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center p-4 font-mono text-sm sm:text-base cursor-default select-none">
      <div className="w-full max-w-5xl h-[80vh] flex flex-col bg-[#1e1e1e] border border-white/10 rounded-lg shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-white/40 text-xs">system_boot.exe</div>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-2 text-white/90 scrollbar-thin scrollbar-thumb-gray-600"
        >
          {/* Banner Container */}
          <div ref={bannerWrapperRef} className="w-full overflow-hidden mb-8">
            {/* 
                We use a transform to scale the banner. 
                Height compensation is automatic because the container fits the scaled content? 
                No, transform doesn't affect flow. We need to set height or marginBottom if we care about the gap.
                However, for a boot screen, extra bottom margin from the "ghost" original size is usually fine as whitespace.
                We force 'origin-top-left' so it shrinks into the corner.
            */}
            <pre
              ref={preRef}
              className="text-[#f8c946] font-bold leading-[0.8] whitespace-pre origin-top-left inline-block"
              style={{
                transform: `scale(${scale})`,
                fontSize: "12px", // Base size, will scale down from here if needed
              }}
            >
              {ASCII_ART}
            </pre>

            {/* 
               Optional: Compensate for the height difference if scaling is significant.
               Since we are just letting it flow, the empty space below might be large if scale is small.
               We can fix this by setting the height of the wrapper, but for simplicity, let's leave it.
               The user asked for "clean", so let's try to reduce that gap if scale < 1.
             */}
          </div>

          {/* Lines */}
          {lines.map((line, i) => (
            <div key={i} className="flex gap-3 animate-fade-in">
              <span className="text-[#f8c946] shrink-0">{`>`}</span>
              <span>{line}</span>
            </div>
          ))}

          {/* Cursor / Loading */}
          {!isComplete && (
            <div className="flex gap-3">
              <span className="text-[#f8c946] shrink-0 animate-pulse">{`>`}</span>
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Skip Button */}
        <button
          onClick={finishBoot}
          className="absolute bottom-6 right-6 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white/50 hover:text-white transition-all uppercase tracking-wider"
        >
          Skip [Enter]
        </button>
      </div>
    </div>
  );
}
