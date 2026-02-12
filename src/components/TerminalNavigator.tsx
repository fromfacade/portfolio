"use client";

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Minus, Square, X } from "lucide-react";
import { projects } from "@/data/projects";

type CommandHistory = {
    command: string;
    output?: React.ReactNode;
};

export default function TerminalNavigator() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            command: "welcome",
            output: (
                <div className="mb-2">
                    <span>Welcome to my portfolio v2.0.0</span>
                    <br />
                    <span>Type <span className="text-[#f8c946]">help</span> to see available commands.</span>
                </div>
            ),
        },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const availableCommands = [
        "help",
        "clear",
        "home",
        "projects",
        "about",
        "experience",
        "contact",
        "resume",
        "github",
        "linkedin",
        ...projects.map((p) => p.slug),
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode | null = null;

        if (!cleanCmd) return;

        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);

        switch (cleanCmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                        <div className="col-span-1 sm:col-span-2 text-[#f8c946] mb-1">Available Commands:</div>
                        <div><span className="text-cyan-400">home</span> - Go to Home</div>
                        <div><span className="text-cyan-400">projects</span> - View Projects</div>
                        <div><span className="text-cyan-400">about</span> - About Me</div>
                        <div><span className="text-cyan-400">experience</span> - My Experience</div>
                        <div><span className="text-cyan-400">contact</span> - Contact Info</div>
                        <div><span className="text-cyan-400">resume</span> - View Resume</div>
                        <div><span className="text-cyan-400">github</span> - Open GitHub</div>
                        <div><span className="text-cyan-400">linkedin</span> - Open LinkedIn</div>
                        <div><span className="text-cyan-400">clear</span> - Clear output</div>
                        <div className="col-span-1 sm:col-span-2 mt-2 text-[#f8c946]">Project Shortcuts:</div>
                        {projects.map((p) => (
                            <div key={p.slug}>
                                <span className="text-green-400">{p.slug}</span> - View {p.title}
                            </div>
                        ))}
                    </div>
                );
                break;
            case "clear":
                setHistory([]);
                return;
            case "home":
                output = <span className="text-green-400">Navigating to Home...</span>;
                setTimeout(() => router.push("/"), 500);
                break;
            case "projects":
                output = <span className="text-green-400">Navigating to Projects...</span>;
                setTimeout(() => router.push("/projects"), 500);
                break;
            case "about":
                output = <span className="text-green-400">Navigating to About...</span>;
                setTimeout(() => router.push("/about"), 500);
                break;
            case "experience":
                output = <span className="text-green-400">Navigating to Experience...</span>;
                setTimeout(() => router.push("/experience"), 500);
                break;
            case "contact":
                output = <span className="text-green-400">Navigating to Contact...</span>;
                setTimeout(() => router.push("/contact"), 500);
                break;
            case "resume":
                output = <span className="text-yellow-400">Opening Resume...</span>;
                window.open("/resume.pdf", "_blank");
                break;
            case "github":
                output = <span className="text-yellow-400">Opening GitHub...</span>;
                window.open("https://github.com/fromfacade", "_blank");
                break;
            case "linkedin":
                output = <span className="text-yellow-400">Opening LinkedIn...</span>;
                window.open("https://www.linkedin.com/in/luis-castellanos-6987b2244/", "_blank");
                break;
            default:
                // Check for project shortcuts
                const project = projects.find((p) => p.slug === cleanCmd);
                if (project) {
                    output = <span className="text-green-400">Opening project: {project.title}...</span>;
                    setTimeout(() => router.push(`/projects/${project.slug}`), 500);
                } else {
                    output = (
                        <span className="text-red-400">
                            Command not found: {cleanCmd}. Type <span className="font-bold">help</span> for list.
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
                        {entry.command !== "welcome" && (
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
