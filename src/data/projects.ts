export type ProjectStatus = "Completed" | "In Progress" | "Hackathon Project";

export type ProjectDemoType =
  | "glucorelay"
  | "pc-builder"
  | "spritz"
  | "productivity"
  | "taskflow";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectArchitecture {
  current: string[];
  planned?: string[];
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: ProjectStatus;

  /** Short one-line hook shown in the hero of the case-study page. */
  shortTagline?: string;
  /** Longer summary paragraph for the "Project Overview" section. */
  overview?: string;
  problem?: string;
  solution?: string;
  /** My personal contribution to the project. */
  role?: string;
  features?: ProjectFeature[];
  challenges?: string[];
  lessons?: string[];
  /** Selects which interactive preview component renders on the case-study page. */
  demoType?: ProjectDemoType;
  /** Display name for the interactive preview, e.g. "Compatibility Builder Preview". */
  demoTitle?: string;
  /** Lightweight text-only architecture flow, rendered as a diagram of boxes and arrows. */
  architecture?: ProjectArchitecture;
  /** What is actually built today (used for projects still in progress). */
  implemented?: string[];
  /** What is designed but not yet built (used for projects still in progress). */
  plannedWork?: string[];
  /** Path under /public, e.g. "/projects/spritz/dashboard.png". Only set once a real screenshot exists. */
  image?: string;
  gallery?: string[];
  /** Optional safety or scope disclaimer shown near the project overview. */
  disclaimer?: string;
}

