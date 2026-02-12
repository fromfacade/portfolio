interface TimelineItemProps {
    year: string;
    title: string;
    subtitle: string;
    description?: string[];
}

export default function Timeline({ items }: { items: TimelineItemProps[] }) {
    return (
        <div className="border-l-2 border-white/10 ml-3 space-y-12">
            {items.map((item, index) => (
                <div key={index} className="relative pl-8 group">
                    {/* Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1e1e1e] border-2 border-[#f8c946] group-hover:bg-[#f8c946] transition-colors shadow-[0_0_10px_rgba(248,201,70,0.2)]" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#f8c946] transition-colors">
                            {item.title}
                        </h3>
                        <span className="font-mono text-sm text-white/40">{item.year}</span>
                    </div>

                    <div className="text-lg text-white/70 font-medium mb-3">
                        {item.subtitle}
                    </div>

                    {item.description && (
                        <ul className="space-y-2 text-white/60 leading-relaxed">
                            {item.description.map((desc, i) => (
                                <li key={i}>• {desc}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
