"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import type { Post } from "@/types/post"

const CATEGORIES = ["All", "Travel", "Tech", "Photos", "Life", "Music"]

export function BlogList({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      (post.excerpt ?? "").toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Thoughts on travel, tech, and photography
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                activeCategory === cat
                  ? "bg-accent-brand text-white"
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
          placeholder="Search posts…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border/50 overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent-brand/10 to-secondary flex items-center justify-center">
                  <span className="text-4xl">
                    {post.category === "Travel" && "✈️"}
                    {post.category === "Tech" && "💻"}
                    {post.category === "Photos" && "📷"}
                    {post.category === "Music" && "🎵"}
                    {post.category === "Life" && "✨"}
                    {!post.category && "📝"}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {post.category && (
                  <span className="px-2 py-0.5 bg-accent-brand/10 text-accent-brand rounded font-medium">
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.published_at ?? post.created_at).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
                {post.read_minutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.read_minutes} min
                  </span>
                )}
              </div>
              <h2 className="text-lg font-medium group-hover:text-foreground transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-1 text-sm text-accent-brand font-medium pt-2">
                Read more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No posts found.</div>
      )}
    </>
  )
}
