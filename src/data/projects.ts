export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: "In Progress" | "Completed";
}

export const projects: Project[] = [
  {
    title: "PC Build Web App",
    slug: "pc-build-web-app",
    description: "A comprehensive build planner for selecting compatible PC parts, saving builds, and comparing prices. Users can visualize their builds and ensure component compatibility.",
    techStack: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
    highlights: [
      "Implemented complex compatibility logic to ensure all selected parts work together.",
      "created a visual builder interface for intuitive part selection.",
      "Optimized performance for handling large datasets of PC components."
    ],
    githubUrl: "https://github.com/fromfacade/PC-Build-Web-App",
    featured: true
  },
  {
    title: "Spritz — Cologne Dupe Finder",
    slug: "spritz",
    description: "Web app that helps users find fragrance \"dupes\" with a simple browsing and search flow. Connects users with affordable alternatives to expensive colognes.",
    techStack: ["Next.js", "PostgreSQL", "APIs", "Web", "JS", "UI"],
    highlights: [
      "Integrated with external APIs to fetch fragrance data.",
      "Designed a clean, minimalist UI for easy key-value searching.",
      "Built a robust backend with PostgreSQL to store user preferences and search history."
    ],
    githubUrl: "https://github.com/fromfacade/Spritz-Cologne-Dupe"
  },
  {
    title: "Personal Productivity Desktop App",
    slug: "personal-productivity-app",
    description: "A Windows desktop productivity application that combines daily task planning, recurring habits, focus sessions, notes, workout scheduling, and progress statistics in one interface. It stores data locally and can be distributed as a standalone executable.",
    techStack: ["Python", "SQLite", "CustomTkinter", "Desktop App", "UI/UX", "PyInstaller"],
    highlights: [
      "Built a unified daily planner for tasks, recurring habits, focus sessions, and notes.",
      "Designed a rotating workout schedule that operates independently of calendar weeks.",
      "Used SQLite for reliable local data persistence.",
      "Packaged the application as a standalone Windows executable with PyInstaller.",
      "Created progress statistics and a rank system to encourage consistent productivity."
    ],
    githubUrl: "https://github.com/fromfacade/personal-todo-list",
    featured: true
  },
  {
    title: "TaskFlow API",
    slug: "taskflow-api",
    description: "A backend task-management API built with FastAPI and PostgreSQL. It uses database models, reusable sessions, REST endpoints, request validation, authentication, and secure task ownership.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "REST API"],
    highlights: [
      "Designed REST endpoints for users and task-management operations.",
      "Connected FastAPI to PostgreSQL through SQLAlchemy models and database sessions.",
      "Added request and response validation with Pydantic schemas.",
      "Implemented JWT-based authentication and protected routes.",
      "Structured the backend into maintainable routers, models, schemas, and services."
    ],
    status: "In Progress"
  }
];
