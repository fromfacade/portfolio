import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft, Github, Globe, CheckCircle } from "lucide-react";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container-custom">
            <Link
                href="/projects"
                className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" /> Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        <p className="text-xl text-white/70 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-[#f8c946]">Highlights</h3>
                        <ul className="space-y-3">
                            {project.highlights.map((highlight, index) => (
                                <li key={index} className="flex gap-3 text-white/80">
                                    <CheckCircle size={20} className="text-[#f8c946] shrink-0 mt-1" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    <Github size={20} /> View Source
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/20 px-4 py-2.5 rounded-lg font-medium hover:bg-[#f8c946]/20 transition-colors"
                                >
                                    <Globe size={20} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
