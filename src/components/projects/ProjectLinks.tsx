import { Github, Globe } from "lucide-react";

interface ProjectLinksProps {
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  className?: string;
}

export default function ProjectLinks({
  title,
  githubUrl,
  liveUrl,
  className,
}: ProjectLinksProps) {
  if (!githubUrl && !liveUrl) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          aria-label={`View ${title} source code on GitHub`}
        >
          <Github size={18} /> View Source
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/20 px-4 py-2.5 rounded-lg font-medium hover:bg-[#f8c946]/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          aria-label={`View ${title} live demo`}
        >
          <Globe size={18} /> Live Demo
        </a>
      )}
    </div>
  );
}
