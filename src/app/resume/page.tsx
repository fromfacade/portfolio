import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    return (
        <div className="container-custom h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/contact"
                    className="flex items-center text-sm text-white/50 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back
                </Link>

                <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-[#f8c946] text-black font-semibold rounded-lg hover:bg-[#ffe083] transition-colors"
                >
                    <Download size={18} /> Download PDF
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
