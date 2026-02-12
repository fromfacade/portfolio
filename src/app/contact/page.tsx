import ContactCard from "@/components/ContactCard";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container-custom max-w-4xl space-y-16 text-center">
      <section className="space-y-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Get In <span className="text-[#f8c946]">Touch</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          I&apos;m currently open to new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you!
        </p>
      </section>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <ContactCard
          icon={Mail}
          title="Email"
          value="luiscast5093@gmail.com"
          href="mailto:luiscast5093@gmail.com"
          color="#f8c946"
        />
        <ContactCard
          icon={Linkedin}
          title="LinkedIn"
          value="Connect with me"
          href="https://www.linkedin.com/in/luis-castellanos-6987b2244/"
          color="#0077b5"
        />
        <ContactCard
          icon={Github}
          title="GitHub"
          value="Check out my code!!"
          href="https://github.com/fromfacade"
          color="#ffffff"
        />
        <ContactCard
          icon={FileText}
          title="Resume"
          value="View PDF"
          href="/resume"
          color="#ff5555"
        />
      </div>
    </div>
  );
}
