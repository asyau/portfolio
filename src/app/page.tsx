import Link from "next/link";
import { Github, Linkedin, Mail, GraduationCap, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FadeIn } from "@/components/fade-in";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center overflow-hidden">
        {/* 3D sphere — right half on desktop, softly behind text on mobile */}
        <div className="absolute inset-0 lg:left-[45%] pointer-events-none select-none">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-2xl space-y-8">
          <FadeIn delay={0.05}>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Asya Unal
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Computer Science Student @ Bilkent University
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Building AI systems and software. Currently exploring LLM agents,
              computer vision, and full-stack development. On exchange at City
              University of Hong Kong.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
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
          </FadeIn>

          <FadeIn delay={0.30}>
            <div className="flex gap-4 pt-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent-brand text-white rounded-lg font-medium transition-all duration-200 hover:opacity-90"
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
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
