import Link from "next/link";
import { Youtube, Instagram, Twitter, Rss, Mail, ArrowRight, BookOpen } from "lucide-react";

export function ContentCreatorSection() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Content</h3>
                <p className="text-sm text-muted-foreground">
                    I share thoughts on tech, AI, and life through various platforms.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {/* YouTube - Coming Soon */}
                <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-red-500/10">
                            <Youtube className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <p className="font-medium">YouTube</p>
                            <p className="text-xs text-muted-foreground">Coming soon</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Tech tutorials, vlogs, and behind-the-scenes.
                    </p>
                </div>

                {/* Blog */}
                <Link
                    href="/blog"
                    className="p-4 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors group"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                            <Rss className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                            <p className="font-medium group-hover:text-foreground">Blog</p>
                            <p className="text-xs text-muted-foreground">Travel, tech, photos</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Read posts
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                </Link>

                {/* Medium */}
                <Link
                    href="https://medium.com/@asyaunal02"
                    target="_blank"
                    className="p-4 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors group"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <BookOpen className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="font-medium group-hover:text-foreground">Medium</p>
                            <p className="text-xs text-muted-foreground">@asyaunal02</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Read articles
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                </Link>
            </div>

            {/* Social Links */}
            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Follow Along
                </p>
                <div className="flex items-center gap-3">
                    <Link
                        href="https://www.instagram.com/asyaunal/"
                        target="_blank"
                        className="p-2 rounded-lg border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors"
                    >
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://twitter.com"
                        target="_blank"
                        className="p-2 rounded-lg border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors"
                    >
                        <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                        href="/feed.xml"
                        target="_blank"
                        className="p-2 rounded-lg border border-border/50 hover:border-border hover:bg-secondary/30 transition-colors"
                    >
                        <Rss className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* Newsletter */}
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    <p className="font-medium text-sm">Newsletter</p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                    Get notified about new posts and projects.
                </p>
                <form className="flex gap-2">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}
