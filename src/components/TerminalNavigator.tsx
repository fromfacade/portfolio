"use client";

import { useTerminal } from "@/hooks/useTerminal";
import { Terminal } from "lucide-react";

export default function TerminalNavigator() {
  const {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyDown,
    inputRef,
    scrollRef
  } = useTerminal(
    <div className="mb-2">
      <span>Welcome to my portfolio v0.1.1</span>
      <br />
      <span>
        Type <span className="text-[#f8c946]">help</span> to see available
        commands.
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm shadow-2xl rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e]">
      {/* Terminal Bar */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-white/40 text-xs flex items-center gap-1">
          <Terminal size={12} />
          <span>visitor@fromfacade: ~</span>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="h-[400px] overflow-y-auto p-4 text-white/90 space-y-2 scrollbar-thin scrollbar-thumb-gray-600"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="break-words">
            {entry.command !== "init" && (
              <div className="flex gap-2 text-white/50">
                <span className="text-green-500">➜</span>
                <span className="text-cyan-400">~</span>
                <span>{entry.command}</span>
              </div>
            )}
            <div className="ml-5 mt-1">{entry.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <span className="text-green-500">➜</span>
          <span className="text-cyan-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-white/90 placeholder-white/20"
            placeholder="Type 'help'..."
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
