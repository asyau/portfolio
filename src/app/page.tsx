import Link from "next/link";
import { Github, Linkedin, Mail, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Asya Unal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Computer Science Student @ Bilkent University
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Building AI systems and software. Currently exploring LLM agents,
            computer vision, and full-stack development. On exchange at City University of Hong Kong.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="mailto:asya.unal@ug.bilkent.edu.tr"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/asyau"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/asya-ünal-443a33233"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://scholar.google.com/citations?user=vsQfWp0AAAAJ"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <GraduationCap className="h-6 w-6" />
            </Link>
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            >
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg font-medium transition-all duration-200 hover:bg-secondary"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
