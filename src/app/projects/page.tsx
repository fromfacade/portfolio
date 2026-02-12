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
                        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-1"
                    >
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <Link href={`/projects/${project.slug}`} className="block">
                                    <h2 className="text-xl font-bold group-hover:text-[#f8c946] transition-colors">
                                        {project.title}
                                    </h2>
                                </Link>
                                <div className="flex gap-2">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white transition-colors"
                                            aria-label="GitHub Repo"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white transition-colors"
                                            aria-label="Live Demo"
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
                                className="inline-flex items-center text-sm font-medium text-[#f8c946] hover:underline gap-1 pt-2"
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
