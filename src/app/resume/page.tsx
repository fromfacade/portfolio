import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    return (
        <div className="container-custom h-[calc(100dvh-8rem)] flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <Link
                    href="/contact"
                    className="flex items-center h-11 -my-2.5 text-sm text-white/50 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back
                </Link>

                <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#f8c946] text-black font-semibold rounded-lg hover:bg-[#ffe083] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    <Download size={18} /> Download PDF
                </a>
            </div>

            {/* Mobile-friendly fallback: embedded PDFs are unreliable on many phone browsers. */}
            <div className="sm:hidden mb-4 rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                <p className="text-sm text-white/60">
                    PDF previews can be unreliable on mobile browsers. Open it directly instead:
                </p>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-11 px-4 bg-[#f8c946] text-black font-semibold rounded-lg hover:bg-[#ffe083] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    <ExternalLink size={18} /> Open Resume in New Tab
                </a>
            </div>

            <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                    src="/resume.pdf"
                    className="w-full h-full"
                    title="Resume Preview"
                />
            </div>
        </div>
    );
}
