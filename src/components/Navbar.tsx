"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Close on Escape, and lock background scrolling while the menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#3c3c3c]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-[#f8c946] transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
        >
          fromfacade
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                aria-current={pathname === route.href ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-[#f8c946] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
                  pathname === route.href ? "text-[#f8c946]" : "text-white/70"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-white/20" />

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fromfacade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors rounded-sm p-1.5 -m-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
              aria-label="GitHub (opens in a new tab)"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-castellanos-6987b2244/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors rounded-sm p-1.5 -m-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center h-11 w-11 -mr-1.5 text-white/70 hover:text-white rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        id={menuId}
        className={`md:hidden absolute top-16 left-0 w-full max-h-[calc(100dvh-4rem)] overflow-y-auto bg-[#3c3c3c] border-b border-white/10 shadow-xl transition-[opacity,visibility] ${
          isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              className={`text-lg font-medium transition-colors rounded-md px-3 py-3 -mx-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946] ${
                pathname === route.href
                  ? "text-[#f8c946] bg-white/5"
                  : "text-white/70 hover:bg-white/5"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/fromfacade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 text-white/70 hover:text-white rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
              aria-label="GitHub (opens in a new tab)"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-castellanos-6987b2244/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 text-white/70 hover:text-white rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-white/10 hover:bg-white/20 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
