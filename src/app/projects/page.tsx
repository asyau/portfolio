import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Play } from "lucide-react";

const projects = [
    {
        name: "Vira",
        description: "AI workflow automation platform that extracts actionable tasks from team communications and creates tickets in Jira and GitHub.",
        tech: ["FastAPI", "React", "PostgreSQL", "RAG", "pgvector"],
        github: "https://github.com/asyau/vera",
        period: "Mar 2025 – Present",
        preview: "/projects/vira.png",
        demo: null, // Coming soon
    },
    {
        name: "Bilkent.IO",
        description: "Information office web app with tour scheduling system and RAG chatbot for university prospective students.",
        tech: ["ChromaDB", "Redis", "K-Means"],
        github: "https://github.com/asyau/bilkentio",
        period: "Sep 2024 – Jan 2025",
        preview: "/projects/bilkentio.png",
        demo: "https://bilkentio.vercel.app",
    },
    {
        name: "Buy Best",
        description: "Amazon marketplace platform with automated price tracking and seller analytics dashboard.",
        tech: ["Django", "Python"],
        github: "https://github.com/asyau/AmazonProject_BuyBest",
        period: "Jun – Sep 2024",
        preview: "/projects/buybest.png",
        demo: null,
    },
];

export default function Projects() {
    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-12">Projects</h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="group rounded-xl border border-border/50 overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative aspect-video overflow-hidden bg-secondary">
                            <Image
                                src={project.preview}
                                alt={project.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {project.demo && (
                                <Link
                                    href={project.demo}
                                    target="_blank"
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium">
                                        <Play className="h-4 w-4 fill-current" />
                                        Live Demo
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h2 className="text-lg font-medium">{project.name}</h2>
                                <span className="text-xs text-muted-foreground">{project.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                {project.tech.slice(0, 3).map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="text-xs text-muted-foreground">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                    Code
                                </Link>
                                {project.demo && (
                                    <Link
                                        href={project.demo}
                                        target="_blank"
                                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Demo
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
