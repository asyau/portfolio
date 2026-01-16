"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/publications", label: "Publications" },
    { href: "/blog", label: "Blog" },
    { href: "/creator", label: "Creator" },
    { href: "/contact", label: "Contact" },
]

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
                <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity">
                    AU
                </Link>
                <nav className="flex items-center gap-1 md:gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                pathname === item.href
                                    ? "text-foreground bg-secondary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="ml-2">
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    )
}
