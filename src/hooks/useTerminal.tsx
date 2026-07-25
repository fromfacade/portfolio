"use client";

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { projects } from "@/data/projects";

type CommandHistory = {
    command: string;
    output?: React.ReactNode;
};

export function useTerminal(initialWelcomeMessage?: React.ReactNode) {
    const router = useRouter();
    const pathname = usePathname();

    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>(
        initialWelcomeMessage
            ? [{ command: "init", output: initialWelcomeMessage }]
            : []
    );
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Route normalization
    const normalize = (path: string) => {
        if (!path.startsWith("/")) path = "/" + path;
        if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
        return path;
    };

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
        const currentPath = normalize(pathname);

        const navigate = (targetPath: string, label: string) => {
            const normalizedTarget = normalize(targetPath);

            if (currentPath === normalizedTarget) {
                output = <span className="text-yellow-400">wait, uh we&apos;re already here...</span>;
            } else {
                output = (
                    <span className="text-green-400">
                        Navigating to {label}<span className="loading-dots"></span>
                    </span>
                );
                setTimeout(() => router.push(targetPath), 300);
            }
        };

        switch (cleanCmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm text-white/80 min-w-0">
                        <div className="col-span-2 text-[#f8c946] mb-1"> Commands:</div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">home</span> / <span className="text-cyan-400">about</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">projects</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">experience</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">contact</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">resume</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">github</span> / <span className="text-cyan-400">linkedin</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">email</span></div>
                        <div className="min-w-0 break-words"><span className="text-cyan-400">clear</span></div>
                        <div className="col-span-2 mt-2 text-[#f8c946]">Project Shortcuts:</div>
                        {projects.map((p) => (
                            <div key={p.slug} className="col-span-2 sm:col-span-1 min-w-0 break-words">
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
                output = <span className="text-yellow-400">Opening email client...</span>;
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

        setHistory((prev) => [...prev, { command: cmd, output }]);
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
            const match = availableCommands.find((c) => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    return {
        history,
        input,
        setInput,
        handleSubmit,
        handleKeyDown,
        inputRef,
        scrollRef
    };
}
