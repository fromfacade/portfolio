import Timeline from "@/components/Timeline";

export default function ExperiencePage() {
  const experiences = [
    {
      year: "2024 — Present",
      title: "Student Office Assistant (SOA)",
      subtitle: "LSS Tutoring Services",
      description: [
        "Managed day-to-day tutor schedules and room bookings, updating changes and making sure every session had coverage.",
        "Tracked scheduling and attendance issues with staff and suggested small changes (like shifting hours or adding sessions).",
        "Used online calendars and spreadsheets to update tutor schedules, handle last-minute changes, and flag double bookings.",
      ],
    },
    {
      year: "2024 — 2025",
      title: "Oakes Tech Crew Member",
      subtitle: "Oakes HSG & Student Life - Santa Cruz",
      description: [
        "Configured and operated complex A/V systems for events with 150+ attendees.",
        "Collaborated with organizers to translate event requirements into efficient technical setups.",
        "Troubleshot hardware/software failures under strict time constraints.",
      ],
    },
  ];

  const education = [
    {
      year: "2023 — Present",
      title: "University of California, Santa Cruz",
      subtitle: "B.S. Computer Science & Engineering",
      description: [
        "Focus coursework: Data Structures, Algorithms, Web Applications, Database Systems.",
        "Active member of tech clubs and hackathon participant.",
      ],
    },
    {
      year: "2019 — 2023",
      title: "Peter Johansen High School",
      subtitle: "High School Diploma",
      description: ["Graduated with honors."],
    },
  ];

  return (
    <div className="container-custom max-w-4xl space-y-20">
      <section className="space-y-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Experience <span className="text-[#f8c946]">&</span> Education
        </h1>
        <p className="text-xl text-white/60 max-w-2xl">
          My professional timeline and academic background.
        </p>
      </section>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        {/* Work Experience */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-4">
            Work History
          </h2>
          <Timeline items={experiences} />
        </div>

        {/* Education */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-4">
            Education
          </h2>
          <Timeline items={education} />
        </div>
      </div>
    </div>
  );
}
