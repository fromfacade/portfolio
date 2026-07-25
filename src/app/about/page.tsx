import { Code2, Database, Layout, Terminal } from "lucide-react";
import PolaroidCard from "@/components/PolaroidCard";

export default function AboutPage() {
  const skills = [
    {
      name: "Frontend",
      icon: Layout,
      items: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      name: "Backend",
      icon: Database,
      items: ["Node.js", "PostgreSQL", "MongoDB", "Express", "NoSQL"],
    },
    {
      name: "Tools",
      icon: Terminal,
      items: ["Git", "Linux", "VS Code", "Vercel"],
    },
  ];

  return (
    <div className="container-custom max-w-6xl space-y-24">
      {/* Intro Section with Polaroids */}
      <section className="flex flex-col lg:flex-row gap-12 items-center lg:items-start animate-fade-in-up">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            About <span className="text-[#f8c946]">Me</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
            I’m <span className="text-white font-medium">Luis Castellanos</span>
            , a Computer Science & Engineering student at UC Santa Cruz. I build
            software that balances performance, aesthetics, and usability.
          </p>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            When I&apos;m not coding, I&apos;m usually optimizing my desk setup, exploring
            new tech, or trying to find the perfect mechanical keyboard switch.
          </p>
        </div>

        {/* Polaroid Cluster */}
        <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end relative min-h-[300px] lg:min-h-[400px]">
          <div className="relative w-full max-w-[400px] lg:max-w-[500px] flex flex-col items-center lg:block">
            {/* Photo 1: Hidden on small mobile? No, stack them. */}
            <PolaroidCard
              src="/photos/me.jpg"
              alt="Photo of Luis Castellanos"
              caption="Luis"
            />
          </div>
        </div>
      </section>

      {/* Skills Snapshot */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="p-6 bg-[#1e1e1e] border border-white/5 rounded-2xl hover:border-[#f8c946]/20 transition-all"
          >
            <div className="flex items-center gap-3 mb-4 text-[#f8c946]">
              <skill.icon size={24} />
              <h3 className="text-lg font-bold">{skill.name}</h3>
            </div>
            <ul className="space-y-2">
              {skill.items.map((item) => (
                <li
                  key={item}
                  className="text-white/60 text-sm flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Motivation */}
      <section
        className="space-y-6 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center gap-4 text-[#f8c946]">
          <Code2 size={24} />
          <h2 className="text-2xl font-bold">The &quot;Why&quot;</h2>
        </div>
        <div className="prose prose-invert max-w-none text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            My journey into tech wasn&apos;t just about learning syntax; it was about
            the power to create. I started with simple scripts and quickly grew
            obsessed with how software can solve real-world problems.
          </p>
          <p>
            Whether it&apos;s optimizing a backend query or perfecting a UI
            transition, I treat every line of code as an opportunity to improve
            the user experience. I&apos;m currently looking for roles where I can
            contribute to impactful projects and continue growing as an
            engineer.
          </p>
        </div>
      </section>
    </div>
  );
}
