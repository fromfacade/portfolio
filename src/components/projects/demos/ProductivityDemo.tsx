"use client";

import { useEffect, useId, useRef, useState } from "react";

type TabKey = "planner" | "habits" | "focus" | "notes" | "progress";

const TABS: { key: TabKey; label: string; shortLabel?: string }[] = [
  { key: "planner", label: "Daily Planner", shortLabel: "Planner" },
  { key: "habits", label: "Habits" },
  { key: "focus", label: "Focus" },
  { key: "notes", label: "Notes" },
  { key: "progress", label: "Progress" },
];

interface SampleTask {
  id: string;
  label: string;
}

const INITIAL_TASKS: SampleTask[] = [
  { id: "task-1", label: "Review pull requests" },
  { id: "task-2", label: "Write project documentation" },
  { id: "task-3", label: "30 minute workout" },
  { id: "task-4", label: "Plan tomorrow's priorities" },
];

interface SampleHabit {
  id: string;
  label: string;
  streak: number;
}

const INITIAL_HABITS: SampleHabit[] = [
  { id: "habit-1", label: "Read for 20 minutes", streak: 12 },
  { id: "habit-2", label: "No phone before bed", streak: 5 },
  { id: "habit-3", label: "Stretch after waking up", streak: 8 },
];

const FOCUS_PRESETS = [25, 45, 60];

function gradeFor(percent: number): string {
  if (percent === 100) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 60) return "B";
  if (percent >= 40) return "C";
  return "D";
}

export default function ProductivityDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>("planner");
  const tabListId = useId();

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        Desktop app walkthrough — a simplified, in-browser simulation of the real Windows
        application. Nothing here is saved once the page reloads.
      </p>

      <div
        role="tablist"
        aria-label="Productivity app sections"
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
              className={`rounded-full px-3 py-2 min-h-11 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
                selected
                  ? "bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/30"
                  : "text-white/60 border border-white/10 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.shortLabel ? (
                <>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </>
              ) : (
                tab.label
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tabListId}-${activeTab}-panel`}
        aria-labelledby={`${tabListId}-${activeTab}-tab`}
      >
        {activeTab === "planner" && <PlannerPanel />}
        {activeTab === "habits" && <HabitsPanel />}
        {activeTab === "focus" && <FocusPanel />}
        {activeTab === "notes" && <NotesPanel />}
        {activeTab === "progress" && <ProgressPanel />}
      </div>
    </div>
  );
}

function PlannerPanel() {
  const [tasks, setTasks] = useState(() =>
    INITIAL_TASKS.map((task) => ({ ...task, done: false })),
  );

  const completed = tasks.filter((task) => task.done).length;
  const percent = Math.round((completed / tasks.length) * 100);

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm cursor-pointer hover:bg-white/[0.06] transition-colors">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks((prev) =>
                    prev.map((item) =>
                      item.id === task.id ? { ...item, done: !item.done } : item,
                    ),
                  )
                }
                className="h-4 w-4 accent-[#f8c946]"
              />
              <span className={task.done ? "text-white/40 line-through" : "text-white/80"}>
                {task.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div
        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
        aria-live="polite"
      >
        <span className="text-white/50">Sample daily grade</span>
        <span className="font-semibold text-[#f8c946]">
          {gradeFor(percent)} · {percent}% complete
        </span>
      </div>
    </div>
  );
}

function HabitsPanel() {
  const [habits, setHabits] = useState(() =>
    INITIAL_HABITS.map((habit) => ({ ...habit, doneToday: false })),
  );

  return (
    <ul className="space-y-2">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm"
        >
          <div>
            <p className="text-white/80">{habit.label}</p>
            <p className="text-xs text-white/40">{habit.streak} day sample streak</p>
          </div>
          <button
            type="button"
            aria-pressed={habit.doneToday}
            onClick={() =>
              setHabits((prev) =>
                prev.map((item) =>
                  item.id === habit.id ? { ...item, doneToday: !item.doneToday } : item,
                ),
              )
            }
            className={`shrink-0 rounded-full px-3 py-2 min-h-9 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
              habit.doneToday
                ? "bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/30"
                : "text-white/60 border border-white/10 hover:text-white"
            }`}
          >
            {habit.doneToday ? "Done today" : "Mark done"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function FocusPanel() {
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0;
  const seconds = secondsLeft !== null ? secondsLeft % 60 : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FOCUS_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setSelectedMinutes(preset);
              setSecondsLeft(preset * 60);
              setIsRunning(false);
            }}
            aria-pressed={selectedMinutes === preset}
            className={`rounded-lg px-4 py-2.5 min-h-11 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
              selectedMinutes === preset
                ? "bg-[#f8c946]/10 text-[#f8c946] border border-[#f8c946]/30"
                : "text-white/60 border border-white/10 hover:text-white hover:bg-white/5"
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>

      {selectedMinutes !== null && secondsLeft !== null ? (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
          aria-live="polite"
        >
          <span className="font-mono text-2xl text-white">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              disabled={secondsLeft === 0}
              className="rounded-lg border border-white/10 px-3 py-2 min-h-11 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSecondsLeft(selectedMinutes * 60);
                setIsRunning(false);
              }}
              className="rounded-lg border border-white/10 px-3 py-2 min-h-11 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-white/40">Pick a session length to preview a focus timer.</p>
      )}
    </div>
  );
}

function NotesPanel() {
  const [notes, setNotes] = useState("");
  const notesId = useId();

  return (
    <div className="space-y-2">
      <label htmlFor={notesId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
        Scratchpad (not saved)
      </label>
      <textarea
        id={notesId}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Jot something down — this resets when the page reloads."
        rows={5}
        className="w-full resize-none rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white/80 placeholder-white/30 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
      />
    </div>
  );
}

function ProgressPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-white/40">Demonstration data — not tied to a real account.</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard label="Rank" value="Gold II" />
        <StatCard label="Current streak" value="9 days" />
        <StatCard label="Tasks this week" value="27" />
        <StatCard label="Focus sessions" value="14" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center">
      <p className="text-lg font-semibold text-[#f8c946]">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </div>
  );
}
