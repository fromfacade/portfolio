"use client";

import { useId, useState } from "react";
import ArchitectureDiagram from "../ArchitectureDiagram";

type TabKey = "health" | "signup" | "queue";

const TABS: { key: TabKey; label: string }[] = [
  { key: "health", label: "GET /health" },
  { key: "signup", label: "POST /signup" },
  { key: "queue", label: "Planned Queue Flow" },
];

const HEALTH_RESPONSE = JSON.stringify(
  { status: "healthy", database: "configured" },
  null,
  2,
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIMULATED_EXISTING_EMAIL = "taken@example.com";

export default function TaskFlowDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>("health");
  const tabListId = useId();

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        This panel is an architectural simulation for portfolio purposes only. It runs entirely in
        your browser and does not call the real TaskFlow backend.
      </p>

      <div
        role="tablist"
        aria-label="TaskFlow API simulator"
        id={tabListId}
        className="flex flex-wrap gap-2 border-b border-white/10 pb-3"
      >
        {TABS.map((tab) => {
          const selected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`${tabListId}-${tab.key}-tab`}
              aria-selected={selected}
              aria-controls={`${tabListId}-${tab.key}-panel`}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-3 py-2 min-h-11 text-sm font-medium font-mono transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
                selected
                  ? "bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/30"
                  : "text-white/60 border border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tabListId}-${activeTab}-panel`}
        aria-labelledby={`${tabListId}-${activeTab}-tab`}
      >
        {activeTab === "health" && <HealthPanel />}
        {activeTab === "signup" && <SignupPanel />}
        {activeTab === "queue" && <QueuePanel />}
      </div>
    </div>
  );
}

function ResponseBlock({ label, code }: { label: string; code: string }) {
  return (
    <div aria-live="polite" className="space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wider text-white/40">{label}</p>
      <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#1e1e1e] p-3 text-xs text-white/80 font-mono whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  );
}

function HealthPanel() {
  const [response, setResponse] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/60">
        Simulates the current <code className="text-white/80">/health</code> endpoint response.
      </p>
      <button
        type="button"
        onClick={() => setResponse(HEALTH_RESPONSE)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f8c946] px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#f8c946]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
      >
        Send Request
      </button>
      {response && <ResponseBlock label="200 OK" code={response} />}
    </div>
  );
}

function SignupPanel() {
  const emailId = useId();
  const passwordId = useId();
  const duplicateId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [simulateDuplicate, setSimulateDuplicate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<{ status: string; body: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponse(null);

    if (!EMAIL_PATTERN.test(email)) {
      setError("Enter a value that looks like a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError(null);

    if (simulateDuplicate || email.toLowerCase() === SIMULATED_EXISTING_EMAIL) {
      setResponse({
        status: "409 Conflict",
        body: JSON.stringify({ detail: "Email already registered" }, null, 2),
      });
      return;
    }

    setResponse({
      status: "201 Created",
      body: JSON.stringify(
        {
          id: "sample-user-1",
          email,
          created_at: new Date().toISOString(),
        },
        null,
        2,
      ),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="text-sm text-white/60">
        Values entered here are never sent or stored anywhere — this only runs local validation
        logic and shows a simulated response.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor={emailId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={passwordId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Password
          </label>
          <input
            id={passwordId}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          />
        </div>
      </div>

      <label htmlFor={duplicateId} className="flex items-center gap-2 py-2 -my-2 text-sm text-white/60 cursor-pointer">
        <input
          id={duplicateId}
          type="checkbox"
          checked={simulateDuplicate}
          onChange={(event) => setSimulateDuplicate(event.target.checked)}
          className="h-4 w-4 shrink-0 accent-[#f8c946]"
        />
        Simulate a duplicate-email response
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f8c946] px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#f8c946]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
      >
        Send Request
      </button>

      {error && (
        <p role="alert" className="text-sm text-amber-300">
          {error}
        </p>
      )}

      {response && <ResponseBlock label={response.status} code={response.body} />}
    </form>
  );
}

function QueuePanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/60">
        This is the intended architecture for background job processing. None of the boxes below
        with a dashed border and a &quot;Planned&quot; label exist in the codebase yet.
      </p>
      <ArchitectureDiagram
        steps={["API Request", "PostgreSQL Job Record", "Queue", "Worker", "Result or Retry"]}
        variant="planned"
        label="Planned queue architecture"
      />
    </div>
  );
}
