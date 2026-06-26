import Link from "next/link";
import { Camera, Instagram, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Photos",
  description: "Street photography, portraits, and moments by Asya Unal (@asasyart).",
};

export default function Photos() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Photos</h1>
          <p className="text-muted-foreground">
            Street photography, portraits, and moments from Hong Kong, Ankara, and beyond.
          </p>
        </div>
        <Link
          href="https://www.instagram.com/asasyart/"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-brand text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity self-start md:self-auto"
        >
          <Instagram className="h-4 w-4" />
          @asasyart on Instagram
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* About section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-accent-brand/5 to-transparent flex gap-6 items-start">
          <Camera className="h-10 w-10 text-accent-brand shrink-0 mt-1" strokeWidth={1.25} />
          <div>
            <h2 className="text-lg font-semibold mb-2">Film &amp; Digital</h2>
            <p className="text-muted-foreground leading-relaxed">
              I shoot with a 35mm equivalent, chasing candid moments — a vendor arranging fruit,
              kids playing in a fountain, golden hour over the harbour. Both film and digital,
              depending on the mood.
            </p>
          </div>
        </div>
        <Link
          href="https://www.instagram.com/asasyart/"
          target="_blank"
          className="group p-8 rounded-2xl border border-border/50 hover:border-accent-brand/40 hover:bg-accent-brand/5 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-4">
            <Instagram className="h-6 w-6 text-accent-brand" />
            <div>
              <p className="font-semibold">@asasyart</p>
              <p className="text-xs text-muted-foreground">Instagram</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Follow for new photos, film scans, and behind-the-scenes →
          </p>
        </Link>
      </div>

      {/* Photo grid — replace Camera placeholders with actual <img> or <Image> tags */}
      <div>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">Gallery</h2>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Link
              key={i}
              href="https://www.instagram.com/asasyart/"
              target="_blank"
              className={`group block rounded-xl border border-border/30 overflow-hidden bg-secondary hover:border-accent-brand/40 transition-all duration-300 ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Camera
                  className="h-8 w-8 text-border group-hover:text-accent-brand/40 transition-colors"
                  strokeWidth={1}
                />
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          Replace the grid above with your own images — or connect the Instagram Graph API for a live feed.
        </p>
      </div>
    </div>
  );
}
