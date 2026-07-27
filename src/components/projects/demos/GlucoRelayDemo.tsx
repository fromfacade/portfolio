"use client";

import { useId, useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

type SafetyState = "okay" | "treating" | "follow_up" | "help_needed" | "unknown";

interface Interpretation {
  state: SafetyState;
  summary: string;
  proposedAction: string;
  escalationRequired: boolean;
}

interface TimelineEvent {
  id: string;
  label: string;
  detail: string;
}

const PRESETS = [
  "I already drank some juice and I'm handling it.",
  "I feel confused and I need someone to help me.",
  "I'm okay now.",
  "Recheck me in 10 minutes.",
] as const;

const STATE_LABELS: Record<SafetyState, string> = {
  okay: "Okay",
  treating: "Treating",
  follow_up: "Follow-up scheduled",
  help_needed: "Help needed",
  unknown: "Unknown",
};

function interpretCheckIn(raw: string): Interpretation {
  const text = raw.trim().toLowerCase();

  if (!text) {
    return {
      state: "unknown",
      summary: "Empty check-in received.",
      proposedAction: "Request another response.",
      escalationRequired: false,
    };
  }

  const needsHelp =
    /\b(need help|help me|confused|dizzy|can't|cannot|emergency|someone)\b/.test(text);
  if (needsHelp) {
    return {
      state: "help_needed",
      summary: "Patient reported confusion or an explicit request for assistance.",
      proposedAction: "Escalate to caregiver and open the public status handoff.",
      escalationRequired: true,
    };
  }

  const treating =
    /\b(juice|glucose|treating|handling it|ate|drank|snack|carbs)\b/.test(text);
  if (treating) {
    return {
      state: "treating",
      summary: "Patient indicated they are actively treating a low.",
      proposedAction: "Record treatment and keep the event open for a follow-up check.",
      escalationRequired: false,
    };
  }

  const followUp =
    /\b(recheck|check (me|again)|in \d+\s*(min|minute|minutes)|follow[- ]?up)\b/.test(
      text,
    );
  if (followUp) {
    return {
      state: "follow_up",
      summary: "Patient requested another safety check-in shortly.",
      proposedAction: "Schedule a follow-up timer and wait for the next response.",
      escalationRequired: false,
    };
  }

  const okay = /\b(okay|ok|i'm fine|im fine|all good|feeling better|resolved)\b/.test(text);
  if (okay) {
    return {
      state: "okay",
      summary: "Patient reported that they are okay.",
      proposedAction: "Mark the event as stable and close active treatment tracking.",
      escalationRequired: false,
    };
  }

  return {
    state: "unknown",
    summary: "Response could not be classified with the local keyword rules.",
    proposedAction: "Ask for clarification before changing the event state.",
    escalationRequired: false,
  };
}

export default function GlucoRelayDemo() {
  const inputId = useId();
  const [input, setInput] = useState("");
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [escalated, setEscalated] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const reset = () => {
    setInput("");
    setInterpretation(null);
    setTimeline([]);
    setEscalated(false);
    setAcknowledged(false);
  };

  const submitCheckIn = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const result = interpretCheckIn(trimmed);
    const nextEvents: TimelineEvent[] = [
      {
        id: `checkin-${Date.now()}`,
        label: "Patient check-in",
        detail: trimmed,
      },
      {
        id: `interpret-${Date.now() + 1}`,
        label: "Simulated interpretation",
        detail: `${STATE_LABELS[result.state]} — ${result.summary}`,
      },
      {
        id: `action-${Date.now() + 2}`,
        label: "Proposed action",
        detail: result.proposedAction,
      },
    ];

    if (result.escalationRequired) {
      nextEvents.push({
        id: `escalate-${Date.now() + 3}`,
        label: "Caregiver escalation",
        detail: "Event moved to escalated state. Caregiver acknowledgement is pending.",
      });
      setEscalated(true);
      setAcknowledged(false);
    } else {
      setEscalated(false);
      setAcknowledged(false);
    }

    setInterpretation(result);
    setTimeline(nextEvents);
  };

  const acknowledge = () => {
    setAcknowledged(true);
    setTimeline((prev) => [
      ...prev,
      {
        id: `ack-${Date.now()}`,
        label: "Caregiver acknowledgement",
        detail: "Simulated caregiver acknowledged the escalated event.",
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50">
        This is a local portfolio simulation of the GlucoRelay workflow. It does not contact
        caregivers, process real medical data, or call the production AI service.
      </p>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-white/50">
          Preset check-ins
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setInput(preset)}
              className="min-h-11 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium uppercase tracking-wider text-white/50"
        >
          Patient check-in
        </label>
        <textarea
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={3}
          placeholder="Type a check-in or choose a preset above…"
          className="w-full resize-y rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white/80 placeholder-white/30 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => submitCheckIn(input)}
          disabled={!input.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f8c946] px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#f8c946]/90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
        >
          Submit Check-In
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] w-full sm:w-auto"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Reset
        </button>
      </div>

      <div aria-live="polite" className="space-y-4">
        {interpretation && (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Detected state
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full border ${
                  interpretation.escalationRequired
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    : "bg-[#f8c946]/10 text-[#f8c946] border-[#f8c946]/20"
                }`}
              >
                {interpretation.escalationRequired ? (
                  <AlertTriangle size={14} aria-hidden="true" />
                ) : (
                  <CheckCircle2 size={14} aria-hidden="true" />
                )}
                {STATE_LABELS[interpretation.state]}
              </span>
            </div>

            <dl className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <dt className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  English summary
                </dt>
                <dd className="text-white/80 break-words">{interpretation.summary}</dd>
              </div>
              <div>
                <dt className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Proposed action
                </dt>
                <dd className="text-white/80 break-words">{interpretation.proposedAction}</dd>
              </div>
              <div>
                <dt className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Caregiver escalation
                </dt>
                <dd className="text-white/80">
                  {interpretation.escalationRequired ? "Required" : "Not required"}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {timeline.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white/70">Event timeline</h3>
            <ol className="space-y-2 border-l border-white/10 pl-4">
              {timeline.map((event) => (
                <li key={event.id} className="relative">
                  <span
                    className="absolute -left-[1.35rem] top-1.5 h-2 w-2 rounded-full bg-[#f8c946]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-white/80">{event.label}</p>
                  <p className="text-sm text-white/50 break-words">{event.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {escalated && (
          <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
            <p className="text-sm text-amber-200/90">
              Event escalated. A simulated caregiver status handoff is available.
            </p>
            <button
              type="button"
              onClick={acknowledge}
              disabled={acknowledged}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/40 px-4 py-3 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 w-full sm:w-auto"
            >
              {acknowledged ? "Acknowledged" : "Acknowledge as Caregiver"}
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-white/40 leading-relaxed">
        GlucoRelay is a hackathon prototype and is not a medical device or substitute for
        professional emergency services. Keyword matching here is illustrative only — the real
        system uses Gemma 4 structured output plus deterministic validation.
      </p>
    </div>
  );
}
