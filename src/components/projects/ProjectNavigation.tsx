import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectNavItem {
  title: string;
  slug: string;
}

interface ProjectNavigationProps {
  previous?: ProjectNavItem;
  next?: ProjectNavItem;
}

export default function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="More projects"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10"
    >
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          className="group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
        >
          <ArrowLeft
            size={18}
            className="text-white/40 group-hover:text-[#f8c946] transition-colors shrink-0"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block text-xs text-white/40 uppercase tracking-wider">
              Previous
            </span>
            <span className="block truncate font-medium group-hover:text-[#f8c946] transition-colors">
              {previous.title}
            </span>
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
        >
          <span className="min-w-0">
            <span className="block text-xs text-white/40 uppercase tracking-wider">Next</span>
            <span className="block truncate font-medium group-hover:text-[#f8c946] transition-colors">
              {next.title}
            </span>
          </span>
          <ArrowRight
            size={18}
            className="text-white/40 group-hover:text-[#f8c946] transition-colors shrink-0"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
}
