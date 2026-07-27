import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectDemo from "@/components/projects/ProjectDemo";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ArchitectureDiagram from "@/components/projects/ArchitectureDiagram";

type ProjectDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Every valid project lives in the `projects` array above, so any other
// slug can safely 404 instead of attempting on-demand rendering.
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Luis Castellanos`,
        description: project.shortTagline ?? project.description,
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = await params;
    const projectIndex = projects.findIndex((item) => item.slug === slug);

    if (projectIndex === -1) {
        notFound();
    }

    const project = projects[projectIndex];
    const previous = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
    const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;
    const architecture = project.architecture;
    const features = project.features;
    const challenges = project.challenges;
    const lessons = project.lessons;
    const implemented = project.implemented;
    const plannedWork = project.plannedWork;

    return (
        <div className="container-custom space-y-16">
            <Link
                href="/projects"
                className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
                <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Back to Projects
            </Link>

            <ProjectHero project={project} />

            {project.demoType && (
                <ProjectSection
                    id="preview"
                    eyebrow="Interactive project walkthrough"
                    title="Interactive Preview"
                >
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 overflow-x-hidden space-y-4">
                        {project.demoTitle && (
                            <h3 className="text-lg font-semibold text-white">{project.demoTitle}</h3>
                        )}
                        <ProjectDemo project={project} />
                    </div>
                </ProjectSection>
            )}

            {(project.overview || project.role) && (
                <ProjectSection id="overview" title="Project Overview">
                    {project.overview && (
                        <p className="text-white/70 leading-relaxed max-w-3xl">{project.overview}</p>
                    )}
                    {project.role && (
                        <div className="rounded-lg border border-white/10 bg-white/5 p-4 max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                                My Role
                            </p>
                            <p className="text-sm text-white/70">{project.role}</p>
                        </div>
                    )}
                    {project.disclaimer && (
                        <p className="text-xs text-white/40 leading-relaxed max-w-3xl border-l-2 border-white/10 pl-3">
                            {project.disclaimer}
                        </p>
                    )}
                </ProjectSection>
            )}

            {(project.problem || project.solution) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {project.problem && (
                        <ProjectSection id="problem" title="The Problem">
                            <p className="text-white/70 leading-relaxed">{project.problem}</p>
                        </ProjectSection>
                    )}
                    {project.solution && (
                        <ProjectSection id="solution" title="The Solution">
                            <p className="text-white/70 leading-relaxed">{project.solution}</p>
                        </ProjectSection>
                    )}
                </div>
            )}

            {features && features.length > 0 && (
                <ProjectSection id="features" title="Key Features">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1.5"
                            >
                                <h3 className="font-semibold text-white">{feature.title}</h3>
                                <p className="text-sm text-white/60">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </ProjectSection>
            )}

            {architecture && (
                <ProjectSection id="architecture" title="Technical Architecture">
                    <div className="space-y-6">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-x-auto">
                            <ArchitectureDiagram
                                steps={architecture.current}
                                label={architecture.planned ? "Currently implemented" : undefined}
                            />
                        </div>

                        {architecture.planned && (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-x-auto">
                                <ArchitectureDiagram
                                    steps={architecture.planned}
                                    variant="planned"
                                    label="Planned architecture"
                                />
                            </div>
                        )}
                    </div>

                    {(implemented || plannedWork) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                            {implemented && implemented.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-white/70">
                                        Currently Implemented
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {implemented.map((item) => (
                                            <li key={item} className="flex gap-2 text-sm text-white/60">
                                                <CheckCircle2
                                                    size={16}
                                                    className="shrink-0 mt-0.5 text-[#f8c946]"
                                                    aria-hidden="true"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {plannedWork && plannedWork.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                                        Planned Architecture
                                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-dashed border-white/30 text-white/50">
                                            Planned
                                        </span>
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {plannedWork.map((item) => (
                                            <li key={item} className="flex gap-2 text-sm text-white/40">
                                                <span
                                                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-dashed border-white/30"
                                                    aria-hidden="true"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </ProjectSection>
            )}

            {project.highlights.length > 0 && (
                <ProjectSection id="highlights" title="Engineering Highlights">
                    <ul className="space-y-3">
                        {project.highlights.map((highlight, index) => (
                            <li key={index} className="flex gap-3 text-white/80">
                                <CheckCircle2
                                    size={20}
                                    className="text-[#f8c946] shrink-0 mt-1"
                                    aria-hidden="true"
                                />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </ProjectSection>
            )}

            {((challenges && challenges.length > 0) || (lessons && lessons.length > 0)) && (
                <ProjectSection id="challenges" title="Challenges and Lessons">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {challenges && challenges.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-white/70">Challenges</h3>
                                <ul className="space-y-2">
                                    {challenges.map((challenge, index) => (
                                        <li key={index} className="text-sm text-white/60 leading-relaxed">
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {lessons && lessons.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-white/70">Lessons Learned</h3>
                                <ul className="space-y-2">
                                    {lessons.map((lesson, index) => (
                                        <li key={index} className="text-sm text-white/60 leading-relaxed">
                                            {lesson}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </ProjectSection>
            )}

            <ProjectNavigation previous={previous} next={next} />
        </div>
    );
}
