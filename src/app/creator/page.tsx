import { SpotifyWidget } from "@/components/spotify-widget";
import { ContentCreatorSection } from "@/components/content-creator";
import { Camera, Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Creator() {
    return (
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-12">Creator</h1>

            {/* Music + Content row */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 mb-20">
                <div>
                    <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">Music</h2>
                    <SpotifyWidget />
                </div>
                <div className="xl:col-span-2">
                    <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">Content</h2>
                    <ContentCreatorSection />
                </div>
            </div>

            {/* Photography section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Camera className="h-5 w-5 text-accent-brand" />
                        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Photography</h2>
                    </div>
                    <Link
                        href="https://www.instagram.com/asasyart/"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Instagram className="h-4 w-4" />
                        @asasyart
                        <ExternalLink className="h-3 w-3" />
                    </Link>
                </div>

                {/* Instagram CTA banner */}
                <div className="relative rounded-2xl border border-border/50 overflow-hidden bg-gradient-to-br from-secondary/60 to-secondary/20 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <Instagram className="h-5 w-5 text-accent-brand" />
                            <span className="font-semibold text-lg">@asasyart</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-lg">
                            Street photography, portraits, and moments from Hong Kong, Ankara, and everywhere in between.
                            Film and digital.
                        </p>
                        <Link
                            href="https://www.instagram.com/asasyart/"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-brand text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                            View on Instagram
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </div>
                    {/* Decorative camera icon */}
                    <Camera className="h-32 w-32 text-border/40 shrink-0 hidden md:block" strokeWidth={0.75} />
                </div>

                {/* Photo grid placeholder — replace src values with your own images */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Link
                            key={i}
                            href="https://www.instagram.com/asasyart/"
                            target="_blank"
                            className="group aspect-square rounded-lg bg-secondary border border-border/30 overflow-hidden hover:border-border transition-colors flex items-center justify-center"
                        >
                            <Camera className="h-8 w-8 text-border group-hover:text-muted-foreground transition-colors" strokeWidth={1} />
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                    Add your photos by replacing the grid above, or connect the Instagram Graph API for a live feed.
                </p>
            </section>
        </div>
    );
}
