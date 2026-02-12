import { Code2, Database, Layout, Terminal } from "lucide-react";

export default function AboutPage() {
    const skills = [
        { name: "Frontend", icon: Layout, items: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
        { name: "Backend", icon: Database, items: ["Node.js", "PostgreSQL", "MongoDB", "Express"] },
        { name: "Tools", icon: Terminal, items: ["Git", "Linux", "VS Code", "Vercel"] },
    ];

    return (
        <div className="container-custom max-w-4xl space-y-20">
            {/* Intro Section */}
            <section className="space-y-6 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                    About <span className="text-[#f8c946]">Me</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
                    I’m <span className="text-white font-medium">Luis Castellanos</span>, a Computer Science & Engineering student at UC Santa Cruz.
                    I build software that balances performance, aesthetics, and usability.
                </p>
            </section>

            {/* Skills Snapshot */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                {skills.map((skill) => (
                    <div key={skill.name} className="p-6 bg-[#1e1e1e] border border-white/5 rounded-2xl hover:border-[#f8c946]/20 transition-all">
                        <div className="flex items-center gap-3 mb-4 text-[#f8c946]">
                            <skill.icon size={24} />
                            <h3 className="text-lg font-bold">{skill.name}</h3>
                        </div>
                        <ul className="space-y-2">
                            {skill.items.map((item) => (
                                <li key={item} className="text-white/60 text-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Motivation */}
            <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-4 text-[#f8c946]">
                    <Code2 size={24} />
                    <h2 className="text-2xl font-bold">The "Why"</h2>
                </div>
                <div className="prose prose-invert max-w-none text-white/70 text-lg leading-relaxed space-y-4">
                    <p>
                        My journey into tech wasn't just about learning syntax; it was about the power to create.
                        I started with simple scripts and quickly grew obsessed with how software can solve real-world problems.
                    </p>
                    <p>
                        Whether it's optimizing a backend query or perfecting a UI transition, I treat every line of code as an opportunity to improve the user experience.
                        I'm currently looking for roles where I can contribute to impactful projects and continue growing as an engineer.
                    </p>
                </div>
            </section>
        </div>
    );
}
