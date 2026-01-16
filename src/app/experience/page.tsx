import Link from "next/link";
import { ExternalLink, Linkedin } from "lucide-react";

const experiences = [
    {
        company: "Mobile Action",
        role: "Software Engineering Intern",
        location: "Ankara, Turkey",
        period: "Jun – Jul 2025",
        website: "https://www.mobileaction.co",
        points: [
            "Built Model Context Protocol server for LLM integration with App Store analytics",
            "Developed full-stack features using Vue 3, Spring Boot, and RabbitMQ",
        ],
        github: "https://github.com/asyau/mobile-action-mcp",
    },
    {
        company: "Eluvium",
        role: "AI Engineer Intern",
        location: "London, UK",
        period: "May – Jun 2025",
        website: "https://www.eluvium.io",
        points: [
            "Built notification classification system with LangChain and Gemini API",
            "Refactored monolithic state machine into modular LangGraph-based architecture",
        ],
    },
    {
        company: "SOCAR",
        role: "Software Developer Intern",
        location: "Istanbul, Turkey",
        period: "Aug – Sep 2024",
        website: "https://www.socar.com.tr",
        points: [
            "Built service management web app with Spring Boot, React, and PostgreSQL",
            "Integrated real-time currency exchange via SOAP API",
        ],
    },
    {
        company: "Teknopar Industrial Automation",
        role: "Machine Learning Intern",
        location: "Ankara, Turkey",
        period: "Jul – Aug 2024",
        website: "https://www.teknopar.com.tr",
        points: [
            "Developed defect inspection system using deep learning (98% accuracy)",
            "Fine-tuned DistilBERT for industrial error classification",
        ],
    },
];

export default function Experience() {
    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-12">Experience</h1>

                <div className="space-y-6">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-medium group-hover:text-foreground">{exp.company}</h2>
                                        <Link
                                            href={exp.website}
                                            target="_blank"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </div>
                                    <p className="text-muted-foreground">{exp.role}</p>
                                </div>
                                <div className="text-sm text-muted-foreground md:text-right">
                                    <p>{exp.location}</p>
                                    <p>{exp.period}</p>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {exp.points.map((point, j) => (
                                    <li key={j} className="text-sm text-muted-foreground flex gap-2">
                                        <span className="text-foreground/40">•</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            {exp.github && (
                                <Link
                                    href={exp.github}
                                    target="_blank"
                                    className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    View on GitHub →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Leadership Section */}
                <section className="mt-16 pt-12 border-t border-border/40">
                    <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">Leadership</h2>
                    <div className="p-6 rounded-xl border border-border/50 hover:border-border transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold">ACM Bilkent Student Chapter</h3>
                                <p className="text-muted-foreground">400+ member technical organization</p>
                            </div>
                            <span className="text-sm text-muted-foreground">2024 – Present</span>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 text-xs font-medium bg-foreground text-background rounded">President</span>
                                <span className="text-sm text-muted-foreground">2024 – 2025</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded">Head of Audit Committee</span>
                                <span className="text-sm text-muted-foreground">2025 – 2026</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 pt-2 border-t border-border/40">
                            <Link
                                href="https://www.linkedin.com/company/acm-bilkent"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                            <Link
                                href="https://acm.bilkent.edu.tr"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Website
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
