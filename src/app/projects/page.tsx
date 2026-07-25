import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowRight, Github, Globe } from "lucide-react";

export default function ProjectsPage() {
    return (
        <div className="container-custom">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="text-white/60 max-w-2xl">
                    A selection of projects I&apos;ve worked on, ranging from web applications to system tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <article
                        key={project.slug}
                        className="group h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-1 motion-reduce:hover:-translate-y-0 motion-reduce:transition-none"
                    >
                        <div className="p-6 h-full flex flex-col gap-4">
                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0 flex-1 space-y-2">
                                    <Link href={`/projects/${project.slug}`} className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]">
                                        <h2 className="text-xl font-bold group-hover:text-[#f8c946] transition-colors">
                                            {project.title}
                                        </h2>
                                    </Link>
                                    {project.status && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/20">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#f8c946]" aria-hidden="true" />
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                                            aria-label={`View ${project.title} source code on GitHub`}
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                                            aria-label={`View ${project.title} live demo`}
                                        >
                                            <Globe size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-white/70 text-sm line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60 border border-white/5"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/projects/${project.slug}`}
                                className="mt-auto inline-flex items-center text-sm font-medium text-[#f8c946] hover:underline gap-1 pt-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                            >
                                View Details <ArrowRight size={14} />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
