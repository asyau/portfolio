"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

const posts = [
    {
        slug: "hong-kong-exchange",
        title: "My Exchange Semester in Hong Kong",
        excerpt: "Exploring the vibrant city, its tech scene, and studying at CityU.",
        category: "Travel",
        date: "2026-01-10",
        readTime: "5 min",
    },
    {
        slug: "building-llm-agents",
        title: "Building LLM Agents with LangGraph",
        excerpt: "A deep dive into creating modular AI workflows using LangGraph.",
        category: "Tech",
        date: "2025-12-15",
        readTime: "8 min",
    },
    {
        slug: "ankara-streets",
        title: "Street Photography in Ankara",
        excerpt: "Capturing the essence of my hometown through my lens.",
        category: "Photos",
        date: "2025-11-20",
        readTime: "3 min",
    },
];

const categories = ["All", "Travel", "Tech", "Photos"];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold">Blog</h1>
                    <p className="text-muted-foreground mt-2">Thoughts on travel, tech, and photography</p>
                </div>
                <div className="flex gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${activeCategory === cat
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group rounded-xl border border-border/50 overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                                <span className="text-4xl">
                                    {post.category === "Travel" && "✈️"}
                                    {post.category === "Tech" && "💻"}
                                    {post.category === "Photos" && "📷"}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="px-2 py-0.5 bg-secondary rounded">{post.category}</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {post.readTime}
                                </span>
                            </div>
                            <h2 className="text-lg font-medium group-hover:text-foreground transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors pt-2">
                                Read more
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No posts found.
                </div>
            )}
        </div>
    );
}
