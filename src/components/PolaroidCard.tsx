import Image from "next/image";
import { Patrick_Hand } from "next/font/google";

const handwriting = Patrick_Hand({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

interface PolaroidCardProps {
    src: string;
    alt: string;
    caption: string;
    rotation?: string; // Tailwind class e.g. "rotate-2" or "-rotate-1"
    className?: string; // For absolute positioning
    priority?: boolean;
}

export default function PolaroidCard({
    src,
    alt,
    caption,
    rotation = "rotate-0",
    className = "",
    priority = false,
}: PolaroidCardProps) {
    return (
        <div
            className={`group relative bg-white p-3 pb-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl ${rotation} ${className}`}
            style={{ maxWidth: "280px" }}
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/20 backdrop-blur-[1px] shadow-sm rotate-1 z-20 border border-white/10 opacity-70"></div>

            {/* Tape Detail (Sticky look) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gradient-to-br from-white/30 to-transparent opacity-50 z-20"></div>

            {/* Image Container */}
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden mb-4 filter sepia-[0.2] contrast-[0.9] group-hover:filter-none transition-all duration-500">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                    priority={priority}
                />
                {/* Grain Overlay for Texture */}
                <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* Caption */}
            <div className={`${handwriting.className} text-center text-gray-800 text-xl leading-tight transform -rotate-1`}>
                {caption}
            </div>
        </div>
    );
}
