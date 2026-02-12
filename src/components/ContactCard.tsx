import { LucideIcon } from "lucide-react";

interface ContactCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    href: string;
    color?: string;
}

export default function ContactCard({ icon: Icon, title, value, href, color = "#ffffff" }: ContactCardProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 bg-[#1e1e1e] border border-white/5 rounded-2xl hover:border-[#f8c946]/50 hover:bg-[#2d2d2d] transition-all duration-300"
        >
            <div
                className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ color: color }}
            >
                <Icon size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-white/40 text-sm group-hover:text-white/70 transition-colors">
                {value}
            </p>
        </a>
    );
}
