import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 mt-auto">
            <div className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
                <p className="text-sm text-muted-foreground">
                    © 2026 Asya Unal
                </p>
                <div className="flex items-center gap-4">
                    <Link
                        href="mailto:asya.unal@ug.bilkent.edu.tr"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Mail className="h-4 w-4" />
                    </Link>
                    <Link
                        href="https://github.com/asyau"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-4 w-4" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/asya-ünal-443a33233"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
