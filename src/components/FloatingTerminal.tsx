"use client";

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Terminal, Minus, ChevronUp, X, Maximize2, Minimize2 } from "lucide-react";
import { projects } from "@/data/projects";

type CommandHistory = {
    command: string;
    output?: React.ReactNode;
};

export default function FloatingTerminal() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            command: "init",
            output: (
                <div className="mb-2">
                    <span className="text-[#f8c946]">visitor@portfolio:~$</span> welcome
                    <br />
                    Type <span className="text-[#f8c946]">help</span> for commands.
                </div>
            ),
        },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isOpen]);

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleMaximize = () => setIsMaximized(!isMaximized);

    const availableCommands = [
        "help", "clear", "home", "projects", "about",
        "experience", "contact", "resume", "github",
        "linkedin", "email", ...projects.map((p) => p.slug)
    ];

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);

        let output: React.ReactNode | null = null;
        const currentRoute = pathname;

        const navigate = (path: string, label: string) => {
            if (currentRoute === path) {
                output = <span className="text-yellow-400">wait, uh we&apos;re already here...</span>;
            } else {
                output = <span className="text-green-400">Navigating to {label}...</span>;
                router.push(path);
            }
        };

        switch (cleanCmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm text-white/80">
                        <div className="col-span-2 text-[#f8c946] mb-1"> Commands:</div>
                        <div><span className="text-cyan-400">home</span> / <span className="text-cyan-400">about</span></div>
                        <div><span className="text-cyan-400">projects</span></div>
                        <div><span className="text-cyan-400">experience</span></div>
                        <div><span className="text-cyan-400">contact</span></div>
                        <div><span className="text-cyan-400">resume</span></div>
                        <div><span className="text-cyan-400">github</span> / <span className="text-cyan-400">linkedin</span></div>
                        <div><span className="text-cyan-400">email</span></div>
                        <div><span className="text-cyan-400">clear</span></div>
                        <div className="col-span-2 mt-2 text-[#f8c946]">Project Shortcuts:</div>
                        {projects.map((p) => (
                            <div key={p.slug} className="col-span-2 sm:col-span-1">
                                <span className="text-green-400">{p.slug}</span>
                            </div>
                        ))}
                    </div>
                );
                break;
            case "clear":
                setHistory([]);
                return;
            case "home":
                navigate("/", "Home");
                break;
            case "about":
                navigate("/about", "About");
                break;
            case "projects":
                navigate("/projects", "Projects");
                break;
            case "experience":
                navigate("/experience", "Experience");
                break;
            case "contact":
                navigate("/contact", "Contact");
                break;
            case "resume":
                navigate("/resume", "Resume");
                break;
            case "github":
                output = <span className="text-yellow-400">Opening GitHub...</span>;
                window.open("https://github.com/fromfacade", "_blank");
                break;
            case "linkedin":
                output = <span className="text-yellow-400">Opening LinkedIn...</span>;
                window.open("https://www.linkedin.com/in/luis-castellanos-6987b2244/", "_blank");
                break;
            case "email":
                output = <span className="text-yellow-400">Opening cleanCmd client...</span>;
                window.location.href = "mailto:luiscast5093@gmail.com";
                break;
            default:
                const project = projects.find((p) => p.slug === cleanCmd);
                if (project) {
                    navigate(`/projects/${project.slug}`, project.title);
                } else {
                    output = (
                        <span className="text-red-400">
                            Command not found: {cleanCmd}. Type <span className="font-bold">help</span>.
                        </span>
                    );
                }
        }

        setHistory((prev) => [
            ...prev,
            { command: cmd, output },
        ]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const match = availableCommands.find(c => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    // Minimized State (Pill)
    if (!isOpen) {
        return (
            <button
                onClick={toggleOpen}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-[#1e1e1e] border border-white/10 rounded-full shadow-2xl hover:bg-[#2d2d2d] transition-all group animate-fade-in-up"
            >
                <Terminal size={18} className="text-[#f8c946] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono font-medium text-white/90">_Terminal</span>
            </button>
        );
    }

    // Expanded State (Window)
    return (
        <div
            className={`fixed z-50 bg-[#1e1e1e]/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out font-mono
        ${isMaximized
                    ? "inset-4 rounded-lg"
                    : "bottom-4 right-4 w-[90vw] max-w-[400px] h-[400px] rounded-lg"
                }`}
        >
            {/* Header */}
            <div
                className="bg-[#2d2d2d] px-3 py-2 flex items-center justify-between cursor-pointer border-b border-white/10"
                onDoubleClick={toggleMaximize}
            >
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={toggleOpen} />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer" onClick={toggleOpen} />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" onClick={toggleMaximize} />
                    </div>
                    <span className="text-xs text-white/40 ml-2">luis@portfolio:~</span>
                </div>

                <div className="flex items-center gap-2 text-white/40">
                    <button onClick={toggleMaximize} className="hover:text-white transition-colors">
                        {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                    <button onClick={toggleOpen} className="hover:text-white transition-colors">
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
                                <span className="mr-2 text-[#f8c946]">$</span>
                                <span>{entry.command}</span>
                            </div>
                        )}
                        <div className="text-white/90 ml-4">{entry.output}</div>
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
                        className="flex-1 bg-transparent border-none outline-none text-white/90 placeholder-white/20"
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                    />
                </form>
            </div>
        </div>
    );
}
