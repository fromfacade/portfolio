import { ReactNode } from "react";

interface ProjectSectionProps {
  title: string;
  eyebrow?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function ProjectSection({
  title,
  eyebrow,
  id,
  children,
  className,
}: ProjectSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`space-y-4 scroll-mt-24 ${className ?? ""}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
          {eyebrow}
        </p>
      )}
      <h2 id={headingId} className="text-2xl font-semibold text-[#f8c946]">
        {title}
      </h2>
      {children}
    </section>
  );
}
