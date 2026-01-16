import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";

// Sample blog content with photo gallery support
const posts: Record<string, {
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string;
    gallery?: string[];
}> = {
    "hong-kong-exchange": {
        title: "My Exchange Semester in Hong Kong",
        category: "Travel",
        date: "2026-01-10",
        readTime: "5 min",
        content: `
      <p>Moving to Hong Kong for my exchange semester at City University has been one of the most transformative experiences of my life. The city's unique blend of Eastern and Western cultures, its incredible food scene, and the fast-paced lifestyle have all contributed to making this an unforgettable journey.</p>
      
      <h2>First Impressions</h2>
      <p>Arriving at Hong Kong International Airport, I was immediately struck by the efficiency of everything. The Airport Express took me to the city center in under 30 minutes, and the MTR system quickly became my best friend for navigating the city.</p>
      
      <h2>Life at CityU</h2>
      <p>City University of Hong Kong has an impressive campus with state-of-the-art facilities. My courses in Computer Vision and AI have been challenging but incredibly rewarding. The professors bring real-world industry experience to the classroom.</p>
      
      <h2>Exploring the City</h2>
      <p>From the neon-lit streets of Mong Kok to the serene hiking trails of Dragon's Back, Hong Kong offers endless exploration opportunities. The food alone is worth the trip – from dim sum to egg waffles, every meal is an adventure.</p>
    `,
    },
    "building-llm-agents": {
        title: "Building LLM Agents with LangGraph",
        category: "Tech",
        date: "2025-12-15",
        readTime: "8 min",
        content: `
      <p>During my internship at Eluvium, I had the opportunity to refactor a complex notification classification system using LangGraph. This post shares some insights from that experience.</p>
      
      <h2>Why LangGraph?</h2>
      <p>Traditional state machines for LLM workflows quickly become unwieldy as complexity grows. LangGraph offers a more modular approach where each node in the graph represents a distinct processing step.</p>
      
      <h2>The Architecture</h2>
      <p>Our system processes manufacturing alerts and routes them to appropriate channels. The graph structure allows us to easily add new classification nodes or modify routing logic without touching the entire codebase.</p>
      
      <h2>Key Learnings</h2>
      <p>1. <strong>State Management:</strong> LangGraph's state passing mechanism is elegant but requires careful design upfront.</p>
      <p>2. <strong>Error Handling:</strong> Building robust fallback paths is crucial for production systems.</p>
      <p>3. <strong>Testing:</strong> Unit testing individual nodes before integration saves significant debugging time.</p>
    `,
    },
    "ankara-streets": {
        title: "Street Photography in Ankara",
        category: "Photos",
        date: "2025-11-20",
        readTime: "3 min",
        gallery: [
            "https://images.unsplash.com/photo-1569949381669-ecf31ae8c613?w=800",
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800",
            "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800",
            "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=800",
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        ],
        content: `
      <p>Ankara, Turkey's capital, often gets overlooked for Istanbul's more famous streets. But for a photographer who grew up here, there's endless beauty in its everyday moments.</p>
      
      <h2>Kızılay at Golden Hour</h2>
      <p>The heart of the city transforms as the sun sets. Office workers rushing home, street vendors calling out, the warm light painting everything in amber tones.</p>
      
      <h2>The Old Quarters</h2>
      <p>Ulus and the areas around the castle offer a glimpse into Ankara's history. Narrow streets, traditional houses, and the ever-present cats make for compelling subjects.</p>
      
      <h2>My Approach</h2>
      <p>I prefer shooting with a 35mm equivalent, getting close to my subjects. Candid moments tell the best stories – a grandmother feeding pigeons, children playing in a fountain, a vendor arranging his fruits.</p>
    `,
    },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = posts[slug];

    if (!post) {
        notFound();
    }

    return (
        <>
            <ReadingProgress />
            <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to blog
                    </Link>

                    <article>
                        <header className="mb-12">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                <span className="px-2 py-0.5 bg-secondary rounded">{post.category}</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {post.readTime}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {post.title}
                            </h1>
                        </header>

                        {/* Photo Gallery */}
                        {post.gallery && (
                            <div className="mb-12">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {post.gallery.map((img, i) => (
                                        <div
                                            key={i}
                                            className="aspect-square overflow-hidden rounded-lg bg-secondary"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img}
                                                alt={`Photo ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div
                            className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-strong:text-foreground"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                </div>
            </div>
        </>
    );
}
