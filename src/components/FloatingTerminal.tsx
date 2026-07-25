"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTerminal } from "@/hooks/useTerminal";
import { Terminal, X, Maximize2, Minimize2 } from "lucide-react";

export default function FloatingTerminal() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

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
            <span className="text-[#f8c946]">visitor@portfolio:~$</span> welcome
            <br />
            Type <span className="text-[#f8c946]">help</span> for commands.
        </div>
    );

    const isHome = pathname === "/";
    const isBoot = pathname === "/boot";
    const shouldHide = isHome || isBoot;

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleMaximize = () => setIsMaximized(!isMaximized);

    // Focus input when opened, but skip on touch devices so opening the
    // terminal doesn't immediately pop up the on-screen keyboard.
    useEffect(() => {
        const isCoarsePointer =
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: coarse)").matches;

        if (isOpen && !shouldHide && !isCoarsePointer && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, shouldHide, inputRef]);

    // Visibility Logic: Hide completely on Home and Boot path
    return (
        <div className={shouldHide ? "hidden" : "block"}>
            {!isOpen ? (
                // Minimized State (Pill)
                <button
                    type="button"
                    onClick={toggleOpen}
                    style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
                    className="fixed right-4 z-50 flex items-center gap-2 px-4 py-3 bg-[#1e1e1e] border border-white/10 rounded-full shadow-2xl hover:bg-[#2d2d2d] transition-all group animate-fade-in-up motion-reduce:animate-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                    aria-label="Open Terminal"
                >
                    <Terminal size={18} className="text-[#f8c946] group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-mono font-medium text-white/90">_Terminal</span>
                </button>
            ) : (
                // Expanded State (Window)
                <div
                    style={
                        isMaximized
                            ? undefined
                            : {
                                  bottom: "calc(1rem + env(safe-area-inset-bottom))",
                                  right: "1rem",
                              }
                    }
                    className={`fixed z-50 bg-[#1e1e1e]/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out font-mono motion-reduce:transition-none
          ${isMaximized
                            ? "top-20 right-4 bottom-4 left-4 rounded-lg"
                            : "w-[calc(100vw-2rem)] max-w-[400px] h-[400px] max-h-[calc(100dvh-6rem)] rounded-lg"
                        }`}
                >
                    {/* Header */}
                    <div
                        className="bg-[#2d2d2d] px-3 py-2 flex items-center justify-between cursor-pointer border-b border-white/10"
                        onDoubleClick={toggleMaximize}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="flex gap-1.5 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={toggleOpen} />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer" onClick={toggleOpen} />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" onClick={toggleMaximize} />
                            </div>
                            <span className="text-xs text-white/40 ml-2 truncate">luis@portfolio: {pathname === "/" ? "~" : pathname}</span>
                        </div>

                        <div className="flex items-center gap-1 text-white/40 shrink-0">
                            <button
                                type="button"
                                onClick={toggleMaximize}
                                className="flex items-center justify-center h-8 w-8 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                                aria-label={isMaximized ? "Restore terminal" : "Maximize terminal"}
                            >
                                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </button>
                            <button
                                type="button"
                                onClick={toggleOpen}
                                className="flex items-center justify-center h-8 w-8 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
                                aria-label="Close terminal"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-3 text-sm scrollbar-thin scrollbar-thumb-gray-600"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((entry, i) => (
                            <div key={i} className="mb-1 break-words">
                                {entry.command !== "init" && (
                                    <div className="flex text-white/50">
                                        <span className="mr-2 shrink-0 text-[#f8c946]">$</span>
                                        <span className="min-w-0 break-words">{entry.command}</span>
                                    </div>
                                )}
                                <div className="text-white/90 ml-4 min-w-0 break-words">{entry.output}</div>
                            </div>
                        ))}

                        <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
                            <span className="text-[#f8c946]">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none text-white/90 placeholder-white/20 text-base sm:text-sm"
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