export const projects: Project[] = [
  {
    title: "GlucoRelay",
    slug: "glucorelay",
    description:
      "GlucoRelay interprets spoken diabetes safety check-ins, tracks whether the patient is okay, treating a low, or needs help, and coordinates caregiver escalation when assistance or a follow-up is required.",
    techStack: [
      "Python",
      "FastAPI",
      "Gemma 4",
      "Google GenAI SDK",
      "Pydantic",
      "REST API",
      "Pytest",
      "JavaScript",
      "HTML/CSS",
    ],
    highlights: [
      "Designed a state-driven emergency workflow supporting okay, treating, follow-up, help-needed, and unknown responses.",
      "Integrated Gemma 4 structured output while keeping final application decisions behind deterministic validation rules.",
      "Built idempotent FastAPI endpoints for patient responses, timeouts, caregiver acknowledgement, event resolution, location updates, and resets.",
      "Added fallback language parsing and safety rescans for cases where the model response was missing, malformed, or overly cautious.",
      "Created automated regression tests covering semantic validation, escalation rules, caregiver handoffs, state transitions, and bilingual responses.",
    ],
    githubUrl: "https://github.com/fromfacade/glucorelay",
    featured: true,
    status: "Hackathon Project",

    shortTagline:
      "An AI-assisted emergency coordination system for people with Type 1 diabetes.",
    overview:
      "GlucoRelay is an AI-assisted emergency coordination prototype created during the CruzHacks Gemma 4 Hackathon. It allows someone with Type 1 diabetes to provide a natural-language voice check-in and converts that response into a structured safety state. The system can record that the patient is okay, recognize that they are actively treating a low, schedule another check-in, or escalate the event to a caregiver when help is needed.",
    problem:
      "During a diabetic low, a person may be confused, physically impaired, or unable to communicate using a rigid interface. A simple alert also may not tell a caregiver whether the person is treating the low, needs immediate assistance, or has stopped responding.",
    solution:
      "GlucoRelay accepts conversational check-ins and uses Gemma 4 to extract structured information from them. Deterministic validation and state-transition rules then decide whether to record treatment, schedule a follow-up, mark the person as okay, or initiate a caregiver handoff. A public caregiver view presents the event timeline, patient status, location information, and acknowledgement controls.",
    role: "Co-developed the project with a teammate, focusing primarily on the FastAPI backend, Gemma-powered voice interpretation, safety validation, event state transitions, caregiver escalation workflow, API endpoints, and automated tests.",
    features: [
      {
        title: "Natural-Language Check-Ins",
        description:
          'Interprets conversational responses such as "I already drank some juice" or "I feel confused and need help."',
      },
      {
        title: "Structured AI Interpretation",
        description:
          "Uses Gemma 4 structured output to classify the response and extract relevant details without allowing the model to directly control the application.",
      },
      {
        title: "Deterministic Safety Validation",
        description:
          "Validates proposed actions, rejects unsafe or invalid transitions, and uses fallback parsing when the model response cannot be used.",
      },
      {
        title: "Caregiver Escalation",
        description:
          "Creates a caregiver handoff when the patient requests help or does not respond to a scheduled follow-up.",
      },
      {
        title: "Event Timeline",
        description:
          "Records patient responses, treatment updates, acknowledgements, location changes, escalation attempts, and resolution events.",
      },
      {
        title: "Bilingual Processing",
        description:
          "Supports English and Spanish check-ins while maintaining an English summary for caregiver coordination.",
      },
    ],
    challenges: [
      "Balancing flexible natural-language interpretation with predictable safety behavior.",
      "Preventing malformed or unexpected model output from creating an invalid state transition.",
      "Handling ambiguous statements that contain both reassuring and concerning language.",
      "Designing asynchronous follow-up and caregiver escalation behavior that remains idempotent.",
    ],
    lessons: [
      "AI output should be treated as a proposal rather than trusted as the final application decision.",
      "Safety-sensitive systems benefit from combining model interpretation with explicit validation and deterministic state transitions.",
      "Event timelines and idempotent actions make multi-party emergency workflows easier to understand and recover.",
      "Regression tests built from real conversational examples are valuable for detecting subtle language-classification failures.",
    ],
    demoType: "glucorelay",
    demoTitle: "Safety Check-In Simulation",
    architecture: {
      current: [
        "Voice / Text Check-In",
        "FastAPI",
        "Gemma 4 Interpretation",
        "Safety Validation",
        "State Machine",
        "Timeline + Follow-Up",
        "Caregiver Handoff",
        "Caregiver Status Page",
      ],
    },
    disclaimer:
      "GlucoRelay is a hackathon prototype and is not a medical device or substitute for professional emergency services.",
  },
  {
    title: "PC Build Web App",
    slug: "pc-build-web-app",
    description:
      "A comprehensive build planner for selecting compatible PC parts, saving builds, and comparing prices. Users can visualize their builds and ensure component compatibility.",
    techStack: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
    highlights: [
      "Implemented complex compatibility logic to ensure all selected parts work together.",
      "created a visual builder interface for intuitive part selection.",
      "Optimized performance for handling large datasets of PC components.",
    ],
    githubUrl: "https://github.com/fromfacade/PC-Build-Web-App",
    featured: true,

    shortTagline:
      "A guided PC-building experience designed to make component compatibility understandable.",
    overview:
      "PC Build Web App helps first-time builders choose parts with confidence by pairing a visual, category-based selection interface with real-time compatibility checks and a running budget estimate.",
    problem:
      "New PC builders often struggle to understand sockets, memory standards, power requirements, budgets, and whether components work together.",
    solution:
      "A visual, constraint-driven builder that guides component selection and evaluates compatibility as the build develops.",
    role: "Designed and developed the application's interface, guided selection flow, and compatibility-focused user experience.",
    features: [
      {
        title: "Visual Component Selection",
        description:
          "Browse categorized parts (CPU, motherboard, GPU, memory, PSU) through a clear visual layout instead of raw spec sheets.",
      },
      {
        title: "Compatibility Validation",
        description:
          "Automatically checks socket, memory type, and power draw so incompatible combinations are easy to catch early.",
      },
      {
        title: "Budget Estimation",
        description:
          "A running subtotal helps first-time builders stay within a target budget as they choose parts.",
      },
      {
        title: "Guided Workflow",
        description:
          "A step-by-step flow designed for people who have never built a PC before.",
      },
    ],
    challenges: [
      "Modeling compatibility rules (socket, memory type, and power draw) in a way that stayed accurate as more components were added.",
      "Keeping the interface responsive while validating several interdependent selections at once.",
    ],
    lessons: [
      "Constraint-based UI works best when validation feedback is immediate and specific rather than a single pass/fail message.",
      "Small visual cues, like grouping parts by category, meaningfully reduce decision fatigue for less experienced users.",
    ],
    demoType: "pc-builder",
    demoTitle: "Compatibility Builder Preview",
    architecture: {
      current: ["User Selection", "Compatibility Engine", "Build State", "Budget Summary"],
    },
  },
  {
    title: "Spritz — Cologne Dupe Finder",
    slug: "spritz",
    description:
      'Web app that helps users find fragrance "dupes" with a simple browsing and search flow. Connects users with affordable alternatives to expensive colognes.',
    techStack: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Puppeteer",
      "Gemini API",
      "PostgreSQL",
      "Docker",
    ],
    highlights: [
      "Integrated with external APIs to fetch fragrance data.",
      "Designed a clean, minimalist UI for easy key-value searching.",
      "Built a robust backend with PostgreSQL to store user preferences and search history.",
    ],
    githubUrl: "https://github.com/fromfacade/Spritz-Cologne-Dupe",

    shortTagline:
      "AI-assisted fragrance discovery for finding affordable alternatives to luxury scents.",
    overview:
      "Spritz takes a link to a luxury fragrance, extracts its scent profile, and surfaces budget-friendly alternatives with a similar character using a scraping and AI-classification pipeline backed by PostgreSQL.",
    problem:
      "Consumers may like a premium fragrance but lack an easy way to identify lower-cost products with a similar scent profile.",
    solution:
      "A workflow combining web scraping, AI-assisted classification, and a PostgreSQL fragrance dataset to return relevant, affordable alternatives.",
    role: "Contributed to the hackathon application, its dataset/database structure, backend integration, and product workflow.",
    features: [
      {
        title: "Luxury Fragrance Lookup",
        description: "Accepts a fragrance product URL as the starting point for a search.",
      },
      {
        title: "Automated Scraping",
        description: "Puppeteer extracts fragrance details directly from the source page.",
      },
      {
        title: "AI Classification",
        description: "Gemini analyzes scent notes to classify the fragrance's profile.",
      },
      {
        title: "Alternative Matching",
        description:
          "A PostgreSQL-backed dataset returns budget-friendly fragrances with a similar profile.",
      },
    ],
    challenges: [
      "Normalizing inconsistent scent-note data scraped from different retailer pages.",
      "Tuning the classification step so recommended alternatives actually matched the source fragrance's profile.",
    ],
    lessons: [
      "Pairing a scraping pipeline with an LLM classification step requires careful handling of malformed or missing data.",
      "A small, well-structured dataset can outperform a larger, noisier one for similarity matching.",
    ],
    demoType: "spritz",
    demoTitle: "Fragrance Match Preview",
    architecture: {
      current: ["Fragrance URL", "Puppeteer", "Gemini Classification", "PostgreSQL", "Recommendations"],
    },
  },
  {
    title: "Personal Productivity Desktop App",
    slug: "personal-productivity-app",
    description:
      "A Windows desktop productivity application that combines daily task planning, recurring habits, focus sessions, notes, workout scheduling, and progress statistics in one interface. It stores data locally and can be distributed as a standalone executable.",
    techStack: ["Python", "SQLite", "CustomTkinter", "Desktop App", "UI/UX", "PyInstaller"],
    highlights: [
      "Built a unified daily planner for tasks, recurring habits, focus sessions, and notes.",
      "Designed a rotating workout schedule that operates independently of calendar weeks.",
      "Used SQLite for reliable local data persistence.",
      "Packaged the application as a standalone Windows executable with PyInstaller.",
      "Created progress statistics and a rank system to encourage consistent productivity.",
    ],
    githubUrl: "https://github.com/fromfacade/personal-todo-list",
    featured: true,

    shortTagline:
      "A local-first Windows productivity system built around the way I actually organize my day.",
    overview:
      "This desktop app consolidates daily planning, recurring habits, focus sessions, notes, and a rotating workout schedule into a single Windows application backed by local SQLite storage.",
    problem:
      "Many productivity tools separate tasks, habits, notes, focus sessions, and workout planning into different applications, or place useful features behind subscriptions.",
    solution:
      "A single desktop application combining daily planning, habits, focus tools, notes, rotating routines, and progress tracking with local SQLite storage.",
    role: "Designed and developed the application from its data model through its desktop interface and executable packaging.",
    features: [
      {
        title: "Unified Daily Planner",
        description:
          "Tasks, habits, focus sessions, and notes live in one place instead of scattered across separate apps.",
      },
      {
        title: "Rotating Workout Schedule",
        description: "A routine that cycles independently of the calendar week.",
      },
      {
        title: "Local-First Storage",
        description:
          "SQLite keeps all data on-device, with no account or internet connection required.",
      },
      {
        title: "Standalone Executable",
        description: "Packaged with PyInstaller so it runs as a normal Windows application.",
      },
    ],
    challenges: [
      "Designing a workout rotation that stays consistent regardless of which day a user starts or skips.",
      "Building a CustomTkinter interface that still feels responsive across several distinct views.",
    ],
    lessons: [
      "Local-first storage removes a whole category of deployment and privacy concerns for a personal tool.",
      "A simple rank and streak system is a surprisingly effective way to encourage daily consistency.",
    ],
    demoType: "productivity",
    demoTitle: "Desktop App Walkthrough",
    architecture: {
      current: ["Desktop UI", "Application Services", "SQLite", "Statistics and Scheduling"],
    },
  },
  {
    title: "TaskFlow API",
    slug: "taskflow-api",
    description:
      "A backend task-management API built with FastAPI and PostgreSQL. It uses database models, reusable sessions, REST endpoints, request validation, authentication, and secure task ownership.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "REST API"],
    highlights: [
      "Designed REST endpoints for users and task-management operations.",
      "Connected FastAPI to PostgreSQL through SQLAlchemy models and database sessions.",
      "Added request and response validation with Pydantic schemas.",
      "Implemented duplicate-account handling with proper database rollback.",
      "Structured the backend into maintainable routers, models, schemas, and services.",
    ],
    githubUrl: "https://github.com/fromfacade/task-flow",
    status: "In Progress",

    shortTagline:
      "An in-progress backend system exploring how APIs hand expensive work to background workers.",
    overview:
      "TaskFlow is a FastAPI and PostgreSQL backend currently focused on account creation and validation, being built out toward a full job-queue architecture for background task processing.",
    problem:
      "Some operations, such as sending email or processing files, shouldn't force users to wait for an entire task to finish during a single HTTP request.",
    solution:
      "An API that validates and stores work, places jobs into a queue, processes them through workers, and exposes status information. This describes the project's intended architecture and is not yet complete.",
    role: "Designing and implementing the backend foundation, database layer, account-creation flow, and eventual queue-processing architecture.",
    features: [
      {
        title: "FastAPI Foundation",
        description: "Structured routers and request handling for account-related endpoints.",
      },
      {
        title: "PostgreSQL + SQLAlchemy",
        description: "Database models and reusable sessions for persisting user accounts.",
      },
      {
        title: "Validated Signup Flow",
        description: "Pydantic schemas validate incoming requests and catch duplicate emails.",
      },
      {
        title: "Password Hashing",
        description: "Passwords are hashed before storage rather than kept in plain text.",
      },
    ],
    challenges: [
      "Structuring the codebase into routers, models, schemas, and services early enough to support a future queue system without a rewrite.",
      "Handling duplicate-account edge cases cleanly with a proper database rollback instead of a raw exception.",
    ],
    lessons: [
      "Designing the database session and model layer carefully up front makes it much easier to add background workers later.",
      "Validating and testing the account-creation path thoroughly before adding authentication reduces compounding bugs.",
    ],
    demoType: "taskflow",
    demoTitle: "API and Queue Architecture Explorer",
    architecture: {
      current: ["Client", "FastAPI", "Validation", "SQLAlchemy", "PostgreSQL"],
      planned: ["Client", "FastAPI", "Job Store", "Queue", "Worker", "Result"],
    },
    implemented: [
      "FastAPI request handling",
      "PostgreSQL integration",
      "SQLAlchemy models and sessions",
      "Validated account creation",
      "Password hashing",
      "Health endpoint",
      "Duplicate-email error handling",
    ],
    plannedWork: [
      "Job creation",
      "Queue storage",
      "Background workers",
      "Job status tracking",
      "Retry handling",
      "Email verification jobs",
      "Authentication",
      "Worker concurrency",
    ],
  },
];
