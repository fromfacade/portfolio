import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

interface ArchitectureDiagramProps {
  steps: string[];
  variant?: "current" | "planned";
  label?: string;
}

export default function ArchitectureDiagram({
  steps,
  variant = "current",
  label,
}: ArchitectureDiagramProps) {
  const isPlanned = variant === "planned";

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white/70">{label}</p>
          {isPlanned && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-dashed border-white/30 text-white/50">
              Planned
            </span>
          )}
        </div>
      )}
      <div
        className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2"
        role="list"
        aria-label={`${label ?? "Architecture"} flow diagram${isPlanned ? " (planned, not yet built)" : ""}`}
      >
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div
              role="listitem"
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm text-center break-words ${
                isPlanned
                  ? "border border-dashed border-white/20 text-white/50 bg-white/[0.02]"
                  : "border border-white/10 bg-white/5 text-white/80"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <ArrowRight
                size={16}
                className="text-white/30 shrink-0 self-center rotate-90 sm:rotate-0"
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
