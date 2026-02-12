"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#3c3c3c]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-[#f8c946] transition-colors"
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
                className={`text-sm font-medium transition-colors hover:text-[#f8c946] ${
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
              className="text-white/70 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-castellanos-6987b2244/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="/resume.pdf" // Assuming you'll put the resume in public/resume.pdf or link externally
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm font-medium transition-all"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#3c3c3c] border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-lg font-medium transition-colors ${
                pathname === route.href ? "text-[#f8c946]" : "text-white/70"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/fromfacade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-castellanos-6987b2244/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm font-medium"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
