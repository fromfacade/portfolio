import { Project } from "@/data/projects";
import ProjectLinks from "./ProjectLinks";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        {project.status && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f8c946]" aria-hidden="true" />
            {project.status}
          </span>
        )}
      </div>

      <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
        {project.shortTagline ?? project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <ProjectLinks
        title={project.title}
        githubUrl={project.githubUrl}
        liveUrl={project.liveUrl}
      />
    </header>
  );
}
