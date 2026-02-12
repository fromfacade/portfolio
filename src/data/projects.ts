export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
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
  }
];
